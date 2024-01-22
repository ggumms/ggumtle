package com.ggums.ggumtle.controller;

import com.ggums.ggumtle.common.response.Response;
import com.ggums.ggumtle.dto.request.ReviewRequestDto;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public Long postReview(@AuthenticationPrincipal User user, @RequestBody ReviewRequestDto requestDto) {
        return reviewService.postReview(user, requestDto);
    }

    @PostMapping("/image")
    public String postImage(@RequestParam final MultipartFile image) {
        return reviewService.postImage(image);
    }

    @GetMapping("/{reviewId}")
    public Response getReview(@AuthenticationPrincipal User user, @PathVariable Long reviewId) {
        return new Response("review", reviewService.getReview(user, reviewId));
    }

    @PutMapping("/{reviewId}")
    public Response putReview(@AuthenticationPrincipal User user, @PathVariable Long reviewId, @RequestBody ReviewRequestDto requestDto) {
        return new Response("review_id", reviewService.putReview(user, reviewId, requestDto));
    }

    @DeleteMapping("/{reviewId}")
    public Response deleteReview(@AuthenticationPrincipal User user, @PathVariable Long reviewId) {
        return new Response("message", reviewService.deleteReview(user, reviewId));
    }
}
