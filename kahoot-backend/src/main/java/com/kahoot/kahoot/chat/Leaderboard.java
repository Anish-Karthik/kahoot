package com.kahoot.kahoot.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Leaderboard {
  private String username;
  private String imageUrl;
  private int position;
  private int score;
}