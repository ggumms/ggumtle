package com.ggums.ggumtle.common.jwt;

import com.S10P11D111.NineToFive.common.exception.CustomException;
import com.S10P11D111.NineToFive.common.exception.ExceptionType;
import com.S10P11D111.NineToFive.common.redis.RefreshTokenRepository;
import com.S10P11D111.NineToFive.common.security.UserDetailsServiceImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtTokenManager {

    // Constants for JWT processing
    private final String AUTHORIZATION_HEADER = "Authorization";
    private final String prefix = "Bearer ";

    // JWT Secret keys
    @Value("${spring.jwt.secret.access}")
    private String accessSecretKey;
    @Value("${spring.jwt.secret.refresh}")
    private String refreshSecretKey;

    // Token validity durations in milliseconds
    public static long accessTokenValidTime = 60 * 60 * 1000L; // 1 hour
    public static long refreshTokenValidTime = 7 * 60 * 60 * 24 * 1000L; // 1 week

    // Dependencies
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserDetailsServiceImpl userDetailsService;

    /**
     * Creates an access token and sets it in the response header.
     *
     * @param userId    The user identifier for token generation.
     * @param response  The HttpServletResponse to set the token into.
     */
    public void createAccessToken(String userId, HttpServletResponse response) {
        String accessToken = generateToken(userId, accessTokenValidTime, accessSecretKey);
        response.setHeader(AUTHORIZATION_HEADER, prefix + accessToken);
    }

    /**
     * Recreates an access token using a refresh token when the access token is expired.
     *
     * @param refreshToken The refresh token for validating user identity.
     * @param response     The HttpServletResponse to set the new access token into.
     * @return The user ID for whom the token is created.
     */
    public String recreateAccessToken(String refreshToken, HttpServletResponse response){
        try {
            String userId = getUserIdFromRefreshToken(refreshToken);
            createAccessToken(userId, response);
            return userId;
        } catch (ExpiredJwtException e) {
            throw new CustomException(ExceptionType.TOKEN_EXPIRED);
        } catch (JwtException | IllegalArgumentException e) {
            log.info("Wrong Jwt Authentication");
            throw new CustomException(ExceptionType.NOT_VALID_TOKEN);
        }
    }

    /**
     * Sets an expired token in the response header to effectively delete the access token.
     * This method is used to signal the client that the current access token should no longer be used.
     *
     * @param response The HttpServletResponse where the expired token is to be set.
     */
    public void deleteAccessToken(HttpServletResponse response){
        String expiredToken = "expired";
        response.setHeader(AUTHORIZATION_HEADER, prefix + expiredToken);
    }

    /**
     * Creates a refresh token and sets it as a HttpOnly cookie in the response.
     * Saves the refresh token in Redis with the user's userId
     * as the key and the refresh token as the corresponding value.
     *
     * @param userId    The user identifier for token generation.
     * @param response  The HttpServletResponse to add the cookie into.
     */
    public void createRefreshToken(String userId, HttpServletResponse response) {
        String refreshToken = generateToken(userId, refreshTokenValidTime, refreshSecretKey);
        refreshTokenRepository.saveRefreshToken(userId, refreshToken, refreshTokenValidTime);
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setMaxAge((int)(refreshTokenValidTime / 1000));
        response.addCookie(refreshTokenCookie);
    }

    /**
     * Deletes the refresh token from the cookie to the response.
     *
     * @param response  The HttpServletResponse to remove the cookie from.
     */
    public void deleteRefreshTokenCookie(HttpServletResponse response){
        Cookie refreshTokenCookie = new Cookie("refreshToken", null);
        refreshTokenCookie.setMaxAge(0);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setPath("/");
        response.addCookie(refreshTokenCookie);
    }

    /**
     * Generates a JWT token with specified user ID and validity period.
     *
     * @param userId The user identifier to include in the token.
     * @param tokenValidTime The validity period of the token in milliseconds.
     * @param secretKey The secret key used for signing the token.
     * @return The generated JWT token.
     */
    private String generateToken(String userId, long tokenValidTime, String secretKey) {
        Claims claims = Jwts.claims().setSubject(userId);
        Date now = new Date();
        Date validity = new Date(now.getTime() + tokenValidTime);

        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Validates the given access token against the provided refresh token and updates the response.
     *
     * @param accessToken The access token to validate.
     * @param refreshToken The refresh token for comparison.
     * @param response The HttpServletResponse to set the new access token into.
     * @return The user ID extracted from the access token.
     */
    public String validateAccessToken(String accessToken, String refreshToken, HttpServletResponse response) {
        try {
            return getClaims(accessToken, accessSecretKey).getSubject();
        } catch (ExpiredJwtException e) {
            Claims claims = e.getClaims();
            String accessTokenUserId = claims.getSubject();
            String userId = getUserIdFromRefreshToken(refreshToken);

            if (accessTokenUserId.equals(userId)) {
                createAccessToken(userId, response);
                return userId;
            } else {
                throw new CustomException(ExceptionType.NOT_VALID_TOKEN);
            }
        } catch (JwtException | IllegalArgumentException e) {
            log.info("Wrong Jwt Authentication");
            throw new CustomException(ExceptionType.NOT_VALID_TOKEN);
        }
    }

    /**
     * Retrieves the user ID from the given refresh token.
     * Checks if the Refresh Token is valid.
     *
     * @param refreshToken The refresh token to extract the user ID from.
     * @return The user ID extracted from the refresh token.
     */
    private String getUserIdFromRefreshToken(String refreshToken){
        try {
            Claims claims = getClaims(refreshToken, refreshSecretKey);
            String redisRefreshToken = refreshTokenRepository.findRefreshTokenByUserId(claims.getSubject());
            if(!refreshToken.equals(redisRefreshToken)){
                throw new CustomException(ExceptionType.NOT_VALID_TOKEN);
            }
            return claims.getSubject();
        } catch (ExpiredJwtException e) {
            throw new CustomException(ExceptionType.TOKEN_EXPIRED);
        } catch (JwtException | IllegalArgumentException e) {
            log.info("Wrong Jwt Authentication");
            throw new CustomException(ExceptionType.NOT_VALID_TOKEN);
        }
    }

    /**
     * Retrieves the authentication details for the specified user ID.
     * Currently, no credentials(password) and no authorities.
     *
     * @param userId The user identifier to retrieve the authentication details for.
     * @return The Authentication object containing user details.
     */
    public Authentication getAuthentication(String userId){
        return new UsernamePasswordAuthenticationToken(userDetailsService.loadUserByUsername(userId), null, null);
    }

    /**
     * Extracts the claims from the given JWT token using the specified secret key.
     *
     * @param jwt The JWT token to parse.
     * @param secretKey The secret key used for verifying the token.
     * @return The claims extracted from the JWT token.
     */
    private Claims getClaims(String jwt, String secretKey){
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwt)
                .getBody();
    }

    /**
     * Extracts the access token from header "Authorization".
     *
     * @param request The HttpServletRequest to resolve access token.
     * @return access token resolved from header.
     */
    public String resolveAccessToken(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    /**
     * Extracts the refresh token from cookie "refreshToken".
     *
     * @param request The HttpServletRequest to resolve refresh token.
     * @return refresh token resolved from cookie.
     */
    public String resolveRefreshToken(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        throw new CustomException(ExceptionType.NO_TOKEN);
    }

    /**
     * Deletes the refresh token from the redis repository and removes the cookie from the response.
     *
     * @param userId    The user identifier whose token needs to be deleted.
     * @param response  The HttpServletResponse to remove the cookie from.
     */
    public void logoutToken(String userId, HttpServletResponse response){
        refreshTokenRepository.deleteRefreshToken(userId);
        deleteRefreshTokenCookie(response);
    }
}
