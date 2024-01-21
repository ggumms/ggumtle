package com.ggums.ggumtle.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter @Builder
public class GetBucketResponseDto {
    private Long writerId;
    private Long reviewId;
    private String title;
    private String timeCapsule;
    private String bucketPicture;
    private String color;
    private Long latitude;
    private Long longitude;
    private String address;
    private Long dayCount;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate achievementDate;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime writeDate;
    private List<String> category;
    private Boolean isPrivate;
}
