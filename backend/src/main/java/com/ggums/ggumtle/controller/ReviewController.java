package com.ggums.ggumtle.controller;

import com.ggums.ggumtle.common.response.Response;
import com.ggums.ggumtle.dto.request.PutReviewRequestDto;
import com.ggums.ggumtle.dto.request.ReviewReactionRequestDto;
import com.ggums.ggumtle.dto.request.PostReviewRequestDto;
import com.ggums.ggumtle.dto.response.ReviewReactionResponseDto;
import com.ggums.ggumtle.dto.response.ReviewResponseDto;
import com.ggums.ggumtle.dto.response.ReviewSearchResponseDto;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.service.ReviewService;
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

@Tag(name = "3. 후기", description = "후기와 관련된 API들 입니다")
@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    @Operation(summary = "후기 생성", description = "해당 버킷과 연관된 후기를 생성합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "후기 생성 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "reviewId", schema = @Schema(type = "int", example = "1",description = "생성된 후기 id"))
                    }))
    })
    public Response postReview(@AuthenticationPrincipal User user, @Valid @RequestBody PostReviewRequestDto requestDto) {
        return new Response("reviewId", reviewService.postReview(user, requestDto));
    }

    @PostMapping("/image")
    @Operation(summary = "후기 이미지 등록", description = "Toast UI를 통해 후기 이미지를 등록합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "이미지 저장 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "imageUrl",
                                    schema = @Schema(type = "string",
                                            example = "(호스트 서버 주소)/image/reviewImage/(이미지명).png",
                                            description = "이미지 URL"))
                    }))
    })
    public Response postImage(@RequestParam final MultipartFile image) {
        return new Response("imageUrl", reviewService.postImage(image));
    }

    @GetMapping("/{reviewId}")
    @Operation(summary = "후기 조회", description = "주어진 id의 후기 상세 정보를 반환합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "후기 조희 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "review", schema = @Schema(implementation = ReviewResponseDto.class))
                    }))
    })
    public Response getReview(@AuthenticationPrincipal User user, @PathVariable Long reviewId) {
        return new Response("review", reviewService.getReview(user, reviewId));
    }

    @PutMapping("/{reviewId}")
    @Operation(summary = "후기 수정", description = "주어진 id의 후기를 수정합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "후기 수정 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "reviewId", schema = @Schema(type = "int", example = "1",description = "수정된 후기 id"))
                    }))
    })
    public Response putReview(@AuthenticationPrincipal User user, @PathVariable Long reviewId, @Valid @RequestBody PutReviewRequestDto requestDto) {
        return new Response("reviewId", reviewService.putReview(user, reviewId, requestDto));
    }

    @DeleteMapping("/{reviewId}")
    @Operation(summary = "후기 삭제", description = "주어진 id의 후기를 삭제합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "후기 삭제 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "message", schema = @Schema(defaultValue = "삭제를 완료하였습니다.", description = "삭제 성공 메세지"))
                    }))
    })
    public Response deleteReview(@AuthenticationPrincipal User user, @PathVariable Long reviewId) {
        return new Response("message", reviewService.deleteReview(user, reviewId));
    }

    @PostMapping("/{reviewId}/reaction")
    @Operation(summary = "후기 리액션 작성", description = "후기에 리액션을 답니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "리액션 작성 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "myReaction", schema = @Schema(type = "string", example = "멋져요",description = "생성된 리액션 내용"))
                    }))
    })
    public Response postReviewReaction(@AuthenticationPrincipal User user, @PathVariable Long reviewId, @Valid @RequestBody ReviewReactionRequestDto requestDto) {
        return new Response("myReaction", reviewService.postReviewReaction(user, reviewId, requestDto));
    }

    @GetMapping("/{reviewId}/reaction")
    @Operation(summary = "후기 리액션 조회", description = "후기에 달린 리액션을 반환합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "리액션 조회 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "reviewReactions", schema = @Schema(implementation = ReviewReactionResponseDto.class)),
                    }))
    })
    public Response getReviewReaction(@AuthenticationPrincipal User user, @PathVariable Long reviewId) {
        return new Response("reviewReactions", reviewService.getReviewReaction(user, reviewId));
    }

    @GetMapping("/search")
    @Operation(summary = "후기 검색", description = "제목에 키워드를 포함하는 후기를 검색합니다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "후기 검색 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "reviewSearchList", schema = @Schema(implementation = ReviewSearchResponseDto.class))
                    }))
    })
    public Response searchReview(@RequestParam String keyword, Pageable pageable) {
        return new Response("reviewSearchList", reviewService.searchReview(keyword, pageable));
    }
}
