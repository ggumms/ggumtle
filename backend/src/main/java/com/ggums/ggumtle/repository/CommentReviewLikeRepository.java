package com.ggums.ggumtle.repository;

import com.ggums.ggumtle.entity.CommentReview;
import com.ggums.ggumtle.entity.CommentReviewLike;
import com.ggums.ggumtle.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommentReviewLikeRepository extends JpaRepository<CommentReviewLike, Long> {

    Optional<CommentReviewLike> findByCommentReviewAndUser(CommentReview commentReview, User user);
}

