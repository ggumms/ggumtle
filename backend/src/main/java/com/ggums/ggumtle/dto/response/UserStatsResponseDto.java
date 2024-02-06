package com.ggums.ggumtle.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @Builder
public class UserStatsResponseDto {

    @Schema(example = "35", description = "달성률")
    private int achieveRate;
    @Schema(example = "97", description = "팔로워 수")
    private int follower;
    @Schema(example = "87", description = "팔로잉 수")
    private int following;
}
