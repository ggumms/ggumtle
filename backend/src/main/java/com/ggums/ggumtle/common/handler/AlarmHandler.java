package com.ggums.ggumtle.common.handler;

import com.ggums.ggumtle.common.exception.CustomException;
import com.ggums.ggumtle.common.exception.ExceptionType;
import com.ggums.ggumtle.dto.response.model.AlarmDto;
import com.ggums.ggumtle.entity.*;
import com.ggums.ggumtle.repository.AlarmRepository;
import com.ggums.ggumtle.repository.BucketRepository;
import com.ggums.ggumtle.repository.UserRepository;
import com.ggums.ggumtle.service.AlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author 404-not-foundl
 * @since 2024-01-30
 */

@Component
@RequiredArgsConstructor
public class AlarmHandler {

    public final Map<Long, SseEmitter> userEmitters = new ConcurrentHashMap<>();
    public final List<SseEmitter> emitters = new ArrayList<>();
    private final AlarmRepository alarmRepository;
    private final BucketRepository bucketRepository;
    private final AlarmService alarmService;

    // Giving connection signals to client
    @Async
    @Scheduled(fixedRate = 30000)
    public void sendHeartbeatToClients() {
        for(SseEmitter emitter : emitters){
            try {
                emitter.send(SseEmitter.event().comment("heartbeat"));
            } catch (IOException e) {
                emitters.remove(emitter);
            } catch (Exception e) {
                throw new CustomException(ExceptionType.SSE_EMITTER_ERROR);
            }
        }

//        for (Map.Entry<Long, SseEmitter> entry : userEmitters.entrySet()) {
//            try {
//                entry.getValue().send(SseEmitter.event().comment("heartbeat"));
//            } catch (IOException e) {
//                userEmitters.remove(entry.getKey());
//            } catch (Exception e) {
//                throw new CustomException(ExceptionType.SSE_EMITTER_ERROR);
//            }
//        }
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
        Alarm alarm = Alarm.builder()
                .receiver(receiver)
                .sender(sender)
                .type(type)
                .dataId(sender != null ? sender.getId() : null)
                .build();
        alarmRepository.save(alarm);
        sendEventToUser(receiver.getId(), alarm);
    }

    /**
     * Saves alarm for bucket notice
     *
     * @param receiver receiver user
     * @param sender sender user
     * @param type likeCommentBucket, followBucket, followBucketAchieve, bucketReaction
     * @param bucket alarmed bucket
     */
    public void createBucketAlarm(User receiver, User sender, AlarmType type, Bucket bucket){
        if (!receiver.getAlarm() || receiver.getId().equals(sender.getId())) {
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
        sendEventToUser(receiver.getId(), alarm);
    }

    /**
     * Saves alarm for review notice
     *
     * @param receiver receiver user
     * @param sender sender user
     * @param type likeCommentReview, followReview, reviewReaction
     * @param review alarmed review
     */
    public void createReviewAlarm(User receiver, User sender, AlarmType type, Review review){
        if (!receiver.getAlarm() || receiver.getId().equals(sender.getId())) {
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
        sendEventToUser(receiver.getId(), alarm);
    }

    /**
     * Giving comment alarm
     * Caution that there could be only bucket orElse review
     *
     * @param receiver receiver
     * @param sender sender
     * @param type commentReview, commentBucket
     * @param comment comment
     * @param bucket bucket
     * @param review review
     */
    public void createCommentAlarm(User receiver, User sender, AlarmType type, String comment, Bucket bucket, Review review){
        if (!receiver.getAlarm() || receiver.getId().equals(sender.getId())) {
            return;
        }

        Alarm alarm = Alarm.builder()
                .receiver(receiver)
                .sender(sender)
                .context(comment)
                .type(type)
                .build();

        if (review == null) {
            alarm.setDataId(bucket.getId());
        } else {
            alarm.setDataId(review.getId());
        }

        alarmRepository.save(alarm);
        sendEventToUser(receiver.getId(), alarm);
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
        sendEventToUser(receiver.getId(), alarm);
    }

    @Scheduled(cron = "0 0 12 * * ?")
    public void remindBucketAlarm() {
        LocalDate today = LocalDate.now();
        List<Bucket> buckets = bucketRepository.findAllWithUser();

        for (Bucket bucket : buckets) {
            if (shouldSendReminder(bucket, today)) {
                createReminderAlarm(bucket.getUser(), bucket);
            }
        }
    }

    private boolean shouldSendReminder(Bucket bucket, LocalDate today) {
        if (bucket.getReminderDate() == null || bucket.getAchievementDate() != null){
            return false;
        }

        LocalDate createdDate = bucket.getCreatedDate().toLocalDate();
        ReminderDate reminder = bucket.getReminderDate();

        return switch (reminder) {
            case oneDay -> true;
            case oneWeek -> ChronoUnit.DAYS.between(createdDate, today) % 7 == 0;
            case twoWeeks -> ChronoUnit.DAYS.between(createdDate, today) % 14 == 0;
            case oneMonth -> createdDate.getDayOfMonth() == today.getDayOfMonth();
            case oneYear ->
                    createdDate.getDayOfYear() == today.getDayOfYear() && createdDate.getYear() != today.getYear();
        };
    }

    @Async
    protected void sendEventToUser(Long userId, Alarm alarm) {
        if(!userId.equals(6L)){
            return;
        }
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event().name("serverEvent").data(alarmService.convertToAlarmResponseDto(alarm)));
            } catch (IOException e) {
                emitter.completeWithError(e);
            } catch (Exception e) {
                throw new CustomException(ExceptionType.SSE_EMITTER_ERROR);
            }
        }

//        SseEmitter emitter = userEmitters.get(userId);
//        if (emitter != null) {
//            try {
//                emitter.send(SseEmitter.event().name("serverEvent").data(alarmService.convertToAlarmResponseDto(alarm)));
//            } catch (IOException e) {
//                emitter.completeWithError(e);
//                userEmitters.remove(userId);
//            } catch (Exception e) {
//                throw new CustomException(ExceptionType.SSE_EMITTER_ERROR);
//            }
//        }
    }
}