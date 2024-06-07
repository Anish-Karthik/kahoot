package com.kahoot.kahoot.chat;

import com.kahoot.kahoot.users.LiveUser;

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
public class ChatMessage {
    private MessageType type;
    private String content;
    private LiveUser sender;
    @Builder.Default
    private Receiver reciever = Receiver.ALL;
}
