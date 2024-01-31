package com.ggums.ggumtle.dto.response.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ReviewSearchListDto {

    // review
    @Schema(description = "후기 id", example = "1")
    private Long reviewId;
    @Schema(description = "후기 제목", example = "버킷 1의 후기")
    private String reviewTitle;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    @Schema(description = "후기 생성 시간", example = "2024-01-26 12:54", type = "string")
    private LocalDateTime reviewCreatedDate;
    @Schema(description = "후기에 달린 리액션 개수", example = "2")
    private int reviewReactionCount;
    @Schema(description = "후기에 달린 댓글 개수", example = "3")
    private int reviewCommentCount;

    // bucket
    @Schema(description = "연관된 버킷 id", example = "1")
    private Long bucketId;
    @Schema(description = "연관된 버킷 제목", example = "구독자분들과 팬미팅 진행하기")
    private String bucketTitle;
    @Schema(description = "연관된 버킷 색상", example = "red")
    private String bucketColor;
    @Schema(description = "경과 날짜", example = "369")
    private long daysSinceDream;

    // writer
    @Schema(description = "사용자 id", example = "1")
    private Long writerId;
    @Schema(description = "사용자 별명", example = "서준호")
    private String writerNickname;
    @Schema(description = "프로필 이미지", example = "(호스트 서버 주소)/image/reviewImage/(이미지명).png")
    private String writerProfileImage;
}
