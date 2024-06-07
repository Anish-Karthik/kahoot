package com.kahoot.kahoot.Service;

import java.util.List;

import com.kahoot.kahoot.Entity.QuestionSet;
import com.kahoot.kahoot.Entity.Quiz;

public interface QuizServicess {
    List<Quiz> getAllQuizzes();

    Quiz addQuestionSet(Quiz quiz, QuestionSet questionSet);

    Quiz createQuiz(Quiz quiz);

    Quiz getQuizById(Long id);

    boolean updateQuiz(Long id, Quiz quiz);

    boolean deleteQuiz(Long id);
}
