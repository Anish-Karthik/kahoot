package com.kahoot.kahoot.chat;

public enum MessageType {
    ERROR,
    UPDATE,
    JOIN,
    LEAVE,
    LEADERBOARD, // return leaderboard in subscrition
    QUESTION, // return question in subscription
    ANSWER, // inputs answer in send
    TIMER, // wait time
    START, // start quiz
    END, // end quiz
    ANSWER_FREQUENCY,
    GET_READY,
}
