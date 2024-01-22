package com.ggums.ggumtle.service;

import com.ggums.ggumtle.common.exception.CustomException;
import com.ggums.ggumtle.common.exception.ExceptionType;
import com.ggums.ggumtle.dto.request.ReviewRequestDto;
import com.ggums.ggumtle.dto.response.ReviewResponseDto;
import com.ggums.ggumtle.entity.Review;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    private final String basicDir = Paths.get(System.getProperty("user.dir")).getParent().toString();
    private final String uploadDir = Paths.get(basicDir, "image", "reviewImage").toString();

    @Transactional
    public Long postReview(User user, ReviewRequestDto requestDto) {
        Review review = Review.builder()
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
        if (dir.exists() == false) {
            dir.mkdirs();
        }

        try {
            // 파일 저장 (write to disk)
            File uploadFile = new File(fileFullPath);
            image.transferTo(uploadFile);
            return "image/reviewImage/" + saveFilename;
        } catch (IOException e) {
            // transferTo()에서 IOE 발생할 수 있음
            throw new RuntimeException(e);
        }
    }

    @Transactional(readOnly = true)
    public ReviewResponseDto getReview(User user, Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new CustomException(ExceptionType.REVIEW_NOT_FOUND));

//        Bucket bucket = review.getBucket();
//        User writer = bucket.getUser();

         // 버킷이 비공개이면서 본인의 후기가 아닌 경우 리뷰 열람 불가능
//        if (bucket.getIsprivate() && !writer.getId().equals(user.getId())) {
//            throw new CustomException(ExceptionType.REVIEW_NOT_VALID);
//        }

//        List<String> categories = new ArrayList<>();
//        for (Interest interest : bucket.getInterests()) {
//            categories.add(interest.getName());
//        }

//        Map<String, Integer> reactionCounts = new HashMap<>();
//        String myReaction = null;
//        for (ReviewReaction reaction : review.getReviewReactions()) {
//            String reactionType = reaction.getReaction();
//            reactionCounts.put(reactionType, reactionCounts.getOrDefault(reactionType, 0) + 1);
//
//            if (reaction.getUser().equals(user)) {
//                myReaction = reaction.getReaction();
//            }
//        }

        return ReviewResponseDto.builder()
//                .writerId(writer.getId())
//                .writerProfileImage(writer.getUserProfileImage())
//                .writerNickname(writer.getUserNickname())
//                .representativeBucketTitle()
//                .isAchieved()
//                .daysSinceDream()
//                .bucketTitle(bucket.getTitle())
                .reviewTitle(review.getTitle())
                .reviewContext(review.getContext())
                .reviewCreatedDate(review.getCreatedDate())
                .reviewUpdatedDate(review.getUpdatedDate())
//                .categories(categories)
//                .reactionCounts(reactionCounts)
//                .myReaction(myReaction)
                .build();
    }

    @Transactional
    public Long putReview(User user, Long reviewId, ReviewRequestDto requestDto) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new CustomException(ExceptionType.REVIEW_NOT_FOUND));

        // 본인의 후기가 아니면 수정 불가능
//        if (!review.getBucket().getUser().getId().equals(user.getId())) {
//            throw new CustomException(ExceptionType.NOT_VALID_USER);
//        }

        review.setTitle(requestDto.getTitle());
        review.setContext(requestDto.getContext());

        return review.getId();
    }

    public String deleteReview(User user, Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new CustomException(ExceptionType.REVIEW_NOT_FOUND));

        // 본인의 후기가 아니면 삭제 불가능
//        if (!review.getBucket().getUser().getId().equals(user.getId())) {
//            throw new CustomException(ExceptionType.NOT_VALID_USER);
//        }

        reviewRepository.delete(review);

        return "삭제를 완료하였습니다.";
    }
}
