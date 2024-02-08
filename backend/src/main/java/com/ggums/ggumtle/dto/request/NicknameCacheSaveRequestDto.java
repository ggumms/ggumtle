package com.ggums.ggumtle.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class NicknameCacheSaveRequestDto {

    @NotNull(message = "필수 정보입니다.")
    @Size(max = 50, message = "notEmailFormat")
    @Pattern(regexp = "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$", message = "notEmailFormat")
    private String userEmail;

    @Schema(example = "화이팅 10기")
    @Size(max = 255, message = "닉네임 크기가 초과하였습니다.")
    private String userNickname;
}
