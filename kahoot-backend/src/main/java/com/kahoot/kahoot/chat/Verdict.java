package com.kahoot.kahoot.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Verdict {
  private boolean correct;
  private int correctAnswerIndex;
  private int score;
}
