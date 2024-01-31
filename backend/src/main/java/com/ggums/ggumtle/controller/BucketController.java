package com.ggums.ggumtle.controller;

import com.ggums.ggumtle.common.response.Response;
import com.ggums.ggumtle.dto.request.PostBucketReactionRequestDto;
import com.ggums.ggumtle.dto.request.PostBucketRequestDto;
import com.ggums.ggumtle.dto.request.UpdateBucketRequestDto;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.service.BucketService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bucket")
public class BucketController {

    private final BucketService bucketService;

//    @PostMapping("/")
//    public Response postBucket(@AuthenticationPrincipal User user, @Valid @RequestBody PostBucketRequestDto requestDto){
//        return new Response("bucketId", bucketService.postBucket(user, requestDto));
//    }

//    @GetMapping("/info/{bucket}")
//    public Response getBucket(@AuthenticationPrincipal User user, @PathVariable("bucket") Long bucketId){
//        return new Response("bucketInfo", bucketService.getBucket(user, bucketId));
//    }

//    @PutMapping("/")
//    public Response updateBucket(@AuthenticationPrincipal User user, @Valid @RequestBody UpdateBucketRequestDto requestDto){
//        return new Response("bucketId", bucketService.updateBucket(user, requestDto));
//    }

//    @DeleteMapping("/{bucket}")
//    public Response deleteBucket(@AuthenticationPrincipal User user, @PathVariable("bucket") Long bucket_id){
//        return new Response("message", bucketService.deleteBucket(user, bucket_id));
//    }

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