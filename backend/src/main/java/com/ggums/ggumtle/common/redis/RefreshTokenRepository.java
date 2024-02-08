package com.ggums.ggumtle.common.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
public class RefreshTokenRepository {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ValueOperations<String, Object> valueOperations;

    public void saveRefreshToken(String userId, String refreshToken, long duration) {
        valueOperations.set("refreshToken:" + userId, refreshToken, duration, TimeUnit.SECONDS);
    }

    public String findRefreshTokenByUserId(String userId) {
        return (String) valueOperations.get("refreshToken:" + userId);
    }

    public void deleteRefreshToken(String userId) {
        redisTemplate.delete(userId);
    }
}
