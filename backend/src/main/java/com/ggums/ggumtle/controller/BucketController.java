package com.ggums.ggumtle.controller;

import com.ggums.ggumtle.common.response.Response;
import com.ggums.ggumtle.dto.request.PostBucketReactionRequestDto;
import com.ggums.ggumtle.dto.request.PostBucketRequestDto;
import com.ggums.ggumtle.dto.request.UpdateBucketRequestDto;
import com.ggums.ggumtle.dto.response.BucketSearchResponseDto;
import com.ggums.ggumtle.dto.response.GetBucketReactionResponseDto;
import com.ggums.ggumtle.dto.response.GetBucketResponseDto;
import com.ggums.ggumtle.dto.response.ReviewResponseDto;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.service.BucketService;
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

@Tag(name = "3. 버킷", description = "버킷과 관련된 API들 입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping("/bucket")
public class BucketController {

    private final BucketService bucketService;

    @Operation(summary = "버킷 생성", description = "버킷을 생성합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "버킷 생성 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "bucketId", schema = @Schema(type = "int", example = "1",description = "생성된 버킷 id"))
                    }))
    })
    @PostMapping("/")
    public Response postBucket(@AuthenticationPrincipal User user, @Valid @RequestBody PostBucketRequestDto requestDto){
        return new Response("bucketId", bucketService.postBucket(user, requestDto));
    }

    @Operation(summary = "버킷 조회", description = "주어진 id의 버킷 상세 정보를 반환합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "버킷 조회 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "bucketInfo", schema = @Schema(implementation = GetBucketResponseDto.class))
                    }))
    })
    @GetMapping("/info/{bucket}")
    public Response getBucket(@AuthenticationPrincipal User user, @PathVariable("bucket") Long bucketId){
        return new Response("bucketInfo", bucketService.getBucket(user, bucketId));
    }

    @PutMapping("/")
    @Operation(summary = "버킷 수정", description = "주어진 id의 버킷을 수정합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "버킷 수정 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "bucketId", schema = @Schema(type = "int", example = "1",description = "수정된 버킷 id"))
                    }))
    })
    public Response updateBucket(@AuthenticationPrincipal User user, @Valid @RequestBody UpdateBucketRequestDto requestDto){
        return new Response("bucketId", bucketService.updateBucket(user, requestDto));
    }

    @Operation(summary = "버킷 삭제", description = "주어진 id의 버킷을 삭제합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "버킷 삭제 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "message", schema = @Schema(defaultValue = "삭제를 완료하였습니다.", description = "삭제 성공 메세지"))
                    }))
    })
    @DeleteMapping("/{bucket}")
    public Response deleteBucket(@AuthenticationPrincipal User user, @PathVariable("bucket") Long bucket_id){
        return new Response("message", bucketService.deleteBucket(user, bucket_id));
    }

    @PatchMapping("/{bucket}")
    @Operation(summary = "버킷 달성일 등록", description = "주어진 id의 버킷 달성일을 금일로 등록합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "버킷 달성일 등록 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "message", schema = @Schema(defaultValue = "버킷 달성일이 등록되었습니다.", description = "달성일 등록 성공 메세지"))
                    }))
    })
    public Response achieveBucket(@AuthenticationPrincipal User user, @PathVariable("bucket") Long bucket_id){
        return new Response("message", bucketService.achieveBucket(user, bucket_id));
    }

    @GetMapping("/search")
    @Operation(summary = "버킷 검색", description = "제목에 키워드를 포함하는 버킷를 검색합니다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "버킷 검색 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "bucketSearchList", schema = @Schema(implementation = BucketSearchResponseDto.class))
                    }))
    })
    public Response searchBucket(@RequestParam String word, Pageable pageable){
        return new Response("bucketSearchList", bucketService.searchBuckets(word, pageable));
    }

    @PostMapping("/image/{bucket}")
    @Operation(summary = "버킷 이미지 등록", description = "버킷 이미지를 등록합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "이미지 저장 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "bucketImageUrl",
                                    schema = @Schema(type = "string",
                                            example = "(호스트 서버 주소)/image/reviewImage/(이미지명).png",
                                            description = "이미지 URL"))
                    }))
    })
    public Response bucketImage(@AuthenticationPrincipal User user, @PathVariable("bucket") Long bucketId, @RequestParam("bucketImage") MultipartFile bucketImage){
        return new Response("bucketImageUrl", bucketService.bucketImage(user, bucketId, bucketImage));
    }

    @GetMapping("/reaction/{bucket}")
    @Operation(summary = "버킷 리액션 조회", description = "버킷에 달린 리액션을 반환합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "리액션 조회 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "bucketReaction", schema = @Schema(implementation = GetBucketReactionResponseDto.class)),
                    }))
    })
    public Response getBucketReaction(@AuthenticationPrincipal User user, @PathVariable("bucket") Long bucketId){
        return new Response("bucketReaction", bucketService.getBucketReaction(user, bucketId));
    }

    @PostMapping("/reaction/")
    @Operation(summary = "버킷 리액션 작성", description = "버킷에 리액션을 답니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "리액션 작성 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "userReaction", schema = @Schema(type = "string", example = "멋져요",description = "생성된 리액션 내용"))
                    }))
    })
    public Response postBucketReaction(@AuthenticationPrincipal User user, @Valid @RequestBody PostBucketReactionRequestDto requestDto){
        return new Response("userReaction", bucketService.postBucketReaction(user, requestDto));
    }

}