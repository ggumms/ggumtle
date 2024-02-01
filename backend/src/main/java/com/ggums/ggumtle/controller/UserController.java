package com.ggums.ggumtle.controller;

import com.ggums.ggumtle.common.response.Response;
import com.ggums.ggumtle.dto.request.UserFollowRequestDto;
import com.ggums.ggumtle.dto.request.UserUpdateRequestDto;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

     @PutMapping("/")
     public Response updateUser(@RequestPart("userImage") MultipartFile userImage,
                                @Valid @RequestPart("userData") UserUpdateRequestDto requestDto,
                                @AuthenticationPrincipal User user){
         return new Response("message", userService.updateUser(user, userImage, requestDto));
     }

//     @GetMapping("/{user}")
//     public Response userInfo(@AuthenticationPrincipal User user, @PathVariable("user") Long userId){
//         return new Response("userInfo", userService.userInfo(user, userId));
//     }

//     @PutMapping("/featured-bucket")
//     public Response representativeBucket(@AuthenticationPrincipal User user, @RequestParam("bucket") Long bucketId){
//         return new Response("message", userService.representativeBucket(user, bucketId));
//     }

//     @GetMapping("/search")
//     public Response searchUser(@AuthenticationPrincipal User user, @RequestParam String word, Pageable pageable){
//         return new Response("userSearchList", userService.searchUsers(word, pageable, user));
//     }

//     @PutMapping("/follow")
//     public Response followUser(@AuthenticationPrincipal User user, @RequestBody UserFollowRequestDto requestDto){
//         return new Response("message", userService.followUser(user, requestDto));
//     }

//     @GetMapping("/followee")
//     public Response userFollowee(@RequestParam Long userId, Pageable pageable){
//         return new Response("followerList", userService.userFolloweeList(userId, pageable));
//     }

//     @GetMapping("/follower")
//     public Response userFollower(@RequestParam Long userId, Pageable pageable){
//         return new Response("followerList", userService.userFollowerList(userId, pageable));
//     }

//     @GetMapping("/stats/{user}")
//     public Response userStats(@PathVariable("user") Long userId){
//         return new Response("userStats", userService.getUserStats(userId));
//     }
}
