package com.ggums.ggumtle.dto.response;

import com.ggums.ggumtle.dto.response.model.AlarmListDto;
import com.ggums.ggumtle.entity.AlarmType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

@Getter @Setter @Builder
public class AlarmResponseDto {

    private Page<AlarmListDto> alarmList;
}
