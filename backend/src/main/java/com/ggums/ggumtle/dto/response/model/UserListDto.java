package com.ggums.ggumtle.dto.response.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @Builder
public class UserListDto {
    private Long userId;
    private String userProfileImage;
    private String userNickname;
    private Boolean isFollowing;
    private Long bucketId;
    private String bucketTitle;
    private String bucketColor;
    private Boolean bucketAchievement;
}
