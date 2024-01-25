package com.ggums.ggumtle.controller;

import com.ggums.ggumtle.common.response.Response;
import com.ggums.ggumtle.service.UserApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserApiController {

    private final UserApiService userApiService;

    @GetMapping("/nickname/{nickname}")
    public Response isNicknameDuplicate(@PathVariable("nickname") String nickname){
        return new Response("isNicknameDuplicate", userApiService.isNicknameDuplicate(nickname));
    }
}
