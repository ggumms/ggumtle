package com.ggums.ggumtle.service;

import com.ggums.ggumtle.common.exception.CustomException;
import com.ggums.ggumtle.common.exception.ExceptionType;
import com.ggums.ggumtle.dto.request.ReviewRequestDto;
import com.ggums.ggumtle.dto.response.ReviewResponseDto;
import com.ggums.ggumtle.entity.Review;
import com.ggums.ggumtle.entity.ReviewReaction;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Transactional
    public Long postReview(User user, ReviewRequestDto requestDto) {
        Review review = Review.builder()
                .title(requestDto.getTitle())
                .context(requestDto.getContext())
                .build();
        
        Review savedReview = reviewRepository.save(review);
        return savedReview.getId();
    }

    @Transactional(readOnly = true)
    public ReviewResponseDto getReview(User user, Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new CustomException(ExceptionType.REVIEW_NOT_FOUND));

//        Bucket bucket = review.getBucket();
//        User writer = bucket.getUser();

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
}
