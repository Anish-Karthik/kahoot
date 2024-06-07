package com.kahoot.kahoot.Repository;
import com.kahoot.kahoot.Entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    // You can define custom query methods here if needed

    // create a new question333
}