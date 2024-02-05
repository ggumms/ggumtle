package com.ggums.ggumtle.controller;

import com.ggums.ggumtle.common.response.Response;
import com.ggums.ggumtle.dto.request.UserFollowRequestDto;
import com.ggums.ggumtle.dto.request.UserUpdateRequestDto;
import com.ggums.ggumtle.dto.response.UserInfoResponseDto;
import com.ggums.ggumtle.dto.response.UserListResponseDto;
import com.ggums.ggumtle.dto.response.UserStatsResponseDto;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "5. 사용자", description = "사용자 정보 관련 API들 입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

     @PutMapping("/")
     @Operation(summary = "사용자 정보 수정", description = "사용자의 정보를 수정합니다.")
     @ApiResponses({
             @ApiResponse(responseCode = "200", description = "사용자 정보 수정 성공",
                     content = @Content(schemaProperties = {
                             @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                             @SchemaProperty(name = "message", schema = @Schema(defaultValue = "업데이트를 완료하였습니다.", description = "삭제 성공 메세지"))
                     }))
     })
     public Response updateUser(@RequestPart("userImage") MultipartFile userImage,
                                @Valid @RequestPart("userData") UserUpdateRequestDto requestDto,
                                @AuthenticationPrincipal User user){
         return new Response("message", userService.updateUser(user, userImage, requestDto));
     }

     @GetMapping("/{user}")
     @Operation(summary = "사용자 조회", description = "주어진 id의 사용자 상세 정보를 반환합니다.")
     @ApiResponses({
             @ApiResponse(responseCode = "200", description = "사용자 조희 성공",
                     content = @Content(schemaProperties = {
                             @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                             @SchemaProperty(name = "userInfo", schema = @Schema(implementation = UserInfoResponseDto.class))
                     }))
     })
     public Response userInfo(@AuthenticationPrincipal User user, @PathVariable("user") Long userId){
         return new Response("userInfo", userService.userInfo(user, userId));
     }

     @PutMapping("/featured-bucket")
     @Operation(summary = "대표 버킷 설정 및 삭제", description = "주어진 id의 버킷을 사용자의 대표버킷으로 설정합니다. (null 입력 시 삭제요청)")
     @ApiResponses({
             @ApiResponse(responseCode = "200(생성)", description = "대표 버킷 설정 성공",
                     content = @Content(schemaProperties = {
                             @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                             @SchemaProperty(name = "message", schema = @Schema(defaultValue = "대표 버킷을 반영하였습니다. 버킷 : 1",description = "설정 성공 메세지와 대표 버킷으로 설정된 버킷 id"))
                     })),
             @ApiResponse(responseCode = "200(삭제)", description = "대표 버킷 삭제 성공",
                     content = @Content(schemaProperties = {
                             @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                             @SchemaProperty(name = "message", schema = @Schema(defaultValue = "대표 버킷이 삭제되었습니다.",description = "삭제 성공 메세지"))
                     }))
     })
     public Response representativeBucket(@AuthenticationPrincipal User user, @RequestParam("bucket") Long bucketId){
         return new Response("message", userService.representativeBucket(user, bucketId));
     }

     @GetMapping("/search")
     @Operation(summary = "사용자 검색", description = "닉네임에 키워드를 포함하는 사용자를 검색합니다")
     @ApiResponses({
             @ApiResponse(responseCode = "200", description = "사용자 검색 성공",
                     content = @Content(schemaProperties = {
                             @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                             @SchemaProperty(name = "userSearchList", schema = @Schema(implementation = UserListResponseDto.class))
                     }))
     })
     public Response searchUser(@AuthenticationPrincipal User user, @RequestParam String word, Pageable pageable){
         return new Response("userSearchList", userService.searchUsers(word, pageable, user));
     }

     @PutMapping("/follow")
     @Operation(summary = "팔로우 및 팔로우 취소", description = "사용자를 팔로우하거나 팔로우 취소합니다.")
     @ApiResponses({
             @ApiResponse(responseCode = "200(삭제)", description = "팔로우 취소 성공",
                     content = @Content(schemaProperties = {
                             @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                             @SchemaProperty(name = "message", schema = @Schema(defaultValue = "서준호님이 조인화님을 구독 취소하였습니다.",description = "삭제 성공 메세지"))
                     })),
             @ApiResponse(responseCode = "200(생성)", description = "팔로우 성공",
                     content = @Content(schemaProperties = {
                             @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                             @SchemaProperty(name = "message", schema = @Schema(defaultValue = "서준호님이 신창엽님을 구독하였습니다.",description = "설정 성공 메세지"))
                     }))
     })
     public Response followUser(@AuthenticationPrincipal User user, @RequestBody UserFollowRequestDto requestDto){
         return new Response("message", userService.followUser(user, requestDto));
     }

     @GetMapping("/followee")
     @Operation(summary = "팔로이 검색", description = "주어진 id의 사용자가 팔로우하는 사용자를 반환합니다")
     @ApiResponses({
             @ApiResponse(responseCode = "200", description = "팔로이 조회 성공",
                     content = @Content(schemaProperties = {
                             @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                             @SchemaProperty(name = "followerList", schema = @Schema(implementation = UserListResponseDto.class))
                     }))
     })
     public Response userFollowee(@RequestParam Long userId, Pageable pageable){
         return new Response("followerList", userService.userFolloweeList(userId, pageable));
     }

     @GetMapping("/follower")
     @Operation(summary = "팔로워 검색", description = "주어진 id의 사용자를 팔로우하는 사용자를 반환합니다")
     @ApiResponses({
             @ApiResponse(responseCode = "200", description = "팔로워 조회 성공",
                     content = @Content(schemaProperties = {
                             @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                             @SchemaProperty(name = "followerList", schema = @Schema(implementation = UserListResponseDto.class))
                     }))
     })
     public Response userFollower(@RequestParam Long userId, Pageable pageable){
         return new Response("followerList", userService.userFollowerList(userId, pageable));
     }

     @GetMapping("/stats/{user}")
     @Operation(summary = "사용자 상태 조회", description = "사용자 페이지 헤더 정보 (팔로워 수, 팔로잉 수, 달성률)을 조회합니다.")
     @ApiResponses({
             @ApiResponse(responseCode = "200", description = "사용자 상태 조회 성공",
                     content = @Content(schemaProperties = {
                             @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                             @SchemaProperty(name = "userStats", schema = @Schema(implementation = UserStatsResponseDto.class))
                     }))
     })
     public Response userStats(@PathVariable("user") Long userId){
         return new Response("userStats", userService.getUserStats(userId));
     }
}
