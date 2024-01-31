package com.ggums.ggumtle.dto.response;

import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
@Builder
public class ReviewReactionResponseDto {

//    @Schema(implementation = Map.class, description = "리액션 종류와 개수", example = "{@ExampleObject(value = "")}")
    private Map<String, Integer> reactionCounts;
    @Schema(description = "요청한 사용자의 리액션", example = "멋져요", nullable = true)
    private String myReaction;
}
