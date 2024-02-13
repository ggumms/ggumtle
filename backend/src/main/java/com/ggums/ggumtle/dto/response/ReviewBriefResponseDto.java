package com.ggums.ggumtle.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReviewBriefResponseDto {

    @Schema(description = "게시된 후기 존재 여부", example = "false")
    private Boolean hasReview;
    @Schema(description = "임시저장글 존재 여부", example = "true")
    private Boolean hasTemp;
    @Schema(description = "후기 제목 or 임시저장글 없는 경우 null", example = "버킷 1의 후기")
    private String title;
    @Schema(description = "후기 내용 or 임시저장글 없는 경우 null", example = "<p>구독자들 짱 많아요!</p>")
    private String context;
}