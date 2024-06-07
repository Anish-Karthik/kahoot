package com.kahoot.kahoot.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AnswerService implements AnswerServicess {

    private final Map<Long, String> answersMap = new HashMap<>();

    @Override
    public ResponseEntity<Void> submitAnswer(Long questionId, String answer) {
        if (questionId != null && answer != null && !answer.isEmpty()) {
            answersMap.put(questionId, answer);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        return ResponseEntity.badRequest().build();
    }

    @Override
    public ResponseEntity<String> getAnswer(Long questionId) {
        String answer = answersMap.get(questionId);
        if (answer != null) {
            return ResponseEntity.ok(answer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
