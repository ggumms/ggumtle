package com.ggums.ggumtle.dto.response.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ggums.ggumtle.entity.TimelineType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter @Builder
public class TimelineDto {

    @Schema(description = "버킷 or 후기 아이디", example = "1")
    private Long id;

    @Schema(description = "타임라인 타입", example = "BUCKET or REVIEW")
    private TimelineType type;

    @Schema(description = "달성 여부", example = "true")
    private Boolean isAchieved;

    @Schema(description = "버킷 or 후기 제목", example = "오로라 보기")
    private String title;

    @Schema(description = "후기 내용", example = "<p>모찌</p> or type이 BUCKET일 경우는 NULL", nullable = true)
    private String context;

    @Schema(description = "미달성 : 경과 시간 or 달성 : 걸린 시간", example = "17")
    private Long day;

    @Schema(description = "버킷 색깔", example = "lightGreen")
    private String color;

    @Schema(description = "버킷 이미지 or 후기 이미지들", example = "null")
    private List<String> images;

    @Schema(description = "버킷 카테고리", example = "[여행, 인간관계]")
    private List<String> categories;

    @Schema(description = "버킷 or 후기 리액션 수", example = "45")
    private int reactionCount;

    @Schema(description = "버킷 or 후기 댓글 수", example = "3")
    private int commentCount;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Schema(description = "만든날짜", example = "2024-02-02")
    private LocalDate createdDate;
}
