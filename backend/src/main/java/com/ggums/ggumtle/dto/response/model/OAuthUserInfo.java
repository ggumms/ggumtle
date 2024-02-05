package com.ggums.ggumtle.dto.response.model;

import lombok.*;

@Getter @Setter @Builder
public class OAuthUserInfo {
    private String userNickname;
    private String userProfile;
    private String userEmail;
}
