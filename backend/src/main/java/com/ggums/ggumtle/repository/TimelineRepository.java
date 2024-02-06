package com.ggums.ggumtle.repository;

import com.ggums.ggumtle.entity.Bucket;
import com.ggums.ggumtle.entity.Review;
import com.ggums.ggumtle.entity.Timeline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TimelineRepository extends JpaRepository<Timeline, Long>, TimelineCustomRepository {

    Optional<Timeline> findByBucket(Bucket bucket);
    void deleteByBucket(Bucket bucket);
    void deleteByReview(Review review);
}
