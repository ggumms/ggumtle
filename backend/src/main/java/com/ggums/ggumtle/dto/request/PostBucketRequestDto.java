package com.ggums.ggumtle.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.Getter;

import java.util.List;

@Getter
public class PostBucketRequestDto {
    @Schema(example = "구독자분들과 팬미팅 진행하기")
    @Size(max = 255, message = "제목 크기를 초과하였습니다.")
    private String title;

    @Schema(example = "20만이 되면 얼마나 좋을까.. 나는야 뽀시래기.. 20만이 되어도 초심을 잃지 말고 그때의 감사한 마음을 담아 구독자분들께 그대로 돌려드리자.")
    @Size(max = 255, message = "타임캡슐 크기를 초과하였습니다.")
    private String timeCapsule;

    @Schema(example = "23.452")
    private Long latitude;
    @Schema(example = "143.213")
    private Long longitude;

    @Schema(example = "dream green")
    @Size(max = 255, message = "색 글자 크기를 초과하였습니다.")
    private String color;

    @Schema(example = "용산 파크랜드")
    @Size(max = 255, message = "한글 주소 크기를 초과하였습니다.")
    private String address;

    @Schema(example = "[\"취업\",\"여행\",\"인간관계\"]")
    private List<String> category;

    @Schema(example = "false")
    private Boolean isPrivate;
}
