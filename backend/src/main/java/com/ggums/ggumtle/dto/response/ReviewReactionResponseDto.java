package com.ggums.ggumtle.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
@Builder
public class ReviewReactionResponseDto {
    private Map<String, Integer> reactionCounts;
    private String myReaction;
}
