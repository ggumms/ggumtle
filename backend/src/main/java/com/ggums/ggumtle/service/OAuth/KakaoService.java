package com.ggums.ggumtle.service.OAuth;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ggums.ggumtle.dto.response.OAuthLoginResponseDto;
import com.ggums.ggumtle.dto.response.model.OAuthUserInfo;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class KakaoService {

    @Value("${spring.security.oauth2.client.provider.kakao.token-uri}")
    private String kakaoTokenUri;
    @Value("${spring.security.oauth2.client.provider.kakao.user-info-uri}")
    private String kakaoUserInfoUri;
    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String clientId;
    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String clientSecret;
    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String redirectUri;

    private final RestTemplate restTemplate = new RestTemplate();

    public OAuthLoginResponseDto kakaoLogin(String authorizationCode){

        return null;
    }

    private Token getToken(String authorizationCode) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", authorizationCode);
        params.add("client_secret", clientSecret);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(kakaoTokenUri, request, String.class);

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
        ResponseEntity<String> response = restTemplate.exchange(kakaoUserInfoUri, HttpMethod.GET, entity, String.class);

        String responseBody = response.getBody();

        try {
            JsonNode root = new ObjectMapper().readTree(responseBody);

            String userNickname = root.path("properties").path("nickname").asText();
            String userProfile = root.path("properties").path("profile_image").asText();
            String userEmail = root.path("kakao_account").path("email").asText();

            return OAuthUserInfo.builder()
                    .userNickname(userNickname)
                    .userProfile(userProfile)
                    .userEmail(userEmail)
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("Failed to extract user info", e);
        }
    }

    @Builder @Getter @Setter
    private static class Token{
        private String accessToken;
        private String refreshToken;
    }
}