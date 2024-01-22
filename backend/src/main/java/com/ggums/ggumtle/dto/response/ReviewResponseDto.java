package com.ggums.ggumtle.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@Builder
public class ReviewResponseDto {

    private String reviewTitle;
    private String reviewContext;
    private LocalDateTime reviewCreatedDate;
    private LocalDateTime reviewUpdatedDate;

}