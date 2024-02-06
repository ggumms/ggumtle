package com.ggums.ggumtle.repository;

import com.ggums.ggumtle.entity.Bucket;
import com.ggums.ggumtle.entity.CommentBucket;
import com.ggums.ggumtle.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface CommentBucketRepository extends JpaRepository<CommentBucket, Long> {

    Page<CommentBucket> findByBucket(Bucket bucket, Pageable pageable);

    int countByBucket(Bucket bucket);

    @Modifying
    @Query("delete from CommentBucket cb where cb.user = :user")
    void deleteAllByUser(@Param("user") User user);
}
