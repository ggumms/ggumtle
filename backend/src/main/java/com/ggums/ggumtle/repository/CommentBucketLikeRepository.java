package com.ggums.ggumtle.repository;

import com.ggums.ggumtle.entity.CommentBucket;
import com.ggums.ggumtle.entity.CommentBucketLike;
import com.ggums.ggumtle.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommentBucketLikeRepository extends JpaRepository<CommentBucketLike, Long> {

    Optional<CommentBucketLike> findByCommentBucketAndUser(CommentBucket commentBucket, User user);
}