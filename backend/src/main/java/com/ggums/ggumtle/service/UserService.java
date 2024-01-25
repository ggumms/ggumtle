package com.ggums.ggumtle.service;

import com.ggums.ggumtle.common.handler.ImageHandler;
import com.ggums.ggumtle.common.handler.TransactionHandler;
import com.ggums.ggumtle.common.redis.RedisLockRepository;
import com.ggums.ggumtle.common.exception.CustomException;
import com.ggums.ggumtle.common.exception.ExceptionType;
import com.ggums.ggumtle.dto.request.UserFollowRequestDto;
import com.ggums.ggumtle.dto.request.UserUpdateRequestDto;
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

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final RepresentativeBucketRepository representativeBucketRepository;
    private final RedisLockRepository redisLockRepository;
    private final TransactionHandler transactionHandler;
    private final InterestRepository interestRepository;
    private final BucketRepository bucketRepository;
    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    private final ImageHandler imageHandler;

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

    public String representativeBucket(User user, Long bucketId){
        if(bucketId == null){
            representativeBucketRepository.findByUser(user)
                    .ifPresent(representativeBucketRepository::delete);
            return "대표 버킷이 삭제되었습니다.";
        }

        Bucket bucket = bucketRepository.findById(bucketId)
                .orElseThrow(() -> new CustomException(ExceptionType.BUCKET_NOT_FOUND));

        if(!bucket.getUser().getId().equals(user.getId())){
            throw new CustomException(ExceptionType.NOT_VALID_ROLE);
        }

        Optional<RepresentativeBucket> representativeBucketOp = representativeBucketRepository.findByUser(user);
        RepresentativeBucket representativeBucket;
        if(representativeBucketOp.isPresent()){
            representativeBucket = representativeBucketOp.get();
            representativeBucket.setBucket(bucket);
        }else{
            representativeBucket = RepresentativeBucket.builder()
                    .user(user)
                    .bucket(bucket)
                    .build();
        }
        representativeBucketRepository.save(representativeBucket);

        return "대표 버킷을 반영하였습니다. 버킷 : " + bucketId;
    }

    @Transactional(readOnly = true)
    public UserListResponseDto searchUsers(String word, Pageable pageable, User currentUser) {
        Page<User> users = userRepository.findByUserNicknameContainingAndDeletedDateIsNull(word, pageable);
        List<Long> userIds = users.getContent().stream()
                .filter(u -> !u.getId().equals(currentUser.getId()))
                .map(User::getId) // only one user needs to be filtered
                .collect(Collectors.toList());

        Map<Long, RepresentativeBucket> repBucketsMap = getRepresentativeBucketsMap(userIds);
        Map<Long, Boolean> followingMap = getFollowingMap(currentUser, userIds);

        Page<UserListDto> searchList = users.map(user -> convertToUserSearchListDto(user, repBucketsMap, followingMap));
        return UserListResponseDto.builder().searchList(searchList).build();
    }

    private Map<Long, RepresentativeBucket> getRepresentativeBucketsMap(List<Long> userIds) {
        List<RepresentativeBucket> repBuckets = representativeBucketRepository.findByUserIdIn(userIds);
        return repBuckets.stream().collect(Collectors.toConcurrentMap(rb -> rb.getUser().getId(), Function.identity()));
    }

    private Map<Long, Boolean> getFollowingMap(User currentUser, List<Long> userIds) {
        List<Follow> follows = followRepository.findByFollowerIdAndFolloweeIdIn(currentUser.getId(), userIds);
        Set<Long> followingIds = follows.stream().map(follow -> follow.getFollowee().getId()).collect(Collectors.toSet());
        return userIds.stream().collect(Collectors.toConcurrentMap(Function.identity(), followingIds::contains));
    }

    private UserListDto convertToUserSearchListDto(User user, Map<Long, RepresentativeBucket> repBucketsMap, Map<Long, Boolean> followingMap) {
        RepresentativeBucket repBucket = repBucketsMap.get(user.getId());
        String bucketTitle = null;
        String bucketColor = null;
        boolean isAchieved = false;
        Long bucketId = null;

        if (repBucket != null && repBucket.getBucket() != null) {
            bucketTitle = repBucket.getBucket().getTitle();
            bucketColor = repBucket.getBucket().getColor();
            isAchieved = repBucket.getBucket().getAchievementDate() != null;
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

        Map<Long, RepresentativeBucket> repBucketsMap = getRepresentativeBucketsMap(userIds);

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

        Map<Long, RepresentativeBucket> repBucketsMap = getRepresentativeBucketsMap(userIds);

        Page<UserListDto> searchList = followers.map(follower -> convertToUserListDto(follower.getFollower(), repBucketsMap));
        return UserListResponseDto.builder().searchList(searchList).build();
    }

    private UserListDto convertToUserListDto(User user, Map<Long, RepresentativeBucket> repBucketsMap) {
        RepresentativeBucket repBucket = repBucketsMap.get(user.getId());
        String bucketTitle = null;
        String bucketColor = null;
        boolean isAchieved = false;
        Long bucketId = null;

        if (repBucket != null && repBucket.getBucket() != null) {
            bucketTitle = repBucket.getBucket().getTitle();
            bucketColor = repBucket.getBucket().getColor();
            isAchieved = repBucket.getBucket().getAchievementDate() != null;
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
