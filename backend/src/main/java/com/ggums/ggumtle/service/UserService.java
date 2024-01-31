package com.ggums.ggumtle.service;

import com.ggums.ggumtle.common.handler.AlarmHandler;
import com.ggums.ggumtle.common.handler.ImageHandler;
import com.ggums.ggumtle.common.handler.TransactionHandler;
import com.ggums.ggumtle.common.redis.RedisLockRepository;
import com.ggums.ggumtle.common.exception.CustomException;
import com.ggums.ggumtle.common.exception.ExceptionType;
import com.ggums.ggumtle.dto.request.UserFollowRequestDto;
import com.ggums.ggumtle.dto.request.UserUpdateRequestDto;
import com.ggums.ggumtle.dto.response.UserInfoResponseDto;
import com.ggums.ggumtle.dto.response.UserListResponseDto;
import com.ggums.ggumtle.dto.response.UserStatsResponseDto;
import com.ggums.ggumtle.dto.response.model.UserListDto;
import com.ggums.ggumtle.entity.*;
import com.ggums.ggumtle.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    private final ImageHandler imageHandler;
    private final AlarmHandler alarmHandler;

    public String updateUser(User user, MultipartFile userImage, UserUpdateRequestDto requestDto){

        // user update
        if(requestDto.getUserNickname() != null){
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

        // image update
        if(userImage != null){
            user.setUserProfileImage(imageHandler.uploadImage(userImage, "userProfile", "user_profile_" + user.getId()));
        }

        userRepository.save(user);

        return "업데이트를 완료하였습니다.";
    }

    @Transactional(readOnly = true)
    public UserInfoResponseDto userInfo(User currentUser, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ExceptionType.NOT_FOUND_USER));
        Bucket bucket = user.getRepBucket();

        Optional<Follow> follow = followRepository.findByFollowerAndFollowee(user, currentUser);
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
                .dayCount(bucket != null ? ChronoUnit.DAYS.between(dateTime, LocalDateTime.now()) : null)
                .color(bucket != null ? bucket.getColor() : null)
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

        Map<Long, Bucket> repBucketsMap = getRepresentativeBucketsMap(userIds);
        Map<Long, Boolean> followingMap = getFollowingMap(currentUser, userIds);

        Page<UserListDto> searchList = users.map(user -> convertToUserSearchListDto(user, repBucketsMap, followingMap));
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

    private UserListDto convertToUserSearchListDto(User user, Map<Long, Bucket> repBucketsMap, Map<Long, Boolean> followingMap) {
        Bucket repBucket = repBucketsMap.get(user.getId());
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
                .bucketAchievement(isAchieved)
                .build();
    }


    public String followUser(User user, UserFollowRequestDto requestDto){
        User followee = userRepository.findById(requestDto.getFollowee()).orElseThrow(() -> new CustomException(ExceptionType.NOT_FOUND_USER));
        if(followee.getId().equals(user.getId())){
            throw new CustomException(ExceptionType.SELF_SUBSCRIPTION_ATTEMPTED);
        }

        Optional<Follow> followOpt = followRepository.findByFollowerAndFollowee(user, followee);

        if(!requestDto.getIsFollowing()){
            followOpt.ifPresent(followRepository::delete);
            return user.getUserNickname() + "님이 " + followee.getUserNickname() + "님을 구독 취소하였습니다.";
        }

        Follow follow = followOpt.orElseGet(() -> Follow.builder()
                .follower(user)
                .followee(followee)
                .build());

       followRepository.save(follow);
       alarmHandler.createUserAlarm(followee, user, AlarmType.follow);

        return user.getUserNickname() + "님이 " + followee.getUserNickname() + "님을 구독하였습니다.";
    }

    // users who userId follows
    public UserListResponseDto userFollowerList(Long userId, Pageable pageable){
        Optional<User> userOpt = userRepository.findById(userId);
        if(userOpt.isEmpty()){
            throw new CustomException(ExceptionType.NOT_FOUND_USER);
        }
        User user = userOpt.get();

        Page<Follow> following = followRepository.findByFollower(user, pageable);
        List<Long> userIds = following.getContent().stream()
                .map(follow -> follow.getFollowee().getId())
                .collect(Collectors.toList());

        Map<Long, Bucket> repBucketsMap = getRepresentativeBucketsMap(userIds);

        Page<UserListDto> searchList = following.map(follow -> convertToUserListDto(follow.getFollowee(), repBucketsMap));
        return UserListResponseDto.builder().searchList(searchList).build();
    }

    // users who userId follows
    public UserListResponseDto userFollowingList(Long userId, Pageable pageable) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ExceptionType.NOT_FOUND_USER));

        Page<Follow> followers = followRepository.findByFollowee(user, pageable);
        List<Long> userIds = followers.getContent().stream()
                .map(Follow::getFollower)
                .map(User::getId)
                .collect(Collectors.toList());

        Map<Long, Bucket> repBucketsMap = getRepresentativeBucketsMap(userIds);

        Page<UserListDto> searchList = followers.map(follower -> convertToUserListDto(follower.getFollower(), repBucketsMap));
        return UserListResponseDto.builder().searchList(searchList).build();
    }

    private UserListDto convertToUserListDto(User user, Map<Long, Bucket> repBucketsMap) {
        Bucket repBucket = repBucketsMap.get(user.getId());
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
                .bucketAchievement(isAchieved)
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

}
