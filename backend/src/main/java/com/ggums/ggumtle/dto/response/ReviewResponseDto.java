package com.ggums.ggumtle.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class ReviewResponseDto {

    // bucket
    private Long bucketId;
    private String bucketTitle;
    private long daysSinceDream;

    // user
    private Long writerId;
    private String writerProfileImage;
    private String writerNickname;
    private Long repBucketId;
    private String repBucketTitle;
    private Boolean isRepBucketAchieved;

    // review
    private String reviewTitle;
    private String reviewContext;
    private LocalDateTime reviewCreatedDate;
    private LocalDateTime reviewUpdatedDate;
    private List<String> categories;
}