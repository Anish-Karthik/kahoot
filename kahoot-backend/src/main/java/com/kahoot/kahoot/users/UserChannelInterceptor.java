package com.kahoot.kahoot.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

@Component
public class UserChannelInterceptor implements ChannelInterceptor {

    @Autowired
    private ActiveUserManager activeUserManager;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        // if (StompCommand.CONNECT.equals(accessor.getCommand())) {
        //     LiveUser user = accessor.getUser().;
        //     String room = accessor.getSessionAttributes().get("room").toString();
        //     activeUserManager.addUser(room, username);
        // } else if (StompCommand.DISCONNECT.equals(accessor.getCommand())) {
        //     String username = accessor.getUser().getName();
        //     String room = accessor.getSessionAttributes().get("room").toString();
        //     activeUserManager.removeUser(room, username);
        // }
        return message;
    }
}

