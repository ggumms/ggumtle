package com.ggums.ggumtle.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ggums.ggumtle.entity.ReminderDate;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter @Setter @Builder
public class GetBucketResponseDto {

    @Schema(description = "작성자 id", example = "1")
    private Long writerId;
    @Schema(description = "연관된 후기 id", example = "1", nullable = true)
    private Long reviewId;
    @Schema(description = "버킷 제목", example = "구독자분들과 팬미팅 진행하기")
    private String title;
    @Schema(description = "타임캡슐", example = "20만이 되면 얼마나 좋을까.. 나는야 뽀시래기.. 20만이 되어도 초심을 잃지 말고 그때의 감사한 마음을 담아 구독자분들께 그대로 돌려드리자.")
    private String timeCapsule;
    @Schema(description = "버킷 사진 URL", example = "(호스트 서버 주소)/image/bucketImage/(이미지명).png")
    private String bucketPicture;
    @Schema(description = "버킷 색상", example = "lightGreen")
    private String color;
    @Schema(description = "리마인드 주기", example = "twoWeeks")
    private ReminderDate reminderDate;
    @Schema(description = "위도", example = "23.452")
    private Double latitude;
    @Schema(description = "경도", example = "143.213")
    private Double longitude;
    @Schema(description = "위치 주소", example = "용산 파크랜드")
    private String address;
    @Schema(description = "경과 날짜", example = "369")
    private Long dayCount;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Schema(description = "버킷 달성 날짜", example = "2023-01-01", type = "string")
    private LocalDate achievementDate;
    @ArraySchema(arraySchema = @Schema(description = "버킷 카테고리", example = "[\"휴식\",\"여행\", \"인간관계\"]"))
    private List<String> category;
    @Schema(description = "비공개 여부", example = "false")
    private Boolean isPrivate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Schema(description = "버킷 생성 날짜", example = "2023-07-05", type = "string")
    private LocalDate createdDate;
}
