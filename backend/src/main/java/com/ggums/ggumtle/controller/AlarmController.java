package com.ggums.ggumtle.controller;

import com.ggums.ggumtle.common.handler.AlarmHandler;
import com.ggums.ggumtle.common.response.Response;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.service.AlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/alarm")
public class AlarmController {

    private final AlarmService alarmService;
    private final AlarmHandler alarmHandler;

    @GetMapping(value = "/subscribe", produces = "text/event-stream")
    public SseEmitter subscribe(@AuthenticationPrincipal User user) {
        Long userId = user.getId();
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);

        // if previous emitter exist, complete(delete)
        SseEmitter previousEmitter = alarmHandler.userEmitters.put(userId, emitter);
        if (previousEmitter != null) {
            previousEmitter.complete();
        }

        emitter.onCompletion(() -> alarmHandler.userEmitters.remove(userId, emitter));
        emitter.onTimeout(() -> alarmHandler.userEmitters.remove(userId, emitter));
        emitter.onError((e) -> alarmHandler.userEmitters.remove(userId, emitter));

        return emitter;
    }

    @GetMapping("/count")
    public Response alarmCount(@AuthenticationPrincipal User user){
        return new Response("alarmCount", alarmService.alarmCount(user));
    }

    @GetMapping("/")
    public Response alarm(@AuthenticationPrincipal User user, @RequestParam Pageable pageable){
        return new Response("alarm", alarmService.alarmList(user, pageable));
    }

    @PostMapping("/{alarmId}")
    public Response alarmRead(@AuthenticationPrincipal User user, @PathVariable("alarmId") Long alarmId){
        return new Response("message", alarmService.alarmRead(user, alarmId));
    }
}
