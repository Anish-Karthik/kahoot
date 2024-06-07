package com.kahoot.kahoot.chat;

import com.kahoot.kahoot.Entity.Question;
import com.kahoot.kahoot.users.ActiveUserManager;
import com.kahoot.kahoot.users.Answer;
import com.kahoot.kahoot.users.LiveUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class ChatController {
    @Autowired
    private ActiveUserManager activeUserManager;

    // Handle sending of messages to a specific room
    @MessageMapping("/chat/{roomNumber}/sendMessage")
    @SendTo("/room/{roomNumber}")
    public ChatMessage sendMessage(
            @DestinationVariable String roomNumber,
            @Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    // Handle adding a user to a specific room
    @MessageMapping("/chat/{roomNumber}/addUser")
    @SendTo("/room/{roomNumber}")
    public ChatMessage addUser(
            @DestinationVariable String roomNumber,
            @Payload ChatMessage chatMessage,
            SimpMessageHeaderAccessor headerAccessor) {
        LiveUser user = chatMessage.getSender();
        if (activeUserManager.userExists(roomNumber, user)) {
            // User already exists in the room\
            return ChatMessage.builder()
                    .type(MessageType.ERROR)
                    .content("User already exists in the room")
                    .sender(user)
                    .build();
        }
        activeUserManager.addUser(roomNumber, user);
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("user", chatMessage.getSender());
        headerAccessor.getSessionAttributes().put("roomNumber", roomNumber);
        return chatMessage;
    }

    // updateUser imageUrl
    @MessageMapping("/chat/{roomNumber}/updateUser")
    @SendTo("/room/{roomNumber}")
    public ChatMessage updateUser(
            @DestinationVariable String roomNumber,
            @Payload ChatMessage chatMessage) {
        activeUserManager.updateUser(roomNumber, chatMessage.getSender());
        return chatMessage;
    }

    // get all active users

    @MessageMapping("/chat/{roomNumber}/getUsers")
    @SendTo("/room/{roomNumber}/activeUsers")
    public List<LiveUser> getActiveUsers(@DestinationVariable String roomNumber) {
        System.out.println("Getting active users");
        return activeUserManager.getUsers(roomNumber);
    }

    // Handle removing a user from a specific room
    @MessageMapping("/chat/{roomNumber}/removeUser")
    @SendTo("/room/{roomNumber}/activeUsers")
    public List<LiveUser> removeUser(
            @DestinationVariable String roomNumber,
            @Payload LiveUser user) {
        System.out.println("Removing user");
        activeUserManager.removeUser(roomNumber, user);
        System.out.println(activeUserManager.getUsers(roomNumber));
        // disconnect user's websocket connection

        return activeUserManager.getUsers(roomNumber);
    }

    // start Quiz, sends to both /quizHost and /quizClient
    @MessageMapping("/chat/{roomNumber}/start")
    @SendTo("/room/{roomNumber}/quiz")
    public ChatMessage startQuiz(
            @DestinationVariable String roomNumber,
            @Payload ChatMessage chatMessage) {
        System.out.println("Starting");
        chatMessage.setReciever(Receiver.ALL);
        chatMessage.setType(MessageType.START);
        chatMessage.setContent("Quiz has started");
        return chatMessage;
    }

    // end Quiz, sends to both /quizHost and /quizClient
    @MessageMapping("/chat/{roomNumber}/end")
    @SendTo("/room/{roomNumber}/quiz")
    public ChatMessage endQuiz(
            @DestinationVariable String roomNumber,
            @Payload ChatMessage chatMessage) {
        chatMessage.setType(MessageType.END);
        chatMessage.setReciever(Receiver.ALL);
        chatMessage.setContent("Quiz has ended");
        return chatMessage;
    }

    @MessageMapping("/chat/{roomNumber}/getReady")
    @SendTo("/room/{roomNumber}/quiz")
    public ChatMessage getReady(
            @DestinationVariable String roomNumber,
            @Payload ChatMessage chatMessage) {
        chatMessage.setType(MessageType.GET_READY);
        chatMessage.setReciever(Receiver.PLAYER);
        chatMessage.setContent("Get ready!!");
        return chatMessage;
    }
    // send question's options to all clients after a delay of 5 seconds
    @MessageMapping("/chat/{roomNumber}/question")
    @SendTo("/room/{roomNumber}/quiz")
    public AdvancedChatMessage sendQuestion(
            @DestinationVariable String roomNumber,
            @Payload AdvancedChatMessage chatMessage) throws InterruptedException {
        Question question = chatMessage.getQuestion();
        var currentQuestion = new Question();
        currentQuestion.setQuestion(question.getQuestion());
        currentQuestion.setOptions(question.getOptions());
        currentQuestion.setCorrectAnswerIndices(question.getCorrectAnswerIndices());
        currentQuestion.setTimeLimit(question.getTimeLimit());
        currentQuestion.setQuestionSet(question.getQuestionSet());

        question.setCorrectAnswerIndices(null);
        question.setQuestion(null);
        chatMessage.setQuestion(question);
        chatMessage.setType(MessageType.QUESTION);
        chatMessage.setReciever(Receiver.PLAYER);
        chatMessage.setQuestionIndex(chatMessage.getQuestionIndex());
        // Delay execution for 5 seconds
        TimeUnit.SECONDS.sleep(chatMessage.getDelayInSeconds());
        activeUserManager.answerManager.setCurrentQuestion(currentQuestion);
        activeUserManager.answerManager.startTimer();
        activeUserManager.answerManager.setCurrentQuestionIndex(chatMessage.getQuestionIndex());
        activeUserManager.answerManager.setStartTime(new Date());
        return chatMessage;
    }

    // send answer Frequency to host
    @MessageMapping("/chat/{roomNumber}/answerFrequency")
    @SendTo("/room/{roomNumber}/quiz")
    public AdvancedChatMessage sendAnswerFrequency(
            @DestinationVariable String roomNumber,
            @Payload AdvancedChatMessage chatMessage) {

        System.out.println("Sending answer frequency");
        chatMessage.setType(MessageType.ANSWER_FREQUENCY);
        chatMessage.setReciever(Receiver.HOST);
        // chatMessage.setAnswerFrequency(activeUserManager.getAnswerFrequency(roomNumber,
        // chatMessage.getQuestionIndex()));
        return chatMessage;
    }

    // send leaderboard to host
    @MessageMapping("/chat/{roomNumber}/leaderboard")
    @SendTo("/room/{roomNumber}/quiz")
    public AdvancedChatMessage sendLeaderboard(
            @DestinationVariable String roomNumber,
            @Payload AdvancedChatMessage chatMessage) {
        chatMessage.setType(MessageType.LEADERBOARD);
        chatMessage.setReciever(Receiver.HOST);
        // chatMessage.setLeaderboard(activeUserManager.getLeaderboard(roomNumber));
        return chatMessage;
    }

    @MessageMapping("/chat/{roomNumber}/answer")
    @SendTo("/room/{roomNumber}/quiz")
    public AdvancedChatMessage sendAnswer(
            @DestinationVariable String roomNumber,
            @Payload AdvancedChatMessage chatMessage) {
        System.out.println("Sending answer\n*****************************\n++++++++++++++++++++++++\n*********************");
        // chatMessage.setType(MessageType.ANSWER);
        chatMessage.setReciever(Receiver.HOST);
        Answer answer = new Answer();
        answer.setAnswerIndex(chatMessage.getAnswerIndex());
        // answer.setAnsweredInSeconds(answeredInSeconds);
        // answer.setCorrect(chatMessage.getVerdict().equals(Verdict.CORRECT));
        // answer.set


        Answer res = activeUserManager.answerManager.validateAnswer(chatMessage.getAnswerIndex(), chatMessage.getSender().getUsername());
        chatMessage.setVerdict(Verdict.builder().correct(res.isCorrect()).correctAnswerIndex(res.getAnswerIndex()).score(res.getScore()).build());
        activeUserManager.addAnswer(roomNumber, chatMessage.getSender().getUsername(), res);
        return chatMessage;
    }
}
