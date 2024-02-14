package com.ggums.ggumtle.controller;

import com.ggums.ggumtle.common.response.Response;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.service.RadarService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "1. 레이다 관리")
@RequiredArgsConstructor
@RestController
@RequestMapping(path = "/radar")
public class RadarController {

    private final RadarService radarService;

    @Operation(summary = "레이다 조회(팔로잉)", description = "자신이 팔로잉한 사람들의 친밀도에 따른 리스트를 반환해줍니다.")
    @GetMapping("/following")
    public Response getFollowing(@AuthenticationPrincipal User user) throws Exception {

        return new Response("radar", radarService.getFollowing(user));
    }

    @Operation(summary = "레이다 조회(전체) - 초기화면", description = "자신의 관심분야에 따른 전체 레이다 초기화면을 반환해줍니다. ")
    @GetMapping("/total/init")
    public Response getTotalInit(@AuthenticationPrincipal User user) throws Exception {

        return new Response("radar", radarService.getTotalInit(user));
    }

    @Operation(summary = "레이다 조회(전체)", description = "자신의 관심분야에 따른 리스트를 반환해줍니다. ")
    @GetMapping("/total")
    public Response getTotal(@AuthenticationPrincipal User user, @RequestParam List<String> categories) throws Exception {

        return new Response("radar", radarService.getTotal(user, categories));
    }
}
