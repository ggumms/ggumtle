package com.ggums.ggumtle.controller;

import com.ggums.ggumtle.common.response.Response;
import com.ggums.ggumtle.dto.request.PostBucketReactionRequestDto;
import com.ggums.ggumtle.dto.request.PostBucketRequestDto;
import com.ggums.ggumtle.dto.request.UpdateBucketRequestDto;
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

@Tag(name = "버킷", description = "버킷과 관련된 API들 입니다")
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

//    @PutMapping("/")
//    public Response updateBucket(@AuthenticationPrincipal User user, @Valid @RequestBody UpdateBucketRequestDto requestDto){
//        return new Response("bucketId", bucketService.updateBucket(user, requestDto));
//    }

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

//    @PatchMapping("/{bucket}")
//    public Response achieveBucket(@AuthenticationPrincipal User user, @PathVariable("bucket") Long bucket_id){
//        return new Response("message", bucketService.achieveBucket(user, bucket_id));
//    }

//    @GetMapping("/search")
//    public Response searchBucket(@RequestParam String word, Pageable pageable){
//        return new Response("bucketSearchList", bucketService.searchBuckets(word, pageable));
//    }

//    @PostMapping("/image/{bucket}")
//    public Response bucketImage(@AuthenticationPrincipal User user, @PathVariable("bucket") Long bucketId, @RequestParam("bucketImage") MultipartFile bucketImage){
//        return new Response("bucketImageUrl", bucketService.bucketImage(user, bucketId, bucketImage));
//    }

//    @GetMapping("/reaction/{bucket}")
//    public Response getBucketReaction(@AuthenticationPrincipal User user, @PathVariable("bucket") Long bucketId){
//        return new Response("bucketReaction", bucketService.getBucketReaction(user, bucketId));
//    }

//    @PostMapping("/reaction/")
//    public Response postBucketReaction(@AuthenticationPrincipal User user, @Valid @RequestBody PostBucketReactionRequestDto requestDto){
//        return new Response("userReaction", bucketService.postBucketReaction(user, requestDto));
//    }

}