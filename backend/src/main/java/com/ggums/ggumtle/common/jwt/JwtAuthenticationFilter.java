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

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Value("${spring.jwt.secret.develop_token}")
    private String developToken;
    
    private final JwtTokenManager tokenManager;
    private static final String[] PERMIT_URL_ARRAY = {
            /* api */
            "/api/**",
            /* swagger v3 -> authorization */
            "/v3/api-docs/**",
            "/swagger-ui/**",
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
        if (Objects.equals(tokenManager.resolveAccessToken(request), developToken)) {
            // getting authentication
            Authentication auth = tokenManager.getAuthentication("1");
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


