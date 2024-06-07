package com.kahoot.kahoot.Service;

import java.util.List;

import com.kahoot.kahoot.Entity.Question;
import com.kahoot.kahoot.Entity.QuestionSet;
import com.kahoot.kahoot.Repository.QuestionRepository;
import com.kahoot.kahoot.Repository.QuestionSetRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionService implements QuestionServicess {
  @Autowired
  private QuestionSetRepository questionSetRepository;

  @Autowired
  private QuestionRepository questionRepository;

  @Override
  public Question create(Long questionSetId, Question question) {
    QuestionSet questionSet = questionSetRepository.findById(questionSetId).orElse(null);
    if (questionSet != null) {
      question.setQuestionSet(questionSet);
      return questionRepository.save(question);
    } else {
      return null;
    }
  }

  @Override
  public Question get(Long questionId) {
    return questionRepository.findById(questionId).orElse(null);
  }

  @Override
  public Question update(Long questionId, Question question) {
    Question existingQuestion = questionRepository.findById(questionId).orElse(null);
    if (existingQuestion != null) {
      existingQuestion.setQuestion(question.getQuestion());
      existingQuestion.setOptions(question.getOptions());
      existingQuestion.setCorrectAnswerIndices(question.getCorrectAnswerIndices());
      existingQuestion.setImage(question.getImage());

      return questionRepository.save(existingQuestion);
    } else {
      return null;
    }
  }

  @Override
  public Question delete(Long questionId) {
    Question existingQuestion = questionRepository.findById(questionId).orElse(null);
    if (existingQuestion != null) {
      questionRepository.delete(existingQuestion);
      return existingQuestion;
    } else {
      return null;
    }
  }

  @Override
  public List<Question> getQuestionsByQuestionSet(Long questionSetId) {
    QuestionSet questionSet = questionSetRepository.findById(questionSetId).orElse(null);
    if (questionSet != null) {
      return questionSet.getQuestions();
    } else {
      return null;
    }
  }

  @Override
  public List<Question> getAll() {
    return questionRepository.findAll();
  }
}
