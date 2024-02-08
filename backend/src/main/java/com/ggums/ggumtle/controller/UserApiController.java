package com.ggums.ggumtle.controller;

import com.ggums.ggumtle.common.response.Response;
import com.ggums.ggumtle.dto.request.*;
import com.ggums.ggumtle.service.UserApiService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "5. 사용자 API", description = "비로그인 사용자(인증 X)와 관련된 API들 입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserApiController {

    private final UserApiService userApiService;

    @GetMapping("/nickname/{nickname}")
    @Operation(summary = "닉네임 중복 확인", description = "중복되는 닉네임이 이미 있는지 조회합니다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "닉네임 중복 확인 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "isNicknameDuplicate", schema = @Schema(description = "중복 여부", example = "false")),
                    }))
    })
    public Response isNicknameDuplicate(@PathVariable("nickname") String nickname){
        return new Response("isNicknameDuplicate", userApiService.isNicknameDuplicate(nickname));
    }

    @PostMapping("/join/nickname")
    public Response nicknameCacheSave(@Valid @RequestBody NicknameCacheSaveRequestDto requestDto){
        return new Response("isDuplicate",userApiService.nicknameCacheSave(requestDto));
    }

    @PostMapping("/email")
    public Response sendJoinVerificationEmail(@Valid @RequestBody EmailAuthenticationRequestDto requestDto){
        return new Response("message", userApiService.sendJoinVerificationEmail(requestDto));
    }

    @PostMapping("/email/verify")
    public Response joinVerificationEmail(@Valid @RequestBody EmailVerificationRequestDto requestDto){
        return new Response("message", userApiService.joinVerificationEmail(requestDto));
    }

    @PostMapping("/join")
    public Response emailJoin(HttpServletResponse response, @Valid @RequestBody EmailJoinRequestDto requestDto){
        return new Response("message", userApiService.emailJoin(response, requestDto));
    }

    @PostMapping("/login")
    public Response emailLogin(@Valid @RequestBody EmailLoginRequestDto requestDto, HttpServletResponse response){
        return new Response("message", userApiService.emailLogin(response, requestDto));
    }

    @PostMapping("/password/find")
    public Response sendFindVerificationEmail(@Valid @RequestBody EmailAuthenticationRequestDto requestDto){
        return new Response("message", userApiService.sendFindVerificationEmail(requestDto));
    }

    @PostMapping("/password/verify")
    public Response findVerificationEmail(@Valid @RequestBody EmailVerificationRequestDto requestDto){
        return new Response("message", userApiService.findVerificationEmail(requestDto));
    }

    @PostMapping("/password/reset")
    public Response sendNewPasswordToEmail(@Valid @RequestBody EmailAuthenticationRequestDto requestDto){
        return new Response("message", userApiService.sendNewPasswordToEmail(requestDto));
    }
}
