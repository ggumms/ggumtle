package com.ggums.ggumtle.dto.response;

import com.ggums.ggumtle.entity.AlarmType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @Builder
public class AlarmResponseDto {

    private Long alarmId;
    private String sender;
    private String senderProfileImage;
    private String timeUnit;
    private Long time;
    private Boolean isRead;
    private String context;
    private AlarmType type;
    private Long dataId;
}
