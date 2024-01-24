package com.ggums.ggumtle.dto.request;

import com.ggums.ggumtle.entity.Gender;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class UserUpdateRequestDto {

    @Schema(example = "화이팅 10기")
    @Size(max = 255, message = "닉네임 크기가 초과하였습니다.")
    private String userNickname;

    @Schema(example = "2024-01-13")
    private LocalDate birthDate;
    @Schema(example = "Female")
    private Gender gender;

    @Schema(example = "[\"취업\",\"여행\",\"인간관계\"]")
    private List<String> category;
}
