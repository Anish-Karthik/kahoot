package com.kahoot.kahoot.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
// @Data
// @ToString
// @AllArgsConstructor
// @NoArgsConstructor
// @Entity
// @Table(name = "questions")
// public class Question {
//     public static enum QuestionType {
//         QUIZ, TRUE_OR_FALSE
//     }
//     public static enum PointType {
//         STANDARD, NO_POINTS
//     }
//     public static enum AnswerOptionsType {
//         SINGLE_SELECT, MULTI_SELECT
//     }
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @ManyToOne(optional = true)
//     @JoinColumn(name="questionSet_id")
//     private QuestionSet questionSet;

//     private String question;

//     private QuestionType questionType = QuestionType.QUIZ;
//     private int timeLimit = 20;
//     private PointType points = PointType.STANDARD;
//     private AnswerOptionsType answerOptions = AnswerOptionsType.SINGLE_SELECT;

//     private List<String> options;

//     private List<Integer> correctAnswerIndices;
// }

@Builder
@Data
@ToString(exclude="questionSet")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "questions")
public class Question {
    public enum QuestionType {
        QUIZ, TRUE_OR_FALSE
    }

    public enum PointType {
        STANDARD, NO_POINTS
    }

    public enum AnswerOptionsType {
        SINGLE_SELECT, MULTI_SELECT
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = true)
    @JoinColumn(name = "questionSet_id")
    @JsonIgnore
    private QuestionSet questionSet;

    private String question;

    private String image;

    @Enumerated(EnumType.STRING)
    private QuestionType questionType = QuestionType.QUIZ;

    private int timeLimit = 20;

    @Enumerated(EnumType.STRING)
    private PointType points = PointType.STANDARD;

    @Enumerated(EnumType.STRING)
    private AnswerOptionsType answerOptions = AnswerOptionsType.SINGLE_SELECT;

    @ElementCollection
    @CollectionTable(name = "question_options", joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "option")
    private List<String> options;

    @ElementCollection
    @CollectionTable(name = "correct_answer_indices", joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "correct_index")
    private List<Integer> correctAnswerIndices;
}
