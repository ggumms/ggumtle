package com.ggums.ggumtle.dto.response;

import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Builder
public class ReviewResponseDto {
    // user
    private Long writerId;
    private String writerProfileImage;
    private String writerNickname;
//    private String representativeBucketTitle;
//    private Boolean isAchieved; // null 값일 수 있으므로 래퍼 클래스로 선언
//    private int daysSinceDream;

    // bucket
    private String bucketTitle;

    // review
    private String reviewTitle;
    private String reviewContext;
    private LocalDateTime reviewCreatedDate;
    private LocalDateTime reviewUpdatedDate;
//    private List<String> categories;
//    private Map<String, Integer> reactionCounts;
//    private String myReaction;

    // comment
}
