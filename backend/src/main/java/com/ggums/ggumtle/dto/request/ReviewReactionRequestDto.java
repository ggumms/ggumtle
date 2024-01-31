package com.ggums.ggumtle.dto.request;

import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class ReviewReactionRequestDto {
    @Size(max = 255, message = "리액션 크기를 초과하였습니다.")
    private String reaction;
}
