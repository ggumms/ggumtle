package com.ggums.ggumtle.dto.response;

import com.ggums.ggumtle.dto.response.model.AlarmDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

@Getter @Setter @Builder
public class AlarmResponseDto {

    private Page<AlarmDto> alarmList;
}
