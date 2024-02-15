package com.ggums.ggumtle.dto.response.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter @Setter @Builder
public class BucketSearchListDto {

    @Schema(description = "버킷 id", example = "1")
    private Long bucketId;
    @Schema(description = "버킷 제목", example = "구독자분들과 팬미팅 진행하기")
    private String title;
    @Schema(description = "경과 날짜", example = "369")
    private Long dayCount;
    @ArraySchema(arraySchema = @Schema(description = "버킷 카테고리", example = "[\"휴식\",\"여행\", \"인간관계\"]"))
    private List<String> category;
    @Schema(description = "후기에 달린 리액션 개수", example = "2")
    private int reactionCount;
    @Schema(description = "후기에 달린 댓글 개수", example = "3")
    private int commentCount;
    @Schema(description = "버킷 색상", example = "lightGreen")
    private String color;
    @Schema(description = "버킷 달성 여부", example = "false")
    private Boolean isAchieved;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Schema(description = "버킷 생성 날짜", example = "2023-07-05", type = "string")
    private LocalDate createdDate;
}
