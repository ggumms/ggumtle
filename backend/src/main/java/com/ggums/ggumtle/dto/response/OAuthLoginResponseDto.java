package com.ggums.ggumtle.dto.response;

import com.ggums.ggumtle.entity.OAuthLoginStatus;
import lombok.*;

@Getter @Setter @Builder
public class OAuthLoginResponseDto {
    private OAuthLoginStatus status;
    private String userNickname;
    private String userProfile;
    private String userEmail;
}
