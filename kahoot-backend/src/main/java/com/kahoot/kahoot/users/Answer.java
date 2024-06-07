package com.kahoot.kahoot.users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Answer {
  private int answerIndex;
  private boolean correct;
  private int questionIndex;
  private double answeredInSeconds;
  private String username;
  private int score;
}