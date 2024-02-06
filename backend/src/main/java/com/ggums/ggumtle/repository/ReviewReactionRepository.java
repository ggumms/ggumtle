package com.ggums.ggumtle.repository;

import com.ggums.ggumtle.entity.ReviewReaction;
import com.ggums.ggumtle.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewReactionRepository extends JpaRepository<ReviewReaction, Long> {

    @Modifying
    @Query("delete from ReviewReaction rr where rr.user = :user")
    void deleteAllByUser(@Param("user") User user);
}
