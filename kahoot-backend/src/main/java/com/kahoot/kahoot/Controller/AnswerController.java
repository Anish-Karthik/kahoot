package com.kahoot.kahoot.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kahoot.kahoot.Service.AnswerService;

@CrossOrigin(origins = "http://localhost:3000" )
@RestController
@RequestMapping("/api/answers")
public class AnswerController {
    private AnswerService answerService;

    @Autowired
    public void AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    // Endpoint to submit an answer for a question
    @PostMapping("/submit")
    public ResponseEntity<Void> submitAnswer(@RequestParam Long questionId, @RequestParam String answer) {
        // Validate parameters and handle the answer submission
        boolean submitted = answerService.submitAnswer(questionId, answer).hasBody();
        if (submitted) {
            return ResponseEntity.status(HttpStatus.CREATED).build(); // Answer submitted successfully
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // Invalid parameters or answer submission failed
        }
    }

    // Endpoint to fetch the answer for a question
    @GetMapping("/{questionId}")
    public ResponseEntity<String> getAnswer(@PathVariable Long questionId) {
        String answer = String.valueOf(answerService.getAnswer(questionId));
        if (answer != null) {
            return ResponseEntity.ok(answer); // Return the answer if found
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if answer not found
        }
    }

    
}