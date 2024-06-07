package com.kahoot.kahoot.Repository;

import com.kahoot.kahoot.Entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    // You can add custom query methods here if needed
}