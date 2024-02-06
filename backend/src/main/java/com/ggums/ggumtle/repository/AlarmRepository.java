package com.ggums.ggumtle.repository;

import com.ggums.ggumtle.entity.Alarm;
import com.ggums.ggumtle.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    int countByReceiverAndIsReadIsFalse(User user);
    Page<Alarm> findByReceiver(User user, Pageable pageable);
    List<Alarm> findByReceiver(User receiver);

    @Modifying
    @Query("delete from Alarm a where a.receiver = :user or a.sender = :user")
    void deleteAllByUser(@Param("user") User user);
}
