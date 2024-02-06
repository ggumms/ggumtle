package com.ggums.ggumtle.repository;

import com.ggums.ggumtle.entity.Follow;
import com.ggums.ggumtle.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    Optional<Follow> findByFollowerAndFollowee(User follower, User followee);

    List<Follow> findByFollowerIdAndFolloweeIdIn(Long id, List<Long> userIds);

    List<Follow> findByFollower(User user);

    Page<Follow> findByFollower(User user, Pageable pageable);

    Page<Follow> findByFollowee(User user, Pageable pageable);

    List<Follow> findByFollowee(User user);

    int countByFollowee(User user);

    int countByFollower(User user);

    @Modifying
    @Query("delete from Follow f where f.followee = :user or f.follower = :user")
    void deleteAllByUser(@Param("user") User user);
}
