package com.ggums.ggumtle.controller;

import com.ggums.ggumtle.common.response.Response;
import com.ggums.ggumtle.dto.request.PutReviewRequestDto;
import com.ggums.ggumtle.dto.request.ReviewReactionRequestDto;
import com.ggums.ggumtle.dto.request.PostReviewRequestDto;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public Response postReview(@AuthenticationPrincipal User user, @RequestBody PostReviewRequestDto requestDto) {
        return new Response("review_id", reviewService.postReview(user, requestDto));
    }

    @PostMapping("/image")
    public Response postImage(@RequestParam final MultipartFile image) {
        return new Response("image_url", reviewService.postImage(image));
    }

    @GetMapping("/{reviewId}")
    public Response getReview(@AuthenticationPrincipal User user, @PathVariable Long reviewId) {
        return new Response("review", reviewService.getReview(user, reviewId));
    }

    @PutMapping("/{reviewId}")
    public Response putReview(@AuthenticationPrincipal User user, @PathVariable Long reviewId, @RequestBody PutReviewRequestDto requestDto) {
        return new Response("review_id", reviewService.putReview(user, reviewId, requestDto));
    }

    @DeleteMapping("/{reviewId}")
    public Response deleteReview(@AuthenticationPrincipal User user, @PathVariable Long reviewId) {
        return new Response("message", reviewService.deleteReview(user, reviewId));
    }

    @PostMapping("/{reviewId}/reaction")
    public Response postReviewReaction(@AuthenticationPrincipal User user, @PathVariable Long reviewId, @RequestBody ReviewReactionRequestDto requestDto) {
        return new Response("myReaction", reviewService.postReviewReaction(user, reviewId, requestDto));
    }

    @GetMapping("/{reviewId}/reaction")
    public Response getReviewReaction(@AuthenticationPrincipal User user, @PathVariable Long reviewId) {
        return new Response("review_reactions", reviewService.getReviewReaction(user, reviewId));
    }

    @GetMapping("/search")
    public Response searchReview(@RequestParam String keyword, Pageable pageable) {
        return new Response("reviewSearchList", reviewService.searchReview(keyword, pageable));
    }
}
