package com.ggums.ggumtle.repository;

import com.ggums.ggumtle.entity.Bucket;
import com.ggums.ggumtle.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("select r from Review r join fetch r.bucket where (r.title like concat('%', :keyword, '%') or r.context like concat('%', :keyword, '%')) and r.bucket.isPrivate = false")
    Page<Review> findByTitleContainingOrContextContainingAndIsPrivateIsFalse
            (@Param("keyword") String keyword, Pageable pageable);

    Optional<Review> findByBucket(Bucket bucket);
}