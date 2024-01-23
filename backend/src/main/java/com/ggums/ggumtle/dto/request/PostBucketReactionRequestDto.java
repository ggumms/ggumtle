package com.ggums.ggumtle.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class PostBucketReactionRequestDto {

    @Schema(example = "1")
    private Long bucketId;

    @Size(max = 255, message = "리액션 크기를 초과하였습니다.")
    private String userReaction;
}
