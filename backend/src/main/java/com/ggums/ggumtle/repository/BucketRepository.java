package com.ggums.ggumtle.repository;

import com.ggums.ggumtle.entity.Bucket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BucketRepository extends JpaRepository<Bucket, Long> {
    Page<Bucket> findByTitleContainingAndIsPrivateIsFalse(String title, Pageable pageable);
}
