package com.kahoot.kahoot.Service;

import java.util.ArrayList;
import java.util.List;

import com.kahoot.kahoot.Entity.Quiz;
import com.kahoot.kahoot.Repository.QuizRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kahoot.kahoot.Entity.Question;
import com.kahoot.kahoot.Entity.QuestionSet;
import com.kahoot.kahoot.Repository.QuestionRepository;
import com.kahoot.kahoot.Repository.QuestionSetRepository;

@Service
public class QuizService implements QuizServicess {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionSetRepository questionSetRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    @Override
    public Quiz createQuiz(Quiz quiz) {
        List<QuestionSet> questionSets = quiz.getQuestionSets();
        System.out.println("\u001B[31m" + quiz + "\u001B[0m");
        quiz.setQuestionSets(new ArrayList<>());
        quiz = quizRepository.save(quiz);
        for (QuestionSet questionSet : questionSets) {
            questionSet.setQuiz(quiz);// Set the relationship
            List<Question> questions = questionSet.getQuestions();
            questionSet.setQuestions(new ArrayList<>());
            questionSetRepository.save(questionSet); // Save the question if not yet persisted
            for (Question question : questions) {
                System.out.println("\u001B[31m" + question + "\u001B[0m");
                question.setQuestionSet(questionSet);// Set the relationship
                questionRepository.delete(question); // Delete the question if already persisted
                Question tmp = questionRepository.save(question); // Save the question if not yet persistedquestion.

                System.out.println("\u001B[31m" + tmp + "\u001B[0m");
            }
            questionSet.setQuestions(questions);
        }
        quiz.setQuestionSets(questionSets);
        return quiz;
    }

    @Override
    public Quiz addQuestionSet(Quiz quiz, QuestionSet questionSet) {
        quiz.getQuestionSets().add(questionSet);
        return quizRepository.save(quiz);
    }

    @Override
    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id).orElse(null);
    }

    @Override
    public boolean updateQuiz(Long id, Quiz quiz) {
        if (quizRepository.existsById(id)) {
            quiz.setId(id);
            quizRepository.save(quiz);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteQuiz(Long id) {
        if (quizRepository.existsById(id)) {
            quizRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
