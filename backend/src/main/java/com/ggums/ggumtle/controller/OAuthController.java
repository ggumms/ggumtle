package com.ggums.ggumtle.controller;

import com.ggums.ggumtle.common.response.Response;
import com.ggums.ggumtle.dto.request.OAuthJoinRequestDto;
import com.ggums.ggumtle.service.OAuth.GoogleService;
import com.ggums.ggumtle.service.OAuth.KakaoService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/oauth")
public class OAuthController {

    private final KakaoService kakaoService;
    private final GoogleService googleService;

    @GetMapping("/kakao/{authorizationCode}")
    public Response kakaoLogin(HttpServletResponse response, @PathVariable String authorizationCode){
        return new Response("login", kakaoService.kakaoLogin(response, authorizationCode));
    }

    @PostMapping("/kakao")
    public Response kakaoJoin(@Valid @RequestBody OAuthJoinRequestDto requestDto){
        return new Response("message", kakaoService.kakaoJoin(requestDto));
    }

    @GetMapping("/google")
    public Response googleLogin(){
        return new Response("", null);
    }

    @PostMapping("/google")
    public Response googleJoin(){
        return new Response("", null);
    }
}
