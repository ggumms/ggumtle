package com.ggums.ggumtle.common.handler;

import com.ggums.ggumtle.common.exception.CustomException;
import com.ggums.ggumtle.common.exception.ExceptionType;
import com.ggums.ggumtle.entity.*;
import com.ggums.ggumtle.repository.AlarmRepository;
import com.ggums.ggumtle.repository.BucketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
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

    // Giving connection signals to client
    @Async
    @Scheduled(fixedRate = 30000)
    public void sendHeartbeatToClients() {
        for (Map.Entry<Long, SseEmitter> entry : userEmitters.entrySet()) {
            try {
                entry.getValue().send(SseEmitter.event().comment("heartbeat"));
            } catch (IOException e) {
                userEmitters.remove(entry.getKey());
            } catch (Exception e) {
                throw new CustomException(ExceptionType.SSE_EMITTER_ERROR);
            }
        }
    }

    private boolean shouldSendReminder(Bucket bucket, LocalDate today) {
        LocalDate createdDate = bucket.getCreatedDate().toLocalDate();
        ReminderDate reminder = bucket.getReminderDate();

        return switch (reminder) {
            case oneDay -> createdDate.plusDays(1).isEqual(today);
            case oneWeek -> createdDate.plusWeeks(1).isEqual(today);
            case twoWeeks -> createdDate.plusWeeks(2).isEqual(today);
            case oneMonth -> createdDate.plusMonths(1).isEqual(today);
            case oneYear -> createdDate.plusYears(1).isEqual(today);
            default -> false;
        };
    }


    /**
     * Saves alarm when user follows or joins
     *
     * @param receiver receiver user
     * @param sender sender user
     * @param type join, follow
     */
    public void createUserAlarm(User receiver, User sender, AlarmType type){
        if (!receiver.getAlarm()) {
            return;
        }
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
        if (!receiver.getAlarm()) {
            return;
        }
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
        if (!receiver.getAlarm()) {
            return;
        }
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

    /**
     *  For Reminder
     * @param receiver receiver user
     */
    public void createReminderAlarm(User receiver, Bucket bucket){
        if (!receiver.getAlarm()) {
            return;
        }
        Alarm alarm = Alarm.builder()
                .receiver(receiver)
                .type(AlarmType.remind)
                .dataId(bucket.getId())
                .build();
        alarmRepository.save(alarm);
        sendEventToUser(receiver.getId());
    }

    @Async
    protected void sendEventToUser(Long userId) {
        SseEmitter emitter = userEmitters.get(userId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event().name("serverEvent").data("readAlarm"));
            } catch (IOException e) {
                emitter.completeWithError(e);
                userEmitters.remove(userId);
            } catch (Exception e) {
                throw new CustomException(ExceptionType.SSE_EMITTER_ERROR);
            }
        }
    }
}
