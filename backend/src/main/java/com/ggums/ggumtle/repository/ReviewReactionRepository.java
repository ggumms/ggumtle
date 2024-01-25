package com.ggums.ggumtle.repository;

import com.ggums.ggumtle.entity.ReviewReaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewReactionRepository extends JpaRepository<ReviewReaction, Long> {
}
