package com.kahoot.kahoot.Service;

import java.util.List;

import com.kahoot.kahoot.Entity.Question;

public interface QuestionServicess {
  Question create(Long questionSetId, Question question);

  Question get(Long questionId);

  Question update(Long questionId, Question question);

  Question delete(Long questionId);

  List<Question> getQuestionsByQuestionSet(Long questionSetId);

  List<Question> getAll();
}
