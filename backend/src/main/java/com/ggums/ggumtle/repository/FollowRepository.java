package com.ggums.ggumtle.repository;

import com.ggums.ggumtle.entity.Follow;
import com.ggums.ggumtle.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    Optional<Follow> findByFollowerAndFollowee(User follower, User following);

    List<Follow> findByFollowerIdAndFolloweeIdIn(Long id, List<Long> userIds);

    Page<Follow> findByFollower(User user, Pageable pageable);

    Page<Follow> findByFollowee(User user, Pageable pageable);

    int countByFollowee(User user);

    int countByFollower(User user);
}
