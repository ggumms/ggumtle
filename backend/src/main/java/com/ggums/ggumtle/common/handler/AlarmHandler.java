package com.ggums.ggumtle.common.handler;

import com.ggums.ggumtle.entity.*;
import com.ggums.ggumtle.repository.AlarmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author 404-not-foundl
 * @since 2024-01-30
 */

@Component
@RequiredArgsConstructor
public class AlarmHandler {

    public final Map<Long, SseEmitter> userEmitters = new ConcurrentHashMap<>();
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
        sendEventToUser(receiver.getId());
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
        sendEventToUser(receiver.getId());
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
        sendEventToUser(receiver.getId());
    }

    private void sendEventToUser(Long userId) {
        SseEmitter emitter = userEmitters.get(userId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event().name("serverEvent").data("readAlarm"));
            } catch (IOException e) {
                emitter.completeWithError(e);
            }
        }
    }
}
