package com.ggums.ggumtle.repository;

import com.ggums.ggumtle.entity.Review;
import com.ggums.ggumtle.entity.CommentReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentReviewRepository extends JpaRepository<CommentReview, Long> {

    Page<CommentReview> findByReview(Review review, Pageable pageable);

    int countByReview(Review review);
}
