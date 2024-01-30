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

    // writer
    private UserListDto writer;

    // bucket
    private Long bucketId;
    private String bucketTitle;
    private long daysSinceDream;

    // review
    private String reviewTitle;
    private String reviewContext;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime reviewCreatedDate;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime reviewUpdatedDate;
    private List<String> categories;
}