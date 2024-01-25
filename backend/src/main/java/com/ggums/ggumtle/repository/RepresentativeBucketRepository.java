package com.ggums.ggumtle.repository;

import com.ggums.ggumtle.entity.RepresentativeBucket;
import com.ggums.ggumtle.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RepresentativeBucketRepository extends JpaRepository<RepresentativeBucket, Long> {
    Optional<RepresentativeBucket> findByUser(User user);

    List<RepresentativeBucket> findByUserIdIn(List<Long> userIds);
}
