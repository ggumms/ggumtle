package com.ggums.ggumtle.controller;

import com.ggums.ggumtle.common.exception.CustomException;
import com.ggums.ggumtle.common.exception.ExceptionType;
import com.ggums.ggumtle.common.handler.AlarmHandler;
import com.ggums.ggumtle.common.response.Response;
import com.ggums.ggumtle.dto.response.AlarmResponseDto;
import com.ggums.ggumtle.dto.response.GetBucketResponseDto;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.service.AlarmService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@Tag(name = "6. 알람", description = "알람과 관련된 API들 입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping("/alarm")
public class AlarmController {

    private final AlarmService alarmService;
    private final AlarmHandler alarmHandler;

    @GetMapping(value = "/subscribe", produces = "text/event-stream")
    @Operation(summary = "알람 연결", description = "알람 연결을 요청합니다")
    public SseEmitter subscribe(@AuthenticationPrincipal User user) {
        Long userId = user.getId();
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        try {
            emitter.send(SseEmitter.event().name("INIT"));
        } catch (IOException e) {
            throw new CustomException(ExceptionType.SSE_EMITTER_ERROR);
        }

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
    @Operation(summary = "알람 개수 반환", description = "안 읽은 알람의 개수를 반환합니다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "버킷 생성 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "alarmCount", schema = @Schema(type = "int", example = "5",description = "알람 개수"))
                    }))
    })
    public Response alarmCount(@AuthenticationPrincipal User user){
        return new Response("alarmCount", alarmService.alarmCount(user));
    }

    @GetMapping("/")
    @Operation(summary = "알람 리스트 반환", description = "알람 내역을 반환합니다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "버킷 생성 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "alarm", schema = @Schema(implementation = AlarmResponseDto.class))
                    }))
    })
    public Response alarm(@AuthenticationPrincipal User user, Pageable pageable){
        return new Response("alarm", alarmService.alarmList(user, pageable));
    }

    @PostMapping("/{alarmId}")
    @Operation(summary = "단일 알람 읽음 처리", description = "하나의 알람을 읽음 처리 합니다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "읽음 처리 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "message", schema = @Schema(defaultValue = "1 알람을 서준호님이 읽음 처리하였습니다.", description = "알림 읽음 성공 메세지"))
                    }))
    })
    public Response alarmRead(@AuthenticationPrincipal User user, @PathVariable("alarmId") Long alarmId){
        return new Response("message", alarmService.alarmRead(user, alarmId));
    }

    @PatchMapping("/user")
    @Operation(summary = "사용자 알람 활성화 설정", description = "사용자의 알람을 켤지 끌지 결정할 수 있습니다")
    @ApiResponses({
            @ApiResponse(responseCode = "200(켜기)", description = "알람 켜기 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "message", schema = @Schema(defaultValue = "알람이 true 입니다.", description = "알림 켜기 성공 메세지"))
                    })),
            @ApiResponse(responseCode = "200(끄기)", description = "알람 끄기 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "message", schema = @Schema(defaultValue = "알람이 false 입니다.", description = "알림 끄기 성공 메세지"))
                    }))
    })
    public Response alarmUser(@AuthenticationPrincipal User user, @RequestParam boolean alarm){
        return new Response("message", alarmService.alarmUser(user, alarm));
    }

    @PutMapping("/all-read")
    @Operation(summary = "알람 전부 읽음 처리", description = "모든 안 읽은 알람을 읽음 처리 합니다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "읽음 처리 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "message", schema = @Schema(defaultValue = "전부 읽기 성공", description = "알림 읽음 성공 메세지"))
                    }))
    })
    public Response readAllAlarm(@AuthenticationPrincipal User user){
        return new Response("message", alarmService.readAllAlarm(user));
    }

}
