package com.ggums.ggumtle.repository;

import com.ggums.ggumtle.entity.Bucket;
import com.ggums.ggumtle.entity.BucketReaction;
import com.ggums.ggumtle.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BucketReactionRepository extends JpaRepository<BucketReaction, Long> {
    Optional<BucketReaction> findByBucketAndUser(Bucket bucket, User user);

}
