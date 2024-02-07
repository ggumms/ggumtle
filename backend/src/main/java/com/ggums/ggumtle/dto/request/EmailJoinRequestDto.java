package com.ggums.ggumtle.dto.request;

import com.ggums.ggumtle.entity.Gender;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class EmailJoinRequestDto {

    @NotNull(message = "필수 정보입니다.")
    @Size(max = 50, message = "notEmailFormat")
    @Pattern(regexp = "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$", message = "notEmailFormat")
    private String userEmail;

    @NotNull(message = "필수 정보입니다.")
    @Size(min = 8, max = 64, message = "비밀번호 사이즈가 맞지 않습니다.")
    @Pattern(regexp = "^[a-zA-Z0-9!@#$%^&*()_+{}\\[\\]:;<>,.?~\\\\/-]{8,64}$", message = "notPasswordFormat")
    private String userPassword;

    @Schema(example = "화이팅 10기")
    @Size(max = 255, message = "닉네임 크기가 초과하였습니다.")
    private String userNickname;

    @Schema(example = "2023-07-03")
    private LocalDate birthDate;
    @Schema(example = "Male")
    private Gender gender;

    @Schema(example = "[\"취업\",\"여행\",\"인간관계\"]")
    private List<String> category;
}
