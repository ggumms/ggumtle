package com.ggums.ggumtle.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class PostReviewRequestDto {
    @Schema(description = "연관된 버킷 id", example = "1")
    private Long bucketId;

    @Schema(description = "후기 제목", example = "구독자분들과 팬미팅 진행하기")
    @Size(max = 100, message = "제목 크기를 초과하였습니다.")
    private String title;

    @Schema(description = "후기 내용", example = "<p>구독자들 짱 많아요!</p>")
    private String context;
}
