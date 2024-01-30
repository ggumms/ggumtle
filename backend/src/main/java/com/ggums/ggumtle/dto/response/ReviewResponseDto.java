package com.ggums.ggumtle.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ggums.ggumtle.dto.response.model.UserListDto;
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
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime reviewCreatedDate;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime reviewUpdatedDate;
    private List<String> categories;
}