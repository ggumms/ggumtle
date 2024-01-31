package com.ggums.ggumtle.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter @Builder
public class UserInfoResponseDto {

    @Schema(description = "사용자 id", example = "1")
    private Long userId;
    private String userProfileImage;
    private String userNickname;
    private List<String> category;
    private Long bucketId;
    private String bucketTitle;
    private Long dayCount;
    private String color;
    private Boolean isAchieved;
    private Boolean owner;
    private Boolean isFollowing;
}
