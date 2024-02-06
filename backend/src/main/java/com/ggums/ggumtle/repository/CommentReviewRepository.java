package com.ggums.ggumtle.repository;

import com.ggums.ggumtle.entity.Review;
import com.ggums.ggumtle.entity.CommentReview;
import com.ggums.ggumtle.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentReviewRepository extends JpaRepository<CommentReview, Long> {

    Page<CommentReview> findByReview(Review review, Pageable pageable);

    int countByReview(Review review);

    @Modifying
    @Query("delete from CommentReview cr where cr.user = :user")
    void deleteAllByUser(@Param("user") User user);
}
