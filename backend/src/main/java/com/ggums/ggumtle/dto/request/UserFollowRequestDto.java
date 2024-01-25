package com.ggums.ggumtle.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

/**
 * @
 */
@Getter
public class UserFollowRequestDto {

    @Schema(example = "true")
    private Boolean isFollowing;

    @Schema(example = "2")
    private Long followee;
}
