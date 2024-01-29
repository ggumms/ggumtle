package com.ggums.ggumtle.common.handler;

import com.ggums.ggumtle.entity.*;
import com.ggums.ggumtle.repository.AlarmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class AlarmHandler {

    private final AlarmRepository alarmRepository;

    /**
     * Saves alarm when user follows or joins
     *
     * @param receiver receiver user
     * @param sender sender user
     * @param type join, follow
     */
    public void createUserAlarm(User receiver, User sender, AlarmType type){
        Alarm alarm =  Alarm.builder()
                .receiver(receiver)
                .sender(sender)
                .type(type)
                .dataId(sender.getId())
                .build();
        alarmRepository.save(alarm);
    }

    /**
     * Saves alarm for bucket notice
     *
     * @param receiver receiver user
     * @param sender sender user
     * @param type likeCommentBucket, remind, followBucket, followBucketAchieve, commentBucket, reviewReaction
     * @param bucket alarmed bucket
     */
    public void createBucketAlarm(User receiver, User sender, AlarmType type, Bucket bucket){
        Alarm alarm = Alarm.builder()
                .receiver(receiver)
                .sender(sender)
                .context(bucket.getTitle())
                .type(type)
                .dataId(bucket.getId())
                .build();
        alarmRepository.save(alarm);
    }

    /**
     * Saves alarm for review notice
     *
     * @param receiver receiver user
     * @param sender sender user
     * @param type likeCommentReview, followReview, followCommentReview, followCommentReview, reviewReaction
     * @param review alarmed review
     */
    public void createReviewAlarm(User receiver, User sender, AlarmType type, Review review){
        Alarm alarm = Alarm.builder()
                .receiver(receiver)
                .sender(sender)
                .context(review.getTitle())
                .type(type)
                .dataId(review.getId())
                .build();
        alarmRepository.save(alarm);
    }
}
