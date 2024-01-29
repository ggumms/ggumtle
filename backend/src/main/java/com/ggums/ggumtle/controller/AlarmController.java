package com.ggums.ggumtle.controller;

import com.ggums.ggumtle.common.response.Response;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.service.AlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AlarmController {

    private final AlarmService alarmService;

    @GetMapping("/count")
    public Response alarmCount(@AuthenticationPrincipal User user){
        return new Response("alarmCount", alarmService.alarmCount(user));
    }

    @GetMapping("/")
    public Response alarm(@AuthenticationPrincipal User user){
        return new Response("", null);
    }

    @PostMapping("/{alarmId}")
    public Response alarmRead(@AuthenticationPrincipal User user, @PathVariable("alarmId") Long alarmId){
        return new Response("message", alarmService.alarmRead(user, alarmId));
    }
}
