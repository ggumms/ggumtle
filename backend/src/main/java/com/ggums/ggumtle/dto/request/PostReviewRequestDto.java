package com.ggums.ggumtle.dto.request;

import lombok.Getter;

@Getter
public class PostReviewRequestDto {
    private Long bucketId;
    private String title;
    private String context;
}
