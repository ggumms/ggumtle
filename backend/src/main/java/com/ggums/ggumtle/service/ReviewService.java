package com.ggums.ggumtle.service;

import com.ggums.ggumtle.common.exception.CustomException;
import com.ggums.ggumtle.common.exception.ExceptionType;
import com.ggums.ggumtle.dto.request.PutReviewRequestDto;
import com.ggums.ggumtle.dto.request.ReviewReactionRequestDto;
import com.ggums.ggumtle.dto.request.PostReviewRequestDto;
import com.ggums.ggumtle.dto.response.ReviewReactionResponseDto;
import com.ggums.ggumtle.dto.response.ReviewResponseDto;
import com.ggums.ggumtle.entity.*;
import com.ggums.ggumtle.repository.BucketRepository;
import com.ggums.ggumtle.repository.ReviewReactionRepository;
import com.ggums.ggumtle.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final BucketRepository bucketRepository;
    private final ReviewReactionRepository reviewReactionRepository;

    @Value("${spring.web.baseUrl}")
    private String baseUrl;

    private final String basicDir = Paths.get(System.getProperty("user.dir")).getParent().toString();
    private final String uploadDir = Paths.get(basicDir, "image", "reviewImage").toString();

    @Transactional
    public Long postReview(User user, PostReviewRequestDto requestDto) {

        Bucket bucket = bucketRepository.findById(requestDto.getBucketId())
                .orElseThrow(() -> new CustomException(ExceptionType.BUCKET_NOT_FOUND));

        // 버킷의 주인만 후기를 작성할 수 있다.
        if (!bucket.getUser().getId().equals(user.getId())) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        Review review = Review.builder()
                .bucket(bucket)
                .title(requestDto.getTitle())
                .context(requestDto.getContext())
                .build();

        Review savedReview = reviewRepository.save(review);
        return savedReview.getId();
    }

    /**
     * 에디터 이미지 업로드
     * 에디터에서 이미지를 업로드했을 때 blob으로 넘어오는 File 객체를 이용해서 디스크에 파일을 저장
     * @param image 파일 객체
     * @return 업로드된 파일 경로
     */
    public String postImage(MultipartFile image) {
        if (image.isEmpty()) {
            return "";
        }

        String orgFilename = image.getOriginalFilename();   // 원본 파일명
        String uuid = UUID.randomUUID().toString().replaceAll("-", ""); // 32자리 랜덤 문자열
        String extension = orgFilename.substring(orgFilename.lastIndexOf(".") + 1); // 확장자
        String saveFilename = uuid + "." + extension;   // 디스크에 저장할 파일명
        String fileFullPath = Paths.get(uploadDir, saveFilename).toString();    // 디스크에 저장할 파일의 전체 경로

        // uploadDir에 해당되는 디렉터리가 없으면, uploadDir에 포함되는 전체 디렉터리 생성
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        try {
            // 파일 저장 (write to disk)
            File uploadFile = new File(fileFullPath);
            image.transferTo(uploadFile);
            return baseUrl + "/image/reviewImage/" + saveFilename;
        } catch (IOException e) {
            // transferTo()에서 IOE 발생할 수 있음
            throw new RuntimeException(e);
        }
    }

    @Transactional(readOnly = true)
    public ReviewResponseDto getReview(User user, Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new CustomException(ExceptionType.REVIEW_NOT_FOUND));

        Bucket bucket = review.getBucket();
        User writer = bucket.getUser();

        // 후기 조회 불가능한 경우 : 버킷 비공개 && 본인의 버킷(후기)이 아님
        if (bucket.getIsPrivate() && !writer.getId().equals(user.getId())) {
            throw new CustomException(ExceptionType.REVIEW_NOT_VALID);
        }

        LocalDate createdDate = bucket.getCreatedDate().toLocalDate();
        LocalDate achievementDate = bucket.getAchievementDate();
        long daysSinceDream = ChronoUnit.DAYS.between(createdDate, achievementDate);

        List<String> categories = new ArrayList<>();
        for (Interest interest : bucket.getInterests()) {
            categories.add(interest.getName());
        }

        return ReviewResponseDto.builder()
                .bucketId(bucket.getId())
                .bucketTitle(bucket.getTitle())
                .daysSinceDream(daysSinceDream)
                .writerId(writer.getId())
                .writerProfileImage(writer.getUserProfileImage())
                .writerNickname(writer.getUserNickname())
                .reviewTitle(review.getTitle())
                .reviewContext(review.getContext())
                .reviewCreatedDate(review.getCreatedDate())
                .reviewUpdatedDate(review.getUpdatedDate())
                .categories(categories)
                .build();
    }

    @Transactional
    public Long putReview(User user, Long reviewId, PutReviewRequestDto requestDto) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new CustomException(ExceptionType.REVIEW_NOT_FOUND));

        // 후기의 작성자만 후기를 수정할 수 있다.
        if (!review.getBucket().getUser().getId().equals(user.getId())) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        review.setTitle(requestDto.getTitle());
        review.setContext(requestDto.getContext());

        reviewRepository.save(review);

        return review.getId();
    }

    @Transactional
    public String deleteReview(User user, Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new CustomException(ExceptionType.REVIEW_NOT_FOUND));

        // 후기의 작성자만 후기를 삭제할 수 있다.
        if (!review.getBucket().getUser().getId().equals(user.getId())) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        reviewRepository.delete(review);

        return "삭제를 완료하였습니다.";
    }

    @Transactional
    public String postReviewReaction(User user, Long reviewId, ReviewReactionRequestDto requestDto) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new CustomException(ExceptionType.REVIEW_NOT_FOUND));

        String reaction = requestDto.getReaction();

        List<ReviewReaction> myReviewReactions = review.getReviewReactions().stream()
                .filter(reviewReaction -> reviewReaction.getUser().getId().equals(user.getId()))
                .collect(Collectors.toList());

        // [POST] 해당 후기에 남긴 리액션이 없는 경우
        if (myReviewReactions.isEmpty()) {
            ReviewReaction newReviewReaction = ReviewReaction.builder()
                    .user(user)
                    .review(review)
                    .reaction(reaction)
                    .build();
            reviewReactionRepository.save(newReviewReaction);
            review.getReviewReactions().add(newReviewReaction);
            return reaction;
        }
        // 해당 후기에 이미 남긴 리액션이 있는 경우
        else {
            ReviewReaction myReviewReaction = myReviewReactions.get(0);

            // [DELETE] 해당 리액션을 취소하려는 경우
            if (reaction.equals(myReviewReaction.getReaction())) {
                reviewReactionRepository.delete(myReviewReaction);
                review.getReviewReactions().remove(myReviewReaction);
                return null;
            }
            // [PUT] 해당 리액션을 수정하려는 경우
            else {
                myReviewReaction.setReaction(reaction);
                reviewReactionRepository.save(myReviewReaction);
                return reaction;
            }
        }
    }

    @Transactional(readOnly = true)
    public ReviewReactionResponseDto getReviewReaction(User user, Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new CustomException(ExceptionType.REVIEW_NOT_FOUND));

        // 후기가 비공개인 경우 작성자만 열람할 수 있다.
        if (review.getBucket().getIsPrivate() && !review.getBucket().getUser().getId().equals(user.getId())) {
            throw new CustomException(ExceptionType.REVIEW_NOT_VALID);
        }

        List<ReviewReaction> reactionList = review.getReviewReactions();
        Map<String, Integer> reactionCounts = new HashMap<>();
        String myReaction = null;
        for (ReviewReaction reaction : reactionList) {
            String reactionType = reaction.getReaction();
            reactionCounts.put(reactionType, reactionCounts.getOrDefault(reactionType, 0) + 1);

            if (reaction.getUser().getId().equals(user.getId())) {
                myReaction = reactionType;
            }
        }

        return ReviewReactionResponseDto.builder()
                .reactionCounts(reactionCounts)
                .myReaction(myReaction)
                .build();
    }
}