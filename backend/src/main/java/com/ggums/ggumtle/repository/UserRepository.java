package com.ggums.ggumtle.repository;

import com.ggums.ggumtle.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByIdAndDeletedDateIsNull(Long userId);
    Optional<User> findByUserNickname(String nickname);
    Page<User> findByUserNicknameContainingAndDeletedDateIsNull(String userNickname, Pageable pageable);
}