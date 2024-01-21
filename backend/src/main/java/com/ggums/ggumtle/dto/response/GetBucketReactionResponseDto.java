package com.ggums.ggumtle.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter @Setter @Builder
public class GetBucketReactionResponseDto {
    private String userReaction;
    private Map<String, Integer> reactionCounts;
}
