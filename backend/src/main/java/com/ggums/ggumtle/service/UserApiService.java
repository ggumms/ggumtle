package com.ggums.ggumtle.service;

import com.ggums.ggumtle.common.exception.CustomException;
import com.ggums.ggumtle.common.exception.ExceptionType;
import com.ggums.ggumtle.common.handler.AlarmHandler;
import com.ggums.ggumtle.common.handler.TransactionHandler;
import com.ggums.ggumtle.common.jwt.JwtTokenManager;
import com.ggums.ggumtle.common.redis.RedisLockRepository;
import com.ggums.ggumtle.dto.request.*;
import com.ggums.ggumtle.entity.AlarmType;
import com.ggums.ggumtle.entity.Authentication;
import com.ggums.ggumtle.entity.Interest;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.repository.AuthenticationRepository;
import com.ggums.ggumtle.repository.InterestRepository;
import com.ggums.ggumtle.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserApiService {

    private final UserRepository userRepository;
    private final RedisLockRepository redisLockRepository;
    private final TransactionHandler transactionHandler;
    private final InterestRepository interestRepository;
    private final StringRedisTemplate redisTemplate;
    private final AuthenticationRepository authenticationRepository;
    private final JavaMailSender mailSender;
    private final AlarmHandler alarmHandler;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenManager jwtTokenManager;

    private final int MAX_EMAIL_REQUESTS = 10;
    private final int TIME_LIMIT_MINUTES = 3;
    private final int VERIFICATION_CODE_SIZE = 10;
    private final String CHANGE_PWD_AUTH = "changePwdAuth:";
    private final String EMAIL_LIMIT_TIME_KEY="email_authentication_code:";


    public Boolean isNicknameDuplicate(String nickname){
        Optional<User> user = userRepository.findByUserNickname(nickname);
        return user.isPresent();
    }

    public boolean nicknameCacheSave(NicknameCacheSaveRequestDto requestDto){

        if (Boolean.FALSE.equals(redisTemplate.hasKey("email_join_authorized:" + requestDto.getUserEmail()))){
            throw new CustomException(ExceptionType.NOT_VALID_ROLE);
        }

        if (Boolean.TRUE.equals(redisTemplate.hasKey("nickname_cache:" + requestDto.getUserEmail()))){
            redisTemplate.delete("nickname_cache:" + requestDto.getUserEmail());
        }

        AtomicBoolean result = new AtomicBoolean(false);
        String lockKey = "user_nickname_cache";
        redisLockRepository.runOnLock(lockKey, () -> {
            transactionHandler.runOnWriteTransaction(() -> {
                Optional<User> userNicknameCheck = userRepository.findByUserNickname(requestDto.getUserNickname());
                if(userNicknameCheck.isPresent() || Boolean.TRUE.equals(redisTemplate.hasKey("nickname_cache:" + requestDto.getUserNickname()))) {
                    result.set(true);
                } else {
                    redisTemplate.opsForValue().set("nickname_cache:" + requestDto.getUserNickname(), requestDto.getUserEmail(), 1, TimeUnit.HOURS);
                    result.set(false);
                }
                return null;
            });
            return null;
        });

        return result.get();
    }

    public String sendJoinVerificationEmail(EmailAuthenticationRequestDto requestDto){
        String email = requestDto.getUserEmail();
        if(authenticationRepository.findByUserEmail(email).isPresent()){
            throw new CustomException(ExceptionType.ALREADY_EXIST_USER_EMAIL);
        }
        Optional<Authentication> authenticationOpt = authenticationRepository.findByUserKakaoOrUserGoogle(email, email);
        if(authenticationOpt.isPresent()){
            if (authenticationOpt.get().getUserKakao() != null && authenticationOpt.get().getUserGoogle() != null){
                throw new CustomException(ExceptionType.KAKAO_GOOGLE_OAUTH_EXIST);
            }
            if (authenticationOpt.get().getUserKakao() != null){
                throw new CustomException(ExceptionType.KAKAO_OAUTH_EXIST);
            }
            if (authenticationOpt.get().getUserGoogle() != null){
                throw new CustomException(ExceptionType.GOOGLE_OAUTH_EXIST);
            }
        }

        // checking if count is over 10
        String key = "email_join_verification_count:";
        int count = checkEmailRequestLimit(key, email, MAX_EMAIL_REQUESTS);

        // getting verification code
        String verificationCode = getAuthenticationCode("email_join_authentication_code:", email, TIME_LIMIT_MINUTES);
        sendEmail(email, "GGUMTLE Verification Code",
                "Dear User,\n\n" +
                        "We are delighted to assist you with your request. This is your request number " + count + ".\n\n" +
                        "Your verification code is: " + verificationCode + "\n\n" +
                        "Thank you for choosing GGUMTLE. Should you need any further assistance, please do not hesitate to contact us.\n\n" +
                        "Best Regards,\n" +
                        "The GGUMMS Team");

        updateRequestCount(key, email);

        return "인증 이메일을 발송하였습니다.";
    }

    public String joinVerificationEmail(EmailVerificationRequestDto requestDto){
        String email = requestDto.getEmail();
        String emailVerificationCode = "email_join_authentication_code:" + email;
        String verifyAttemptKey = "email_join_authentication_code_attempt:";

        if (authenticationRepository.findByUserEmail(email).isPresent()){
            throw new CustomException(ExceptionType.ALREADY_EXIST_USER_EMAIL);
        }
        if (Boolean.FALSE.equals(redisTemplate.hasKey(emailVerificationCode))){
            throw new CustomException(ExceptionType.VERIFICATION_CODE_NOT_FOUND);
        }

        checkEmailRequestLimit(verifyAttemptKey, email, 10);
        if (Objects.equals(redisTemplate.opsForValue().get(emailVerificationCode), requestDto.getCode())){
            redisTemplate.opsForValue().set("email_join_authorized:"+email, "ok", 1, TimeUnit.HOURS);
            return "인증코드가 확인되었습니다.";
        }else {
            updateRequestCount(verifyAttemptKey, email);
            return "인증코드가 일치하지 않습니다.";
        }
    }

    public String emailJoin(HttpServletResponse response, EmailJoinRequestDto requestDto){

        String email = requestDto.getUserEmail();

        if (Boolean.FALSE.equals(redisTemplate.hasKey("email_join_authorized:" + email))){
            throw new CustomException(ExceptionType.VERIFICATION_CODE_EXPIRED);
        }

        User user = User.builder()
                .birthDate(requestDto.getBirthDate())
                .gender(requestDto.getGender())
                .build();

        String lockKey = "user_nickname_lock";
        redisLockRepository.runOnLock(lockKey, () -> {
            transactionHandler.runOnWriteTransaction(() -> {
                if (!Objects.equals(redisTemplate.opsForValue().get("nickname_cache:" + requestDto.getUserNickname()), email)){
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
                .userEmail(requestDto.getUserEmail())
                .userEmailPassword(passwordEncoder.encode(requestDto.getUserPassword()))
                .build();

        authenticationRepository.save(authentication);

        user.setAuthentication(authentication);

        userRepository.save(user);

        alarmHandler.createUserAlarm(user, null, AlarmType.join);

        jwtTokenManager.createAccessToken(user.getUsername(), response);
        jwtTokenManager.createRefreshToken(user.getUsername(), response);

        return "이메일 회원가입이 완료되었습니다.";
    }

    public String emailLogin(HttpServletResponse response, EmailLoginRequestDto requestDto){

        String email = requestDto.getUserEmail();
        String password = requestDto.getUserPassword();

        Authentication authentication = authenticationRepository.findAuthenticationByUserEmail(requestDto.getUserEmail())
                .orElseThrow(()-> new CustomException(ExceptionType.NOT_FOUND_USER));

        if(Boolean.TRUE.equals(redisTemplate.hasKey("lockAccount:" + authentication.getUserEmail()))){
            throw new CustomException(ExceptionType.ACCOUNT_LOCKED);
        }

        if(!passwordEncoder.matches(password, authentication.getUserEmailPassword())){
            if(authentication.getFailedLoginAttempts() < 5){
                authentication.setFailedLoginAttempts(authentication.getFailedLoginAttempts() + 1);
            }
            if(authentication.getFailedLoginAttempts() >= 5){
                authentication.setFailedLoginAttempts(0);
                String lockEmailCountKey = "lockEmailCount:" + email;
                if(Boolean.FALSE.equals(redisTemplate.hasKey(lockEmailCountKey))){
                    redisTemplate.opsForValue().set(lockEmailCountKey, "0", 1, TimeUnit.DAYS);
                }
                redisTemplate.opsForValue().increment(lockEmailCountKey, 1);
                if(Integer.parseInt(Objects.requireNonNull(redisTemplate.opsForValue().get(lockEmailCountKey))) <= 3){
                    sendEmail(email, "GGUMTLE :: Account Locked Due to Repeated Login Attempts",
                            """
                            Your account has been temporarily locked due to 5 consecutive failed login attempts.
                            It will be unlocked after 30 minutes. Please be cautious with your login details.
                  
                            Note: Email notifications are limited to a maximum of 3 per day.
                            Continuous attempts may result in additional account locking without further email notifications.
                            """);
                }
                redisTemplate.opsForValue().set("lockAccount:" + email, email, 30, TimeUnit.MINUTES);
                authenticationRepository.save(authentication);
                throw new CustomException(ExceptionType.ACCOUNT_LOCKED);
            }
            authenticationRepository.save(authentication);
            throw new CustomException(ExceptionType.INVALID_LOGIN);
        }

        authentication.setFailedLoginAttempts(0);
        authenticationRepository.save(authentication);
        User user = authentication.getUser();

        jwtTokenManager.createAccessToken(user.getUsername(), response);
        jwtTokenManager.createRefreshToken(user.getUsername(), response);

        return "로그인 성공";
    }

    public String sendFindVerificationEmail(EmailAuthenticationRequestDto requestDto){
        String email = requestDto.getUserEmail();
        if(authenticationRepository.findByUserEmail(email).isEmpty()){
            throw new CustomException(ExceptionType.NOT_FOUND_USER);
        }

        String passwordChangeKey = "passwordChange:" + email;
        String sendPwdReqCntKey = "sendPwdReqCnt:" + email;

        if(Boolean.TRUE.equals(redisTemplate.hasKey(passwordChangeKey))){
            throw new CustomException(ExceptionType.PASSWORD_REQUEST_LIMIT_EXCEEDED);
        }

        Authentication authentication = authenticationRepository.findByUserEmail(email)
                .orElseThrow(() -> new CustomException(ExceptionType.NOT_FOUND_USER));
        if (authentication.getUser().getDeletedDate() != null){
            throw new CustomException(ExceptionType.NOT_FOUND_USER);
        }

        String requestCountStr = redisTemplate.opsForValue().get(sendPwdReqCntKey);
        if (requestCountStr != null) {
            int requestCount = Integer.parseInt(requestCountStr);
            if (requestCount >= 3) {
                throw new CustomException(ExceptionType.EMAIL_REQUEST_LIMIT_EXCEEDED);
            }
        } else {
            requestCountStr = "1";
        }

        // getting verification code
        String code = getAuthenticationCode(CHANGE_PWD_AUTH, email, 3);
        sendEmail(email, "GGUMTLE :: Password Reset Verification Code",
                "We have received a request to reset the password for your GGUMTLE account.\n" +
                        "To proceed with resetting your password, please use the following verification code:\n\n" + code +
                        "\nThis code will be valid for 3 minutes. If you did not request a password reset, " +
                        "please ignore this email or contact us for assistance.\n\n" +
                        "Note: You are allowed to reset your password only once per day. " +
                        "When the code is verified, your account would be able to request new password for 1 hour" +
                        "Also, email notifications are limited to a maximum of 3 per day. This is request number " + Integer.parseInt(requestCountStr) + " of 3 today.\n\n" +
                        "Best regards,\n" +
                        "The GGUMMS Team");

        updateChangePwdReqCnt(email);

        return "비밀번호를 재발급하였습니다.";
    }

    public String findVerificationEmail(EmailVerificationRequestDto requestDto){

        String email = requestDto.getEmail();

        if (Boolean.FALSE.equals(redisTemplate.hasKey(CHANGE_PWD_AUTH + email))){
            throw new CustomException(ExceptionType.VERIFICATION_CODE_EXPIRED);
        }
        if (!Objects.equals(requestDto.getCode(), redisTemplate.opsForValue().get(CHANGE_PWD_AUTH + email))){
            throw new CustomException(ExceptionType.VERIFICATION_CODE_MISMATCH);
        }

        redisTemplate.opsForValue().set("passwordChangeAuthorized:" + email, email, 1, TimeUnit.DAYS);

        return "비밀번호 변경이 허용이 되었습니다.";
    }

    public String sendNewPasswordToEmail(EmailAuthenticationRequestDto requestDto){
        String email = requestDto.getUserEmail();

        Authentication authentication = authenticationRepository.findByUserEmail(email)
                .orElseThrow(() -> new CustomException(ExceptionType.NOT_FOUND_USER));
        if(Boolean.FALSE.equals(redisTemplate.hasKey("passwordChangeAuthorized:" + email))){
            throw new CustomException(ExceptionType.VERIFICATION_CODE_EXPIRED);
        }

        String code = generateVerificationCode(10);
        authentication.setUserEmailPassword(code);
        authenticationRepository.save(authentication);
        sendEmail(email, "GGUMMS :: Password Successfully Reset",
                "Dear User,\n\n" +
                        "Your GGUMTLE account password has been successfully reset.\n" +
                        "You can now log in to your account using your new password.\n\n" +
                        "If you did not initiate this change or if you encounter any issues, please contact us immediately for assistance.\n\n" +
                        "For security purposes, remember to keep your password confidential and avoid sharing it with others.\n\n" +
                        "New Password : " + code + "\n\n" +
                        "Best regards,\n" +
                        "The GGUMMS Team");

        return "비밀번호 변경 완료.";
    }

    // service internal method ---------------------------------------------------------------------------

    private void sendEmail(String email, String subject, String text){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    private int checkEmailRequestLimit(String key, String email, int maxRequest){
        String countKey = key + email;
        String countStr = redisTemplate.opsForValue().get(countKey);
        int count = countStr != null ? Integer.parseInt(countStr) + 1 : 1;

        if(count > maxRequest){
            throw new CustomException(ExceptionType.EMAIL_REQUEST_LIMIT_EXCEEDED);
        }

        return count;
    }

    private void updateRequestCount(String key, String email) {
        String countKey = key + email;
        String countStr = redisTemplate.opsForValue().get(countKey);
        if(countStr == null){
            redisTemplate.opsForValue().set(countKey, "1", 1, TimeUnit.DAYS);
        }else{
            redisTemplate.opsForValue().increment(countKey, 1);
        }
    }

    private void updateChangePwdReqCnt(String email){
        String countKey = "sendPwdReqCnt:" + email;
        String countStr = redisTemplate.opsForValue().get(countKey);
        if(countStr == null){
            redisTemplate.opsForValue().set(countKey, "1", getPwdChangeExpirationTime(email), TimeUnit.SECONDS);
        }else{
            redisTemplate.opsForValue().increment(countKey, 1);
        }
    }

    private Long getPwdChangeExpirationTime(String email){
        return redisTemplate.getExpire(EMAIL_LIMIT_TIME_KEY + email, TimeUnit.SECONDS);
    }

    /**
     * Generates a random verification code with the specified length.
     * The code will contain at least one uppercase letter, one lowercase letter, one number, and one special character.
     *
     * @param length the length of the verification code. Must be 4 or more.
     * @return the generated verification code
     * @throws IllegalArgumentException if length is less than 4
     */
    private String generateVerificationCode(int length) {
        if (length < 4) {
            throw new IllegalArgumentException("Length must be at least 4");
        }

        String upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
        String numbers = "0123456789";
        String specialCharacters = "!@#$%^&*()_+{}[]:;<>,.?~/-";
        String combinedChars = upperCaseLetters + lowerCaseLetters + numbers + specialCharacters;
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(length);

        sb.append(upperCaseLetters.charAt(random.nextInt(upperCaseLetters.length())));
        sb.append(lowerCaseLetters.charAt(random.nextInt(lowerCaseLetters.length())));
        sb.append(numbers.charAt(random.nextInt(numbers.length())));
        sb.append(specialCharacters.charAt(random.nextInt(specialCharacters.length())));

        for (int i = 4; i < length; i++) {
            sb.append(combinedChars.charAt(random.nextInt(combinedChars.length())));
        }

        return sb.toString();
    }

    private String getAuthenticationCode(String key, String email, int time){
        String codeKey = key + email;
        String codeVal = generateVerificationCode(VERIFICATION_CODE_SIZE);
        redisTemplate.opsForValue().set(codeKey, codeVal, time, TimeUnit.MINUTES);
        return codeVal;
    }

}
