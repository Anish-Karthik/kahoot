package com.kahoot.kahoot.Controller;

import com.kahoot.kahoot.Entity.QuestionSet;
import com.kahoot.kahoot.Service.QuestionSetServicess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/questionset")
public class QuestionSetController {

    @Autowired
    private QuestionSetServicess questionSetService;

    // Endpoint to fetch all questionSets
    @GetMapping
    public ResponseEntity<List<QuestionSet>> getAll() {

        System.out.println("Hello");
        List<QuestionSet> questions = questionSetService.getAll();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/questions")
    public ResponseEntity<List<QuestionSet>> getAllWithQuestions() {
        List<QuestionSet> questions = questionSetService.getAllWithQuestions();
        return ResponseEntity.ok(questions);
    }
    // crud for question set

    // Endpoint to fetch a questionSet by id
    @GetMapping("/{id}")
    public ResponseEntity<QuestionSet> get(@PathVariable Long id) {
        QuestionSet questionSet = questionSetService.get(id);
        System.out.println("skldflj");
        return ResponseEntity.ok(questionSet);
    }

    // Endpoint to add a questionSet
    @PostMapping
    public ResponseEntity<QuestionSet> addQuestionSet(@RequestBody QuestionSet questionSet) {
        System.out.println("\u001B[35m" + questionSet + "\u001B[0m");
        QuestionSet newQuestionSet = questionSetService.addQuestionSet(questionSet);
        return ResponseEntity.ok(newQuestionSet);
    }

    // Endpoint to update a questionSet
    @PutMapping("/{id}")
    public ResponseEntity<QuestionSet> updateQuestionSet(@PathVariable Long id, @RequestBody QuestionSet questionSet) {
        QuestionSet updatedQuestionSet = questionSetService.updateQuestionSet(id, questionSet);
        System.out.println(updatedQuestionSet);
        if (updatedQuestionSet != null) {
            return ResponseEntity.ok(updatedQuestionSet);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to delete a questionSet
    @DeleteMapping("/{id}")
    public ResponseEntity<QuestionSet> deleteQuestionSet(@PathVariable Long id) {
        QuestionSet deletedQuestionSet = questionSetService.deleteQuestionSet(id);
        if (deletedQuestionSet != null) {
            return ResponseEntity.ok(deletedQuestionSet);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}