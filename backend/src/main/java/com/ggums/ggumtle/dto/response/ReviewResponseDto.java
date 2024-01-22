package com.ggums.ggumtle.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@Builder
public class ReviewResponseDto {
    // bucket
//    private String bucketTitle;

    // user
//    private Long writerId;
//    private String writerProfileImage;
//    private String writerNickname;

//    private String representativeBucketTitle;
//    private Boolean isAchieved; // null 값일 수 있으므로 래퍼 클래스로 선언
//    private int daysSinceDream;

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