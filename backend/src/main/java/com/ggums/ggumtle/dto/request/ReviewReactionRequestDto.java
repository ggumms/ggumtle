package com.ggums.ggumtle.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class ReviewReactionRequestDto {
    @Schema(example = "멋져요", description = "리뷰 리액션 내용")
    @Size(max = 255, message = "리액션 크기를 초과하였습니다.")
    private String reaction;
}
