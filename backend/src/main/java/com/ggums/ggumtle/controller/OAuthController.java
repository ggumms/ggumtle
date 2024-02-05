package com.ggums.ggumtle.controller;

import com.ggums.ggumtle.common.response.Response;
import com.ggums.ggumtle.service.OAuth.GoogleService;
import com.ggums.ggumtle.service.OAuth.KakaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/oauth")
public class OAuthController {

    private final KakaoService kakaoService;
    private final GoogleService googleService;

    @GetMapping("/kakao")
    public Response kakaoLogin(){
        return new Response("", null);
    }

    @PostMapping("/kakao")
    public Response kakaoJoin(){
        return new Response("", null);
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
