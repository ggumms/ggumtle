package com.ggums.ggumtle.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class PasswordChangeRequestDto {

    @NotNull(message = "필수 정보입니다.")
    @Size(min = 8, max = 64, message = "비밀번호 사이즈가 맞지 않습니다.")
    @Pattern(regexp = "^[a-zA-Z0-9!@#$%^&*()_+{}\\[\\]:;<>,.?~\\\\/-]{8,64}$", message = "notPasswordFormat")
    private String userPassword;

    @NotNull(message = "필수 정보입니다.")
    @Size(min = 8, max = 64, message = "비밀번호 사이즈가 맞지 않습니다.")
    @Pattern(regexp = "^[a-zA-Z0-9!@#$%^&*()_+{}\\[\\]:;<>,.?~\\\\/-]{8,64}$", message = "notPasswordFormat")
    private String changedPassword;
}
