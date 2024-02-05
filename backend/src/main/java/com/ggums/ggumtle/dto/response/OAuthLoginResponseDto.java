package com.ggums.ggumtle.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ggums.ggumtle.entity.OAuthLoginStatus;
import lombok.*;

@Getter @Setter @Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OAuthLoginResponseDto {
    private OAuthLoginStatus status;
    private String userNickname;
    private String userProfile;
    private String userEmail;
    private String authorizationCode;
}