package com.ggums.ggumtle.dto.response.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @Builder
public class UserListDto {

    @Schema(description = "사용자 id", example = "1")
    private Long userId;
    @Schema(description = "프로필 이미지", example = "(호스트 서버 주소)/image/userProfile/(이미지명).png")
    private String userProfileImage;
    @Schema(description = "사용자 별명", example = "서준호")
    private String userNickname;
    @Schema(description = "팔로우 여부", example = "null", nullable = true)
    private Boolean isFollowing;
    @Schema(description = "대표버킷 id", example = "null", nullable = true)
    private Long bucketId;
    @Schema(description = "대표버킷 제목", example = "null", nullable = true)
    private String bucketTitle;
    @Schema(description = "대표버킷 색상", example = "null", nullable = true)
    private String bucketColor;
    @Schema(description = "대표버킷 달성 여부", example = "null", nullable = true)
    private Boolean isAchieved;
}
