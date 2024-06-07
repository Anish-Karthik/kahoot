package com.kahoot.kahoot.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;
import java.util.ArrayList;

@Data
@ToString
@Entity
@Table(name = "quiz")
@NoArgsConstructor
@AllArgsConstructor

public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuestionSet> questionSets = new ArrayList<>();
}
