package com.ggums.ggumtle.dto.response.model;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ReviewSearchListDto {

    // review
    private Long reviewId;
    private String reviewTitle;
    private LocalDateTime reviewCreatedDate;
    private int reviewReactionCount;

    // bucket
    private Long bucketId;
    private String bucketTitle;
    private String bucketColor;
    private long daysSinceDream;

    // writer
    private Long writerId;
    private String writerNickname;
    private String writerProfileImage;
}
