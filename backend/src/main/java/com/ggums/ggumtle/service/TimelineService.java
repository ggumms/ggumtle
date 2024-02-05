package com.ggums.ggumtle.service;

import com.ggums.ggumtle.dto.response.model.TimelineDto;
import com.ggums.ggumtle.entity.*;
import com.ggums.ggumtle.repository.CommentBucketRepository;
import com.ggums.ggumtle.repository.CommentReviewRepository;
import com.ggums.ggumtle.repository.TimelineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;


@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class TimelineService {

    private final TimelineRepository timelineRepository;
    private final CommentBucketRepository commentBucketRepository;
    private final CommentReviewRepository commentReviewRepository;

    public Page<TimelineDto> get(User user, Long userId, Boolean doing, Boolean done, Boolean review, Pageable pageable) {

        Page<Timeline> timelines = timelineRepository.get(user.getId(), userId, doing, done, review, pageable);
        return timelines.map(this::convertToTimelineDto);
    }

    // TODO : 리액션 수, 댓글 수 가지고 올때  쿼리 참고
    private TimelineDto convertToTimelineDto(Timeline timeline) {
        Bucket bucket = timeline.getBucket();
        Review review = timeline.getReview();
        
        if (timeline.getType().equals(TimelineType.BUCKET)) {
            List<String> images = new ArrayList<>();
            List<String> categories = new ArrayList<>();
            
            images.add(bucket.getBucketPicture());
            for (Interest interest : bucket.getBucketInterest()) {
                categories.add(interest.getName());
            }
            
            return TimelineDto.builder()
                    .id(bucket.getId())
                    .type(TimelineType.BUCKET)
                    .isAchieved(bucket.getAchievementDate() != null)
                    .title(bucket.getTitle())
                    .day(bucket.getAchievementDate() == null ?
                            ChronoUnit.DAYS.between(bucket.getCreatedDate(), LocalDateTime.now()) :
                            ChronoUnit.DAYS.between(bucket.getCreatedDate(), bucket.getAchievementDate().atStartOfDay()))
                    .color(bucket.getColor())
                    .images(images)
                    .categories(categories)
                    .reactionCount(bucket.getBucketReactions().size())
                    .commentCount(commentBucketRepository.countByBucket(bucket))
                    .createdDate(timeline.getCreatedDate().toLocalDate())
                    .build();
        } else {
            List<String> images = new ArrayList<>();
            List<String> categories = new ArrayList<>();
            bucket = review.getBucket();

            for (Interest interest : bucket.getBucketInterest()) {
                categories.add(interest.getName());
            }

            return TimelineDto.builder()
                    .id(review.getId())
                    .type(TimelineType.REVIEW)
                    .isAchieved(bucket.getAchievementDate() != null)
                    .title(review.getTitle())
                    .context(review.getContext())
                    .day(ChronoUnit.DAYS.between(bucket.getCreatedDate(), bucket.getAchievementDate().atStartOfDay()))
                    .color(bucket.getColor())
                    .images(images)
                    .categories(categories)
                    .reactionCount(review.getReviewReactions().size())
                    .commentCount(commentReviewRepository.countByReview(review))
                    .createdDate(timeline.getCreatedDate().toLocalDate())
                    .build();
        }
    }
}
