package com.kahoot.kahoot.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kahoot.kahoot.Entity.Question;
import com.kahoot.kahoot.Entity.QuestionSet;
import com.kahoot.kahoot.Repository.QuestionRepository;
import com.kahoot.kahoot.Repository.QuestionSetRepository;

@Service
public class QuestionSetService implements QuestionSetServicess {

    @Autowired
    private QuestionSetRepository questionSetRepository;
    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public List<QuestionSet> getAll() {
        return questionSetRepository.findAll();
    }

    @Override
    public List<QuestionSet> getAllWithQuestions() {
        return questionSetRepository.findAllWithQuestions();
    }

    @Override
    public QuestionSet get(Long id) {
        System.out.println("GETTING" + id);
        System.out.println("\u001B[35m" + questionSetRepository.findById(id).orElse(null) + "\u001B[0m");
        return questionSetRepository.findById(id).orElse(null);
    }

    @Override
    public QuestionSet addQuestionSet(QuestionSet questionSet) {

        System.out.println("\u001B[35m" + questionSet + "\u001B[0m");
        List<Question> questions = questionSet.getQuestions();
        questionSet.setQuestions(new ArrayList<>());
        // System.out.println(questionSet + "\u001B[0m");
        questionSet = questionSetRepository.save(questionSet);
        for (Question question : questions) {
            question.setId(null);
            question.setQuestionSet(questionSet); // Set the relationship
            questionRepository.save(question); // Save the question if not yet persisted
            question.setQuestionSet(null);
        }
        questionSet.setQuestions(questions);
        System.out.println("SUCCESSFUL");

        return questionSet;
    }

    @Override
    public QuestionSet updateQuestionSet(Long id, QuestionSet questionSet) {
        if (id != questionSet.getId()) {
            return null;
        }
        QuestionSet existingQuestionSet = questionSetRepository.findById(id).orElse(null);
        if (existingQuestionSet != null) {
            List<Question> existingQuestions = existingQuestionSet.getQuestions();
            for (Question question : existingQuestions) {
                // remove old questions
                questionRepository.delete(question);
            }
            List<Question> questions = questionSet.getQuestions();
            questionSet.setQuestions(new ArrayList<>());
            questionSet = questionSetRepository.save(questionSet);
            for (Question question : questions) {
                question.setId(null);
                question.setQuestionSet(questionSet); // Set the relationship
                questionRepository.save(question); // Save the question if not yet persisted    
            }
            questionSet.setQuestions(questions);
            return questionSet;
        } else {
            return null;
        }
    }

    @Override
    public QuestionSet deleteQuestionSet(Long id) {
        QuestionSet existingQuestionSet = questionSetRepository.findById(id).orElse(null);
        if (existingQuestionSet != null) {
            System.out.println("\u001B[36m" + "DELETing" + existingQuestionSet + "\u001B[0m");
            questionSetRepository.delete(existingQuestionSet);
            System.out.println("\u001B[31m" + "DELETED" + existingQuestionSet + "\u001B[0m");
            return existingQuestionSet;
        } else {
            return null;
        }
    }
}