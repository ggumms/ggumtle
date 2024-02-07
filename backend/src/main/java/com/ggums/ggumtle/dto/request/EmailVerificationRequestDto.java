package com.ggums.ggumtle.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class EmailVerificationRequestDto {

    @NotNull(message = "필수 정보입니다.")
    @Size(max = 50, message = "notEmailFormat")
    @Pattern(regexp = "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$", message = "notEmailFormat")
    private String email;

    @Size(min = 10, max = 10, message = "사이즈가 맞지 않습니다.")
    private String code;
}
