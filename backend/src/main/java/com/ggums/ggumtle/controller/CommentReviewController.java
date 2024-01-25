package com.ggums.ggumtle.controller;


import com.ggums.ggumtle.common.response.Response;
import com.ggums.ggumtle.dto.request.CommentRequestDto;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.service.CommentReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comment/review")
public class CommentReviewController {

    private final CommentReviewService commentService;

    @PostMapping("/{reviewId}")
    public Response commentCreate(@AuthenticationPrincipal User user, @PathVariable long reviewId, @Valid @RequestBody CommentRequestDto requestDto) {

        return new Response("message", commentService.commentCreate(user, reviewId, requestDto));
    }

    @GetMapping("/{reviewId}")
    public Response commentList(@AuthenticationPrincipal User user, @PathVariable long reviewId, Pageable pageable ) {

        return new Response("reviewCommentList", commentService.commentList(user, reviewId, pageable));
    }

    @DeleteMapping("/{commentId}")
    public Response commentDelete(@AuthenticationPrincipal User user, @PathVariable long commentId) {

        return new Response("message", commentService.commentDelete(user, commentId));
    }

    @PutMapping("/{commentId}")
    public Response commentUpdate(@AuthenticationPrincipal User user, @PathVariable long commentId, @Valid @RequestBody CommentRequestDto requestDto) {

        return new Response("message", commentService.commentUpdate(user, requestDto, commentId));
    }

}
