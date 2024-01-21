package com.ggums.ggumtle.controller;

import com.ggums.ggumtle.common.response.Response;
import com.ggums.ggumtle.dto.request.ReviewRequestDto;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/")
    public Response postReview(@AuthenticationPrincipal User user, @RequestBody ReviewRequestDto requestDto) {
        return new Response("review_id", reviewService.postReview(user, requestDto));
    }

    @GetMapping("/{reviewId}")
    public Response getReview(@AuthenticationPrincipal User user, @PathVariable Long reviewId) {
        return new Response("review", reviewService.getReview(user, reviewId));
    }
}
