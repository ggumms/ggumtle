package com.ggums.ggumtle.controller;


import com.ggums.ggumtle.common.response.Response;
import com.ggums.ggumtle.dto.request.CommentRequestDto;
import com.ggums.ggumtle.dto.response.CommentResponseDto;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.service.CommentReviewService;
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

@Tag(name = "9. 후기 댓글", description = "후기 하위 댓글과 관련된 API들 입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping("/comment/review")
public class CommentReviewController {

    private final CommentReviewService commentService;

    @PostMapping("/{reviewId}")
    @Operation(summary = "댓글 생성", description = "주어진 id의 후기에 댓글을 생성합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "댓글 생성 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "message", schema = @Schema(defaultValue = "댓글이 생성되었습니다.", description = "생성 성공 메세지"))
                    }))
    })
    public Response commentCreate(@AuthenticationPrincipal User user, @PathVariable long reviewId, @Valid @RequestBody CommentRequestDto requestDto) {

        return new Response("message", commentService.commentCreate(user, reviewId, requestDto));
    }

    @GetMapping("/{reviewId}")
    @Operation(summary = "댓글 조회", description = "주어진 id의 후기 하위에 작성된 댓글 목록을 반환합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "댓글 조회 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "message", schema = @Schema(implementation = CommentResponseDto.class))
                    }))
    })
    public Response commentList(@AuthenticationPrincipal User user, @PathVariable long reviewId, Pageable pageable ) {

        return new Response("reviewCommentList", commentService.commentList(user, reviewId, pageable));
    }

    @DeleteMapping("/{commentId}")
    @Operation(summary = "댓글 삭제", description = "주어진 id의 댓글을 삭제합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "버킷 삭제 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "message", schema = @Schema(defaultValue = "댓글이 삭제되었습니다.", description = "생성 성공 메세지"))
                    }))
    })
    public Response commentDelete(@AuthenticationPrincipal User user, @PathVariable long commentId) {

        return new Response("message", commentService.commentDelete(user, commentId));
    }

    @PutMapping("/{commentId}")
    @Operation(summary = "댓글 수정", description = "주어진 id의 댓글을 수정합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "버킷 삭제 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "message", schema = @Schema(defaultValue = "댓글이 수정되었습니다.", description = "수정 성공 메세지"))
                    }))
    })
    public Response commentUpdate(@AuthenticationPrincipal User user, @PathVariable long commentId, @Valid @RequestBody CommentRequestDto requestDto) {

        return new Response("message", commentService.commentUpdate(user, requestDto, commentId));
    }

    @PutMapping("/like/{commentId}")
    @Operation(summary = "좋아요 및 좋아요 취소", description = "버킷 작성자가 댓글을 좋아요하거나 좋아요를 취소합니다. (토글 형식)")
    @ApiResponses({
            @ApiResponse(responseCode = "200(삭제)", description = "좋아요 취소 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "message", schema = @Schema(defaultValue = "좋아요가 취소되었습니다.",description = "삭제 성공 메세지"))
                    })),
            @ApiResponse(responseCode = "200(생성)", description = "좋아요 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "message", schema = @Schema(defaultValue = "좋아요가 생성되었습니다.",description = "생성 성공 메세지"))
                    }))
    })
    public Response commentLike(@AuthenticationPrincipal User user, @PathVariable long commentId) {

        return new Response("message", commentService.commentLike(user, commentId));
    }

}
