package com.ggums.ggumtle.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ggums.ggumtle.dto.response.model.UserListDto;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class ReviewResponseDto {

    // writer
    @Schema(description = "작성자 정보 : isFollowing은 항상 null, 대표버킷 없는 경우에는 관련 필드 null")
    private UserListDto writer;

    // bucket
    @Schema(description = "연관된 버킷 id", example = "1")
    private Long bucketId;
    @Schema(description = "연관된 버킷 제목", example = "구독자분들과 팬미팅 진행하기")
    private String bucketTitle;
    @Schema(description = "경과 날짜", example = "369")
    private long daysSinceDream;

    // review
    @Schema(description = "후기 제목", example = "버킷 1의 후기")
    private String reviewTitle;
    @Schema(description = "후기 내용", example = "<p>구독자들 짱 많아요!</p>")
    private String reviewContext;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    @Schema(description = "후기 생성 시간", example = "2024-01-26 12:54", type = "string")
    private LocalDateTime reviewCreatedDate;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    @Schema(description = "후기 수정 시간", example = "2024-01-26 12:54", type = "string")
    private LocalDateTime reviewUpdatedDate;
    @ArraySchema(arraySchema = @Schema(description = "후기 카테고리", example = "[\"여행\",\"인간관계\", \"취업\"]"))
    private List<String> categories;
}