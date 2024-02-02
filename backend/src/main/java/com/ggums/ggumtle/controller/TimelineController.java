package com.ggums.ggumtle.controller;

import com.ggums.ggumtle.common.response.Response;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.service.TimelineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "2. 타임라인 관리")
@RequiredArgsConstructor
@RestController
@RequestMapping(path = "/timeline")
public class TimelineController {

    private final TimelineService timelineService;

    @Operation(summary = "타임라인 조회(팔로잉) - 작업중", description = "미달성, 달성, 후기에 맞는 타임라인을 반환해줍니다.")
    @GetMapping("/")
    public Response get(@AuthenticationPrincipal User user,
                        @RequestParam Boolean doing,
                        @RequestParam Boolean done,
                        @RequestParam Boolean review,
                        Pageable pageable) throws Exception {

        return new Response("timeline", timelineService.get(user, doing, done, review, pageable));
    }
}
