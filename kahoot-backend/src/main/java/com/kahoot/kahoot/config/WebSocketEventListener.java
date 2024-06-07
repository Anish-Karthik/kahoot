package com.kahoot.kahoot.config;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.kahoot.kahoot.chat.ChatMessage;
import com.kahoot.kahoot.chat.MessageType;
import com.kahoot.kahoot.users.LiveUser;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        System.out.println("Disconnect event");

        LiveUser user = (LiveUser) headerAccessor.getSessionAttributes().get("user");
        String roomNumber = (String) headerAccessor.getSessionAttributes().get("roomNumber");

        System.out.println(user);
        System.out.println(headerAccessor);
        System.out.println(event);
        if (user != null) {
            log.info("user disconnected: {}", user.getUsername());
            ChatMessage chatMessage = ChatMessage.builder()
                    .type(MessageType.LEAVE)
                    .sender(user)
                    .build();
            System.out.println("Sending message");
            messagingTemplate.convertAndSend("/room/" + roomNumber, chatMessage);
        }
    }

}
