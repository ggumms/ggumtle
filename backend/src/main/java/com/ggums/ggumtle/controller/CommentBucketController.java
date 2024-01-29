package com.ggums.ggumtle.controller;


import com.ggums.ggumtle.common.response.Response;
import com.ggums.ggumtle.dto.request.CommentRequestDto;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.service.CommentBucketService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comment/bucket")
public class CommentBucketController {

    private final CommentBucketService commentService;

    @PostMapping("/{bucketId}")
    public Response commentCreate(@AuthenticationPrincipal User user, @PathVariable long bucketId, @Valid @RequestBody CommentRequestDto requestDto) {

        return new Response("message", commentService.commentCreate(user, bucketId, requestDto));
    }

    @GetMapping("/{bucketId}")
    public Response commentList(@AuthenticationPrincipal User user, @PathVariable long bucketId, Pageable pageable ) {

        return new Response("bucketCommentList", commentService.commentList(user, bucketId, pageable));
    }

    @DeleteMapping("/{commentId}")
    public Response commentDelete(@AuthenticationPrincipal User user, @PathVariable long commentId) {

        return new Response("message", commentService.commentDelete(user, commentId));
    }

    @PutMapping("/{commentId}")
    public Response commentUpdate(@AuthenticationPrincipal User user, @PathVariable long commentId, @Valid @RequestBody CommentRequestDto requestDto) {

        return new Response("message", commentService.commentUpdate(user, requestDto, commentId));
    }

    @PutMapping("/like/{commentId}")
    public Response commentLike(@AuthenticationPrincipal User user, @PathVariable long commentId) {

        return new Response("message", commentService.commentLike(user, commentId));
    }

}
