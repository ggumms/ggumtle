package com.ggums.ggumtle.dto.response.model;


import com.ggums.ggumtle.entity.AlarmType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AlarmDto {

    @Schema(description = "알람 id", example = "1")
    private Long alarmId;
    @Schema(description = "송신인", example = "서준호")
    private String sender;
    @Schema(description = "송신인 프로필 이미지", example = "(호스트 서버 주소)/image/userProfile/(이미지명).png")
    private String senderProfileImage;
    @Schema(description = "단위 시간", example = "min")
    private String timeUnit;
    @Schema(description = "시간 수", example = "3")
    private Long time;
    @Schema(description = "읽었는지 여부", example = "false")
    private Boolean isRead;
    @Schema(description = "알람 내용", example = "20만 달성 축하드려요! 최고최고!!")
    private String context;
    @Schema(description = "알람 타입", example = "commentBucket")
    private AlarmType type;
    //todo 해당 필드의 정체를 파악할 것.
    @Schema(description = "알람 id", example = "1")
    private Long dataId;
}
