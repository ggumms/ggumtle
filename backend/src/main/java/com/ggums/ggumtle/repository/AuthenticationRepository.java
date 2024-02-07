package com.ggums.ggumtle.repository;

import com.ggums.ggumtle.entity.Authentication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthenticationRepository extends JpaRepository<Authentication, Long> {
    Optional<Authentication> findByUserKakao(String userKakao);
    Optional<Authentication> findByUserEmail(String userEmail);
    Optional<Authentication> findByUserKakaoOrUserGoogle(String kakao, String google);
    Optional<Authentication> findAuthenticationByUserEmail(String userEmail);
}
