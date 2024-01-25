package com.ggums.ggumtle.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @Builder
public class UserStatsResponseDto {

    private int achieveRate;
    private int follower;
    private int following;
}
