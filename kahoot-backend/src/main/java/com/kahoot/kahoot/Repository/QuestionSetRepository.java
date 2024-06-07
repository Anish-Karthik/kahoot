package com.kahoot.kahoot.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kahoot.kahoot.Entity.QuestionSet;

public interface QuestionSetRepository extends JpaRepository<QuestionSet, Long> {
  
  // get question set by quizId along with questions
  @Query("SELECT qs FROM QuestionSet qs JOIN FETCH qs.questions WHERE qs.quiz.id = ?1")
  List<QuestionSet> findByQuizIdWithQuestions(Long quizId);

  // get question set by quizId along without questions
  List<QuestionSet> findByQuizId(Long quizId);

  // get question set by id along with questions
  @Query("SELECT qs FROM QuestionSet qs JOIN FETCH qs.questions WHERE qs.id = ?1")
  Optional<QuestionSet> findByIdWithQuestions(Long id);

  // create questionset alone
  @Query("INSERT INTO QuestionSet (name) VALUES (?1)")
  QuestionSet createQuestionSet(String name);

  // findAllWithQuestions
  @Query("SELECT qs FROM QuestionSet qs JOIN FETCH qs.questions")
  List<QuestionSet> findAllWithQuestions();
}
