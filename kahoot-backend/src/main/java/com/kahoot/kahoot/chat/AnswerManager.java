package com.kahoot.kahoot.chat;

import com.kahoot.kahoot.Entity.Question;
import com.kahoot.kahoot.users.Answer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AnswerManager {
  private Question currentQuestion;
  private int currentQuestionIndex;
  private Date startTime;

  public Answer validateAnswer(int answerIndex, String username) {
    Date answerTime = new Date();
    double answeredInSeconds = (answerTime.getTime() - startTime.getTime()) / 1000;
    if (answeredInSeconds > currentQuestion.getTimeLimit() + 2 || answerIndex == -1) {
      return new Answer(-1, false, currentQuestionIndex, answeredInSeconds, username, 0);
    }
    boolean correct = currentQuestion.getCorrectAnswerIndices().contains(answerIndex);
//    Divide response time by the question timer. For example, a player responded 2 seconds after a 30-second question timer started. 2 divided by 30 is 0.0667.
////            Divide that value by 2. For example, 0.0667 divided by 2 is 0.0333.
////            Subtract that value from 1. For example, 1 minus 0.0333 is 0.9667.
////            Multiply points possible by that value. For example, 1000 points possible multiplied by 0.9667 is 966.7.
////            Round to the nearest whole number. For example, 966.7 is 967 points.

    int score = (int) Math.round((1 - (answeredInSeconds / currentQuestion.getTimeLimit()) / 2) * 1000);
    if (!correct) {
      score = 0;
    }
    return new Answer(answerIndex, correct, currentQuestionIndex, answeredInSeconds, username, score);
  }

  public void startTimer() {
    Thread timerThread = new Thread(() -> {
      try {
        Thread.sleep(currentQuestion.getTimeLimit() * 1000);
        // Send a message to the chat that time is up
        System.out.println("Time is up!");
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
    });
    timerThread.start();
  }
  public void stopTimer() {
    // Stop the timer
  }
}
