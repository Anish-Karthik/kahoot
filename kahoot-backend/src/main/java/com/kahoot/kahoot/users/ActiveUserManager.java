package com.kahoot.kahoot.users;

import com.kahoot.kahoot.chat.AnswerManager;
import com.kahoot.kahoot.chat.Leaderboard;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ToString
@Component
public class ActiveUserManager {

    @Autowired
    public AnswerManager answerManager;

    private final Map<String, Map<String, LiveUser>> activeUsers = new ConcurrentHashMap<>();

    public void addUser(String room, LiveUser user) {
        activeUsers.computeIfAbsent(room, k -> new ConcurrentHashMap<>()).put(user.getUsername(), user);
    }

    public boolean userExists(String room, LiveUser user) {
        Map<String, LiveUser> users = activeUsers.get(room);
        return users != null && users.containsKey(user.getUsername());
    }

    public void updateUser(String room, LiveUser user) {
        Map<String, LiveUser> users = activeUsers.get(room);
        users.put(user.getUsername(), user);
    }

    public void addAnswer(String room, String username, Answer answer) {
        Map<String, LiveUser> users = activeUsers.get(room);
        LiveUser user = users.get(username);
        if (user == null) {
            return;
        }
        if (user.getAnswers() == null) {
            user.setAnswers(new ArrayList<>());
        }
        user.getAnswers().add(answer);
    }

    public void removeUser(String room, LiveUser user) {
        Map<String, LiveUser> users = activeUsers.get(room);
        System.out.println(users);
        System.out.println(user);

        try {
            users.remove(user.getUsername());
        } catch (Exception e) {
            System.out.println("Error removing user");
            e.printStackTrace();
        }
        System.out.println("After remove");
        System.out.println(users);
        System.out.println(activeUsers);
    }

    public List<LiveUser> getUsers(String room) {
        return new ArrayList<>(activeUsers.getOrDefault(room, new ConcurrentHashMap<>()).values());
    }

    public List<Integer> getAnswerFrequency(String room, int questionIndex) {
        Map<String, LiveUser> users = activeUsers.get(room);
        List<Integer> answerFrequency = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            int finalI = i;
            answerFrequency.add((int) users.values().stream()
                    .map(LiveUser::getAnswers)
                    .flatMap(List::stream)
                    .filter(answer -> answer.getQuestionIndex() == questionIndex)
                    .filter(answer -> answer.getAnswerIndex() == finalI)
                    .count());
        }
        return answerFrequency;
    }

    public List<Leaderboard> getLeaderboard(String room) {
        List<Leaderboard> leaderboards = new ArrayList<>();
        Map<String, LiveUser> users = activeUsers.get(room);
        if (users == null) {
            return leaderboards;
        }
        for (LiveUser user : users.values()) {
            leaderboards.add(Leaderboard.builder()
                    .username(user.getUsername())
                    .score(user.getAnswers().stream().mapToInt(Answer::getScore).sum())
                    .build());
        }
        return leaderboards;
    }
}
