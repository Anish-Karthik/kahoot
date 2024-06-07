package com.kahoot.kahoot.chat;

import java.util.List;

import com.kahoot.kahoot.Entity.Question;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdvancedChatMessage extends ChatMessage {
  private Question question;
  private List<Leaderboard> leaderboard;
  private List<Integer> answerFrequency;
  private int delayInSeconds = 5;
  private int answerIndex;
  private Verdict verdict;
  private int questionIndex;
}
