package com.ggums.ggumtle.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class CommentRequestDto {

    @Schema(example = "20만 달성 축하드려요! 최고최고!!")
    @Size(max = 255)
    private String context;
}
