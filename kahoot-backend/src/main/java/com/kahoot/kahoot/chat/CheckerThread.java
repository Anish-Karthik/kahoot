package com.kahoot.kahoot.chat;

import com.kahoot.kahoot.users.ActiveUserManager;

import java.util.Date;

public class CheckerThread implements Runnable {
    private ActiveUserManager activeUserManager;
    private String roomNumber;
    private int questionIndex;
    private int timeLimit;

    public CheckerThread(ActiveUserManager activeUserManager, String roomNumber, int QuestionIndex, int timeLimit) {
        this.activeUserManager = activeUserManager;
        this.roomNumber = roomNumber;
        this.questionIndex = QuestionIndex;
        this.timeLimit = timeLimit;
    }
    @Override
    public void run() {
        Date start = new Date();
        while (true) {
            System.out.println("Checking if all users have answered...");
            System.out.println("Room number: " + timeLimit * 1000);
            System.out.println("Time elapsed: ");
            System.out.println(new Date().getTime() - start.getTime());
            if (new Date().getTime() - start.getTime() > timeLimit * timeLimit * 1000) {
                System.out.println("Time limit reached. Exiting...");
                throw new RuntimeException("Time limit reached. Exiting...");
            }
            if (activeUserManager.hasAllAnswered(roomNumber, questionIndex)) {
                System.out.println("Condition met. Exiting...");
                break;
            }
            try {
                Thread.sleep(1000);  // Sleep for 1 second
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
