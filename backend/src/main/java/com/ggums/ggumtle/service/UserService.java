package com.ggums.ggumtle.service;

import com.ggums.ggumtle.common.handler.AlarmHandler;
import com.ggums.ggumtle.common.handler.ImageHandler;
import com.ggums.ggumtle.common.handler.TransactionHandler;
import com.ggums.ggumtle.common.jwt.JwtTokenManager;
import com.ggums.ggumtle.common.redis.RedisLockRepository;
import com.ggums.ggumtle.common.exception.CustomException;
import com.ggums.ggumtle.common.exception.ExceptionType;
import com.ggums.ggumtle.dto.request.PasswordChangeRequestDto;
import com.ggums.ggumtle.dto.request.UserFollowRequestDto;
import com.ggums.ggumtle.dto.request.UserUpdateRequestDto;
import com.ggums.ggumtle.dto.response.UserInfoResponseDto;
import com.ggums.ggumtle.dto.response.UserListResponseDto;
import com.ggums.ggumtle.dto.response.UserStatsResponseDto;
import com.ggums.ggumtle.dto.response.model.UserListDto;
import com.ggums.ggumtle.entity.*;
import com.ggums.ggumtle.repository.*;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.authorization.AuthorizationWebFilter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final RedisLockRepository redisLockRepository;
    private final TransactionHandler transactionHandler;
    private final InterestRepository interestRepository;
    private final BucketRepository bucketRepository;
    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    private final ReviewReactionRepository reviewReactionRepository;
    private final BucketReactionRepository bucketReactionRepository;
    private final CommentBucketRepository commentBucketRepository;
    private final CommentReviewRepository commentReviewRepository;
    private final AuthenticationRepository authenticationRepository;
    private final AlarmRepository alarmRepository;
    private final JwtTokenManager jwtTokenManager;
    private final ImageHandler imageHandler;
    private final AlarmHandler alarmHandler;
    private final PasswordEncoder passwordEncoder;

    public String updateUser(User user, MultipartFile userImage, UserUpdateRequestDto requestDto){

        // user update
        if(requestDto.getUserNickname() != null && !user.getUserNickname().equals(requestDto.getUserNickname())){
            String lockKey = "user_nickname_lock";
            redisLockRepository.runOnLock(lockKey, () -> {
                transactionHandler.runOnWriteTransaction(() -> {
                    Optional<User> userNicknameCheck = userRepository.findByUserNickname(requestDto.getUserNickname());
                    if(userNicknameCheck.isPresent()) {
                        throw new CustomException(ExceptionType.NICKNAME_DUPLICATE);
                    }
                    user.setUserNickname(requestDto.getUserNickname());
                    userRepository.save(user);
                    return null;
                });
                return null;
            });
        }
        if(requestDto.getBirthDate() != null){
            user.setBirthDate(requestDto.getBirthDate());
        }
        if(requestDto.getGender() != null){
            user.setGender(requestDto.getGender());
        }
        if (requestDto.getCategory() != null) {
            Set<Interest> updatedInterests = requestDto.getCategory().stream()
                    .map(interestName -> interestRepository.findByName(interestName)
                            .orElseGet(() -> {
                                Interest newInterest = new Interest();
                                newInterest.setName(interestName);
                                return interestRepository.save(newInterest);
                            }))
                    .collect(Collectors.toSet());
            user.setUserInterest(updatedInterests);
        }

        user.setUserProfileImage(imageHandler.uploadImage(userImage, "userProfile", "user_profile_" + user.getId()));

        userRepository.save(user);

        return "업데이트를 완료하였습니다.";
    }

    @Transactional(readOnly = true)
    public UserInfoResponseDto userInfo(User currentUser, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ExceptionType.NOT_FOUND_USER));
        Bucket bucket = user.getRepBucket();

        Optional<Follow> follow = followRepository.findByFollowerAndFollowee(currentUser, user);
        Boolean followStatus = null;
        if(!currentUser.getId().equals(userId)){
            followStatus = follow.isPresent();
        }
        Boolean isAchieved = null;
        LocalDateTime dateTime = (bucket != null && bucket.getCreatedDate() != null) ? bucket.getCreatedDate() : LocalDateTime.now();
        if (bucket != null && bucket.getId() != null) {
            isAchieved = bucket.getAchievementDate() != null;
            if (isAchieved) {
                dateTime = bucket.getAchievementDate().atStartOfDay();
            }
        }

        return UserInfoResponseDto.builder()
                .userId(userId)
                .userProfileImage(user.getUserProfileImage())
                .userNickname(user.getUserNickname())
                .category(user.getUserInterest().stream().map(Interest::getName).collect(Collectors.toList()))
                .bucketId(bucket != null ? bucket.getId() : null)
                .bucketTitle(bucket != null ? bucket.getTitle() : null)
                .dayCount(bucket != null ? ChronoUnit.DAYS.between(dateTime, LocalDateTime.now()) + 1 : null)
                .bucketColor(bucket != null ? bucket.getColor() : null)
                .isAchieved(isAchieved)
                .owner(currentUser.getId().equals(userId))
                .isFollowing(followStatus)
                .build();
    }

    public String representativeBucket(User user, Long bucketId){
        User findUser = userRepository.findById(user.getId()).orElseThrow(() -> new CustomException(ExceptionType.NOT_FOUND_USER));

        if(bucketId == null){
            findUser.setRepBucket(null);
            return "대표 버킷이 삭제되었습니다.";
        }

        Bucket bucket = bucketRepository.findById(bucketId)
                .orElseThrow(() -> new CustomException(ExceptionType.BUCKET_NOT_FOUND));

        if(!bucket.getUser().getId().equals(user.getId())){
            throw new CustomException(ExceptionType.NOT_VALID_ROLE);
        }

        // 비공개인 버킷은 대표버킷으로 지정할 수 없다.
        if (bucket.getIsPrivate()) {
            throw new CustomException(ExceptionType.BUCKET_NOT_VALID);
        }

        findUser.setRepBucket(bucket);

        return "대표 버킷을 반영하였습니다. 버킷 : " + bucketId;
    }

    @Transactional(readOnly = true)
    public UserListResponseDto searchUsers(String word, Pageable pageable, User currentUser) {
        Page<User> users = userRepository.findByUserNicknameContainingAndDeletedDateIsNull(word, pageable);
        List<Long> userIds = users.getContent().stream()
                .filter(u -> !u.getId().equals(currentUser.getId()))
                .map(User::getId) // only one user needs to be filtered
                .collect(Collectors.toList());

        Map<Long, Boolean> followingMap = getFollowingMap(currentUser, userIds);

        Page<UserListDto> searchList = users.map(user -> convertToUserSearchListDto(user, followingMap));
        return UserListResponseDto.builder().searchList(searchList).build();
    }

    private Map<Long, Bucket> getRepresentativeBucketsMap(List<Long> userIds) {
        List<Bucket> repBucket = bucketRepository.findByUserIdIn(userIds);
        return repBucket.stream().collect(Collectors.toConcurrentMap(rb -> rb.getUser().getId(), Function.identity()));
    }

    private Map<Long, Boolean> getFollowingMap(User currentUser, List<Long> userIds) {
        List<Follow> follows = followRepository.findByFollowerIdAndFolloweeIdIn(currentUser.getId(), userIds);
        Set<Long> followingIds = follows.stream().map(follow -> follow.getFollowee().getId()).collect(Collectors.toSet());
        return userIds.stream().collect(Collectors.toConcurrentMap(Function.identity(), followingIds::contains));
    }

    private UserListDto convertToUserSearchListDto(User user, Map<Long, Boolean> followingMap) {
        Bucket repBucket = user.getRepBucket();
        String bucketTitle = null;
        String bucketColor = null;
        boolean isAchieved = false;
        Long bucketId = null;

        if (repBucket != null) {
            bucketTitle = repBucket.getTitle();
            bucketColor = repBucket.getColor();
            isAchieved = repBucket.getAchievementDate() != null;
            bucketId = repBucket.getId();
        }

        Boolean isFollowing = followingMap.getOrDefault(user.getId(), false);

        return UserListDto.builder()
                .userId(user.getId())
                .userProfileImage(user.getUserProfileImage())
                .userNickname(user.getUserNickname())
                .isFollowing(isFollowing)
                .bucketId(bucketId)
                .bucketTitle(bucketTitle)
                .bucketColor(bucketColor)
                .isAchieved(isAchieved)
                .build();
    }


    public String followUser(User user, UserFollowRequestDto requestDto){
        User followee = userRepository.findById(requestDto.getFollowee()).orElseThrow(() -> new CustomException(ExceptionType.NOT_FOUND_USER));
        if(followee.getId().equals(user.getId())){
            throw new CustomException(ExceptionType.SELF_SUBSCRIPTION_ATTEMPTED);
        }

        Optional<Follow> followOpt = followRepository.findByFollowerAndFollowee(user, followee);

        // 언팔 요청인 경우
        if(!requestDto.getIsFollowing()){

            followOpt.ifPresent(followRepository::delete);

            return user.getUserNickname() + "님이 " + followee.getUserNickname() + "님을 구독 취소하였습니다.";
        }// 팔로우 요청인 경우
        else{

            // 삭제는 ifPresent가 걸려있어 에러 안 던져도 상관없음
            // 대신 생성은 잘못된 요청을 보낼 수도 있응게 걸러주는게 맞지 않을까

            if (followOpt.isPresent()) {
                throw new CustomException(ExceptionType.ALREADY_FOLLOWING);
            }

            Follow follow = followOpt.orElseGet(() -> Follow.builder()
                    .follower(user)
                    .followee(followee)
                    .build());
           followRepository.save(follow);
           alarmHandler.createUserAlarm(followee, user, AlarmType.follow);

            return user.getUserNickname() + "님이 " + followee.getUserNickname() + "님을 구독하였습니다.";
        }

    }

    // users who userId follows
    public UserListResponseDto userFolloweeList(Long userId, Pageable pageable){
        Optional<User> userOpt = userRepository.findById(userId);
        if(userOpt.isEmpty()){
            throw new CustomException(ExceptionType.NOT_FOUND_USER);
        }
        User user = userOpt.get();

        Page<Follow> following = followRepository.findByFollower(user, pageable);
        Page<UserListDto> searchList = following.map(follow -> convertToUserListDto(follow.getFollowee()));
        return UserListResponseDto.builder().searchList(searchList).build();
    }

    // users who userId follows
    public UserListResponseDto userFollowerList(Long userId, Pageable pageable) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ExceptionType.NOT_FOUND_USER));

        Page<Follow> followers = followRepository.findByFollowee(user, pageable);
        Page<UserListDto> searchList = followers.map(follower -> convertToUserListDto(follower.getFollower()));
        return UserListResponseDto.builder().searchList(searchList).build();
    }

    private UserListDto convertToUserListDto(User user) {
        Bucket repBucket = user.getRepBucket();
        String bucketTitle = null;
        String bucketColor = null;
        boolean isAchieved = false;
        Long bucketId = null;

        if (repBucket != null) {
            bucketTitle = repBucket.getTitle();
            bucketColor = repBucket.getColor();
            isAchieved = repBucket.getAchievementDate() != null;
            bucketId = repBucket.getId();
        }

        return UserListDto.builder()
                .userId(user.getId())
                .userProfileImage(user.getUserProfileImage())
                .userNickname(user.getUserNickname())
                .bucketId(bucketId)
                .bucketTitle(bucketTitle)
                .bucketColor(bucketColor)
                .isAchieved(isAchieved)
                .build();
    }

    public UserStatsResponseDto getUserStats(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ExceptionType.NOT_FOUND_USER));

        List<Bucket> userBuckets = bucketRepository.findByUser(user);
        long totalBuckets = userBuckets.size();
        long achievedBuckets = userBuckets.stream()
                .filter(bucket -> bucket.getAchievementDate() != null)
                .count();
        int achieveRate = totalBuckets > 0 ? (int) ((achievedBuckets * 100) / totalBuckets) : 0;

        int followerCount = followRepository.countByFollowee(user);
        int followingCount = followRepository.countByFollower(user);

        return UserStatsResponseDto.builder()
                .achieveRate(achieveRate)
                .follower(followerCount)
                .following(followingCount)
                .build();
    }

    public String deleteUser(User userDetails) {
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new CustomException(ExceptionType.NOT_FOUND_USER));

        if (user.getDeletedDate() != null) {
            throw new CustomException(ExceptionType.ALREADY_WITHDRAWN_USER);
        }

        user.setRepBucket(null);
        user.setDeletedDate(LocalDateTime.now());

        bucketRepository.deleteAllByUser(user);
        followRepository.deleteAllByUser(user);
        reviewReactionRepository.deleteAllByUser(user);
        bucketReactionRepository.deleteAllByUser(user);
        commentBucketRepository.deleteAllByUser(user);
        commentReviewRepository.deleteAllByUser(user);
        alarmRepository.deleteAllByUser(user);
        user.getUserInterest().clear();

        return "사용자 탈퇴 및 관련 데이터 삭제 처리되었습니다.";
    }

    public String logout(User user, HttpServletResponse response){

        jwtTokenManager.logoutToken(user.getUsername(), response);

        return "로그아웃 성공";
    }

    public String passwordChange(User user, PasswordChangeRequestDto requestDto){

        if (user.getAuthentication().getUserEmail() == null){
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }
        if (!passwordEncoder.matches(requestDto.getUserPassword(), user.getAuthentication().getUserEmailPassword())){
            throw new CustomException(ExceptionType.INVALID_LOGIN);
        }

        Authentication authentication = user.getAuthentication();
        authentication.setUserEmailPassword(passwordEncoder.encode(requestDto.getChangedPassword()));
        authenticationRepository.save(authentication);

        return "비밀번호 변경이 완료되었습니다.";
    }
}
