package com.ggums.ggumtle.service;

import com.ggums.ggumtle.common.constant.Score;
import com.ggums.ggumtle.common.exception.CustomException;
import com.ggums.ggumtle.common.exception.ExceptionType;
import com.ggums.ggumtle.common.handler.ImageHandler;
import com.ggums.ggumtle.dto.request.PostBucketReactionRequestDto;
import com.ggums.ggumtle.dto.request.PostBucketRequestDto;
import com.ggums.ggumtle.dto.request.UpdateBucketRequestDto;
import com.ggums.ggumtle.dto.response.BucketSearchResponseDto;
import com.ggums.ggumtle.dto.response.GetBucketReactionResponseDto;
import com.ggums.ggumtle.dto.response.GetBucketResponseDto;
import com.ggums.ggumtle.dto.response.model.BucketSearchListDto;
import com.ggums.ggumtle.entity.*;
import com.ggums.ggumtle.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BucketService {

    private final ImageHandler imageHandler;
    private final BucketRepository bucketRepository;
    private final InterestRepository interestRepository;
    private final BucketReactionRepository bucketReactionRepository;
    private final CommentBucketRepository commentBucketRepository;
    private final ReviewRepository reviewRepository;
    private final FollowRepository followRepository;

    public Long postBucket(User user, PostBucketRequestDto requestDto){
        Set<Interest> interests = new HashSet<>();

        if (requestDto.getCategory() != null) {
            for (String interestName : requestDto.getCategory()) {
                Interest interest = interestRepository.findByName(interestName)
                        .orElseGet(() -> {
                            Interest newInterest = new Interest();
                            newInterest.setName(interestName);
                            return interestRepository.save(newInterest);
                        });
                interests.add(interest);
            }
        }

        Bucket bucket = Bucket.builder()
                .user(user)
                .title(requestDto.getTitle())
                .timeCapsule(requestDto.getTimeCapsule())
                .latitude(requestDto.getLatitude())
                .longitude(requestDto.getLongitude())
                .color(requestDto.getColor())
                .address(requestDto.getAddress())
                .bucketInterest(interests)
                .isPrivate(requestDto.getIsPrivate())
                .build();

        Bucket savedBucket = bucketRepository.save(bucket);
        return savedBucket.getId();
    }

    public GetBucketResponseDto getBucket(User user, Long bucketId){
        Bucket bucket = bucketRepository.findById(bucketId)
                .orElseThrow(() -> new CustomException(ExceptionType.BUCKET_NOT_FOUND));

        if(bucket.getIsPrivate() && !bucket.getUser().getId().equals(user.getId())){
            throw new CustomException(ExceptionType.BUCKET_NOT_VALID);
        }

        Long reviewId = null;
        Optional<Review> review = reviewRepository.findByBucket(bucket);
        if (review.isPresent()) {
            reviewId = review.get().getId();
        }

        String timeCapsule = null;
        if (bucket.getAchievementDate() != null) {
            timeCapsule = bucket.getTimeCapsule();
        }

        // user가 버킷 작성자(writer)를 팔로우하고 있는 경우 user -> writer 친밀도 증가
        User writer = bucket.getUser();
        Optional<Follow> followOpt = followRepository.findByFollowerAndFollowee(user, writer);
        if (followOpt.isPresent()) {
            Follow follow = followOpt.get();
            Long currentScore = follow.getScore();
            follow.setScore(currentScore + Score.READ);
        }

        return GetBucketResponseDto.builder()
                .writerId(bucket.getUser().getId())
                .reviewId(reviewId)
                .title(bucket.getTitle())
                .timeCapsule(timeCapsule)
                .bucketPicture(bucket.getBucketPicture())
                .color(bucket.getColor())
                .latitude(bucket.getLatitude())
                .longitude(bucket.getLongitude())
                .address(bucket.getAddress())
                .dayCount(ChronoUnit.DAYS.between(bucket.getCreatedDate(), LocalDateTime.now()))
                .writeDate(bucket.getCreatedDate())
                .achievementDate(bucket.getAchievementDate())
                .category(bucket.getBucketInterest().stream()
                        .map(Interest::getName)
                        .collect(Collectors.toCollection(ArrayList::new)))
                .isPrivate(bucket.getIsPrivate())
                .build();
    }

    public Long updateBucket(User user, UpdateBucketRequestDto requestDto){
        Bucket bucket = bucketRepository.findById(requestDto.getBucketId())
                .orElseThrow(() -> new CustomException(ExceptionType.BUCKET_NOT_FOUND));

        if (!user.getId().equals(bucket.getUser().getId())) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        if (requestDto.getTitle() != null) bucket.setTitle(requestDto.getTitle());
        if (requestDto.getLatitude() != null) bucket.setLatitude(requestDto.getLatitude());
        if (requestDto.getLongitude() != null) bucket.setLongitude(requestDto.getLongitude());
        if (requestDto.getColor() != null) bucket.setColor(requestDto.getColor());
        if (requestDto.getAddress() != null) bucket.setAddress(requestDto.getAddress());

        if (requestDto.getCategory() != null) {
            Set<Interest> updatedInterests = requestDto.getCategory().stream()
                    .map(interestName -> interestRepository.findByName(interestName)
                            .orElseGet(() -> {
                                Interest newInterest = new Interest();
                                newInterest.setName(interestName);
                                return interestRepository.save(newInterest);
                            }))
                    .collect(Collectors.toSet());
            bucket.setBucketInterest(updatedInterests);
        }

        if (requestDto.getIsPrivate() != null) {
            bucket.setIsPrivate(requestDto.getIsPrivate());
            // 비공개로 전환했는데 그게 대표버킷이었을 경우 사용자의 대표버킷 null로 설정
            if (!requestDto.getIsPrivate()
                    && user.getRepBucket() != null
                    && bucket.getId().equals(user.getRepBucket().getId())) {
                user.setRepBucket(null);
            }
        }

        bucketRepository.save(bucket);

        return bucket.getId();
    }

    public String deleteBucket(User user, Long bucketId){
        Bucket bucket = bucketRepository.findById(bucketId)
                .orElseThrow(() -> new CustomException(ExceptionType.BUCKET_NOT_FOUND));

        if (!user.getId().equals(bucket.getUser().getId())) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        bucketRepository.delete(bucket);

        return "삭제를 완료하였습니다.";
    }

    public String achieveBucket(User user, Long bucketId){
        Bucket bucket = bucketRepository.findById(bucketId)
                .orElseThrow(() -> new CustomException(ExceptionType.BUCKET_NOT_FOUND));

        if (!user.getId().equals(bucket.getUser().getId())) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        if (bucket.getAchievementDate() != null) {
            throw new CustomException(ExceptionType.BUCKET_ALREADY_ACHIEVED);
        }

        bucket.setAchievementDate(LocalDate.now());
        bucketRepository.save(bucket);

        return "버킷 달성일이 등록되었습니다.";
    }

    @Transactional(readOnly = true)
    public BucketSearchResponseDto searchBuckets(String word, Pageable pageable) {
        Page<Bucket> buckets = bucketRepository.findByTitleContainingAndIsPrivateIsFalse(word, pageable);
        Page<BucketSearchListDto> searchList = buckets.map(this::convertToBucketSearchListDto);
        return BucketSearchResponseDto.builder().searchList(searchList).build();
    }

    private BucketSearchListDto convertToBucketSearchListDto(Bucket bucket) {
        LocalDateTime dateTime = bucket.getCreatedDate();
        boolean isAchieved = false;
        if(bucket.getAchievementDate() != null){
            dateTime = bucket.getAchievementDate().atStartOfDay();
            isAchieved = true;
        }

        int commentCount = commentBucketRepository.countByBucket(bucket);

        return BucketSearchListDto.builder()
                .bucketId(bucket.getId())
                .title(bucket.getTitle())
                .dayCount(ChronoUnit.DAYS.between(dateTime, LocalDateTime.now()))
                .category(bucket.getBucketInterest().stream().map(Interest::getName).collect(Collectors.toList()))
                .reactionCount(bucket.getBucketReactions().size())
                .commentCount(commentCount)
                .color(bucket.getColor())
                .isAchieved(isAchieved)
                .build();
    }

    public String bucketImage(User user, Long bucketId, MultipartFile bucketImage) {
        // check bucket and user
        Bucket bucket = bucketRepository.findById(bucketId)
                .orElseThrow(() -> new CustomException(ExceptionType.BUCKET_NOT_FOUND));
        if (!user.getId().equals(bucket.getUser().getId())) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        bucket.setBucketPicture(imageHandler.uploadImage(bucketImage, "bucketImage", "bucket_image_" + bucket.getId()));

        return bucket.getBucketPicture();
    }

    @Transactional(readOnly = true)
    public GetBucketReactionResponseDto getBucketReaction(User user, Long bucketId){
        Bucket bucket = bucketRepository.findById(bucketId)
                .orElseThrow(() -> new CustomException(ExceptionType.BUCKET_NOT_FOUND));

        if(bucket.getIsPrivate() && !bucket.getUser().getId().equals(user.getId())){
            throw new CustomException(ExceptionType.BUCKET_NOT_VALID);
        }

        String userReaction = null;
        Map<String, Integer> reactionCounts = new HashMap<>();
        List<BucketReaction> list = bucket.getBucketReactions();
        if(!list.isEmpty()){
            for (BucketReaction reaction : list) {
                if(reaction.getUser().getId().equals(user.getId())){
                    userReaction = reaction.getReaction();
                }
                String reactionType = reaction.getReaction();
                reactionCounts.put(reactionType, reactionCounts.getOrDefault(reactionType, 0) + 1);
            }
        }

        return GetBucketReactionResponseDto.builder()
                .userReaction(userReaction)
                .reactionCounts(reactionCounts)
                .build();
    }

    public String postBucketReaction(User user, PostBucketReactionRequestDto requestDto) {
        Bucket bucket = bucketRepository.findById(requestDto.getBucketId())
                .orElseThrow(() -> new CustomException(ExceptionType.BUCKET_NOT_FOUND));

        Optional<BucketReaction> existingReaction = bucketReactionRepository
                .findByBucketAndUser(bucket, user);

        Optional<Follow> followOpt = followRepository.findByFollowerAndFollowee(user, bucket.getUser());

        // 이미 남긴 리액션이 있는 경우
        if (existingReaction.isPresent()) {
            // if reaction is same, pass
            // 이미 있는 리액션과 요청한 리액션이 같은 경우
            if (existingReaction.get().getReaction().equals(requestDto.getUserReaction())) {
                return requestDto.getUserReaction();
            }
            // [PUT, DELETE] 이미 있는 리액션과 다른 종류의 리액션 또는 null을 요청한 경우
            // 다른 리액션으로 바뀌는 경우에도 일단 삭제한 후 다시 리액션을 저장한다.
            else {
                bucketReactionRepository.delete(existingReaction.get());

                // user가 버킷 작성자(writer)를 팔로우하고 있는 경우 user -> writer 친밀도 감소
                if (followOpt.isPresent()) {
                    Follow follow = followOpt.get();
                    Long currentScore = follow.getScore();
                    follow.setScore(currentScore - Score.REACTION);
                }

            }
        }

        // [POST, PUT] 무언가 리액션을 남기려는 경우
        if(!requestDto.getUserReaction().isEmpty()){
            BucketReaction newReaction = BucketReaction.builder()
                    .bucket(bucket)
                    .user(user)
                    .reaction(requestDto.getUserReaction())
                    .build();
            bucketReactionRepository.save(newReaction);

            // user가 버킷 작성자(writer)를 팔로우하고 있는 경우 user -> writer 친밀도 증가
            if (followOpt.isPresent()) {
                Follow follow = followOpt.get();
                Long currentScore = follow.getScore();
                follow.setScore(currentScore + Score.REACTION);
            }
        }

        if (followOpt.isPresent()) {
            Follow follow = followOpt.get();
            if (follow.getScore() < 0) {
                follow.setScore(0L);
            }
        }

        return requestDto.getUserReaction();
    }
}
