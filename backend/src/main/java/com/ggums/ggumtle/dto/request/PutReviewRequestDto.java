package com.ggums.ggumtle.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class PutReviewRequestDto {

    @Schema(description = "수정 제목", example = "버킷 1의 후기 수정")
    @Size(max = 100, message = "제목 크기를 초과하였습니다.")
    private String title;

    @Schema(description = "수정 내용", example = "<p>구독자들 별로 안 많아요...</p>")
    private String context;
}
