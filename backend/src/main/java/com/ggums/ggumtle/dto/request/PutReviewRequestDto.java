package com.ggums.ggumtle.dto.request;

import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class PutReviewRequestDto {
    @Size(max = 100, message = "제목 크기를 초과하였습니다.")
    private String title;

    private String context;
}
