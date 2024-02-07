package com.ggums.ggumtle.common.jwt;

import com.ggums.ggumtle.common.exception.CustomException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * @author 404-not-foundl
 * @since 2023-12-14
 * @version spring security 6.1.5
 * @version spring boot 3.1.6
 * @version java 17
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Value("${spring.jwt.secret.develop_dummy_1}")
    private String developDummy1;
    @Value("${spring.jwt.secret.develop_dummy_2}")
    private String developDummy2;
    @Value("${spring.jwt.secret.develop_dummy_3}")
    private String developDummy3;
    @Value("${spring.jwt.secret.develop_dummy_4}")
    private String developDummy4;
    @Value("${spring.jwt.secret.develop_dummy_5}")
    private String developDummy5;
    @Value("${spring.jwt.secret.develop_dummy_6}")
    private String developDummy6;

    private final JwtTokenManager tokenManager;
    private static final String[] PERMIT_URL_ARRAY = {
            /* api */
            "/api/**",
            /* swagger v3 -> authorization */
            "/v3/api-docs/**",
            "/swagger-ui/**",
            /* image */
            "/image/**"
    };
    private final RequestMatcher permitMatcher;

    public JwtAuthenticationFilter(JwtTokenManager tokenManager) {
        this.tokenManager = tokenManager;
        List<RequestMatcher> matchers = Arrays.stream(PERMIT_URL_ARRAY)
                .map(AntPathRequestMatcher::new)
                .collect(Collectors.toList());
        this.permitMatcher = new OrRequestMatcher(matchers);
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        if (permitMatcher.matches(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        // for develop test
        List<String> developDummyTokens = Arrays.asList(developDummy1, developDummy2, developDummy3, developDummy4, developDummy5, developDummy6);
        String resolvedToken = tokenManager.resolveAccessToken(request);
        if (developDummyTokens.contains(resolvedToken)) {
            // getting authentication
            Authentication auth;
            if(resolvedToken.equals(developDummy1)){
                auth = tokenManager.getAuthentication("1");
            } else if (resolvedToken.equals(developDummy2)) {
                auth = tokenManager.getAuthentication("2");
            } else if (resolvedToken.equals(developDummy3)) {
                auth = tokenManager.getAuthentication("3");
            } else if (resolvedToken.equals(developDummy4)) {
                auth = tokenManager.getAuthentication("4");
            } else if (resolvedToken.equals(developDummy5)){
                auth = tokenManager.getAuthentication("5");
            } else auth = tokenManager.getAuthentication("6");

            SecurityContextHolder.getContext().setAuthentication(auth);
        }else{
            try {
                // resolve refresh token
                String refreshToken = tokenManager.resolveRefreshToken(request);

                // checking access token
                String accessToken = tokenManager.resolveAccessToken(request);
                String userId;
                if(accessToken == null){
                    userId = tokenManager.recreateAccessToken(refreshToken, response);
                }else{
                    userId = tokenManager.validateAccessToken(accessToken, refreshToken, response);
                }

                // getting authentication
                Authentication auth = tokenManager.getAuthentication(userId);
                SecurityContextHolder.getContext().setAuthentication(auth);

            } catch (CustomException ex) {
                SecurityContextHolder.clearContext();
                tokenManager.deleteRefreshTokenCookie(response);
                tokenManager.deleteAccessToken(response);
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}


