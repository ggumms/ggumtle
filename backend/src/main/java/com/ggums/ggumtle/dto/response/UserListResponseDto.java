package com.ggums.ggumtle.dto.response;

import com.ggums.ggumtle.dto.response.model.UserListDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

@Getter @Setter @Builder
public class UserListResponseDto {
    Page<UserListDto> searchList;
}
