package com.kahoot.kahoot.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;

import com.kahoot.kahoot.Entity.Question;
import com.kahoot.kahoot.Service.QuestionServicess;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/questions")
public class QuestionController {
  @Autowired
  private QuestionServicess questionService;

  // CRUD for questions
  @GetMapping
  public ResponseEntity<List<Question>> getAll() {
    List<Question> questions = questionService.getAll();
    return ResponseEntity.ok(questions);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Question> get(@PathVariable Long id) {
    Question question = questionService.get(id);
    if (question != null) {
      return ResponseEntity.ok(question);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping("/{questionSetId}")
  public ResponseEntity<Question> createQuestion(@PathVariable Long questionSetId, @RequestBody Question question) {
    Question newQuestion = questionService.create(questionSetId, question);
    return ResponseEntity.ok(newQuestion);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question question) {
    Question updatedQuestion = questionService.update(id, question);
    if (updatedQuestion != null) {
      return ResponseEntity.ok(updatedQuestion);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Question> deleteQuestion(@PathVariable Long id) {
    Question deletedQuestion = questionService.delete(id);
    if (deletedQuestion != null) {
      return ResponseEntity.ok(deletedQuestion);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

}
