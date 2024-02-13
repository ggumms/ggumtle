package com.ggums.ggumtle.service.OAuth;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ggums.ggumtle.common.exception.CustomException;
import com.ggums.ggumtle.common.exception.ExceptionType;
import com.ggums.ggumtle.common.handler.TransactionHandler;
import com.ggums.ggumtle.common.jwt.JwtTokenManager;
import com.ggums.ggumtle.common.redis.RedisLockRepository;
import com.ggums.ggumtle.dto.request.OAuthJoinRequestDto;
import com.ggums.ggumtle.dto.response.OAuthLoginResponseDto;
import com.ggums.ggumtle.dto.response.model.OAuthUserInfo;
import com.ggums.ggumtle.entity.Authentication;
import com.ggums.ggumtle.entity.Interest;
import com.ggums.ggumtle.entity.OAuthLoginStatus;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.repository.AuthenticationRepository;
import com.ggums.ggumtle.repository.InterestRepository;
import com.ggums.ggumtle.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GoogleService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final AuthenticationRepository authenticationRepository;
    private final RedisLockRepository redisLockRepository;
    private final TransactionHandler transactionHandler;
    private final InterestRepository interestRepository;
    private final StringRedisTemplate redisTemplate;
    private final JwtTokenManager jwtTokenManager;
    private final UserRepository userRepository;

    @Value("${spring.security.oauth2.client.provider.google.token-uri}")
    private String googleTokenUri;
    @Value("${spring.security.oauth2.client.provider.google.user-info-uri}")
    private String googleUserInfoUri;
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;
    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;
    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String redirectUri;

    public OAuthLoginResponseDto googleLogin(HttpServletResponse response, String authorizationCode){
        Token token = getToken(authorizationCode);
        OAuthUserInfo oAuthUserInfo = fetchUserInfo(token.getAccessToken());

        Optional<Authentication> authenticationOpt = authenticationRepository.findByUserKakao(oAuthUserInfo.getUserEmail());
        if(authenticationOpt.isPresent()){
            User user = authenticationOpt.get().getUser();
            jwtTokenManager.createAccessToken(user.getUsername(), response);
            jwtTokenManager.createRefreshToken(user.getUsername(), response);
            return OAuthLoginResponseDto.builder()
                    .status(OAuthLoginStatus.login)
                    .build();
        }

        return OAuthLoginResponseDto.builder()
                .status(OAuthLoginStatus.join)
                .authorizationCode(authorizationCode)
                .userEmail(oAuthUserInfo.getUserEmail())
                .userProfile(oAuthUserInfo.getUserProfile())
                .userNickname(oAuthUserInfo.getUserNickname())
                .build();
    }

    public String googleJoin(OAuthJoinRequestDto requestDto){
        String email = requestDto.getUserEmail();

        Token token = getToken(requestDto.getAuthorizationCode());
        OAuthUserInfo oAuthUserInfo = fetchUserInfo(token.getAccessToken());

        if(!oAuthUserInfo.getUserEmail().equals(requestDto.getUserEmail())){
            throw new CustomException(ExceptionType.OAUTH_AUTHORIZATION_CODE_INVALID);
        }

        User user = User.builder()
                .birthDate(requestDto.getBirthDate())
                .gender(requestDto.getGender())
                .build();

        String lockKey = "user_nickname_lock";
        redisLockRepository.runOnLock(lockKey, () -> {
            transactionHandler.runOnWriteTransaction(() -> {
                if (Objects.equals(redisTemplate.opsForValue().get("nickname_cache:" + requestDto.getUserNickname()), email)){
                    throw new CustomException(ExceptionType.NICKNAME_UNAUTHORIZED);
                }
                user.setUserNickname(requestDto.getUserNickname());
                userRepository.save(user);
                return null;
            });
            return null;
        });

        Set<Interest> updatedInterests = requestDto.getCategory().stream()
                .map(interestName -> interestRepository.findByName(interestName)
                        .orElseGet(() -> {
                            Interest newInterest = new Interest();
                            newInterest.setName(interestName);
                            return interestRepository.save(newInterest);
                        }))
                .collect(Collectors.toSet());
        user.setUserInterest(updatedInterests);

        Authentication authentication = Authentication.builder()
                .userGoogle(oAuthUserInfo.getUserEmail())
                .build();

        user.setAuthentication(authentication);

        userRepository.save(user);

        return "구글 회원가입이 완료되었습니다.";
    }

    private Token getToken(String authorizationCode) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("code", authorizationCode);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(googleTokenUri, request, String.class);

        String responseBody = response.getBody();

        try {
            JsonNode root = new ObjectMapper().readTree(responseBody);
            return Token.builder()
                    .accessToken(root.path("access_token").asText())
                    .refreshToken(root.path("refresh_token").asText())
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("Failed to extract access token", e);
        }
    }

    private OAuthUserInfo fetchUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<?> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(googleUserInfoUri, HttpMethod.GET, entity, String.class);

        String responseBody = response.getBody();

        try {
            JsonNode root = new ObjectMapper().readTree(responseBody);
            String userEmail = root.path("email").asText();
            String userName = root.path("name").asText();
            String userProfileImage = root.path("picture").asText();

            return OAuthUserInfo.builder()
                    .userEmail(userEmail)
                    .userNickname(userName)
                    .userProfile(userProfileImage)
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("Failed to extract user info", e);
        }
    }

    @Builder
    @Getter @Setter
    private static class Token {
        private String accessToken;
        private String refreshToken;
    }
}
