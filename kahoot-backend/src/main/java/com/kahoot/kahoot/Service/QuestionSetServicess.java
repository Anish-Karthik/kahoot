package com.kahoot.kahoot.Service;

import java.util.List;

import com.kahoot.kahoot.Entity.QuestionSet;

public interface QuestionSetServicess {

    List<QuestionSet> getAll();
    List<QuestionSet> getAllWithQuestions();

    QuestionSet get(Long id);

    QuestionSet addQuestionSet(QuestionSet questionSet);

    QuestionSet updateQuestionSet(Long id, QuestionSet questionSet);

    QuestionSet deleteQuestionSet(Long id);

}
