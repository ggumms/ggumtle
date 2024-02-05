package com.ggums.ggumtle.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ggums.ggumtle.dto.response.model.CommentListDto;
import com.ggums.ggumtle.dto.response.model.UserListDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;


@Builder
@Getter
@Setter
public class CommentResponseDto {

    private Page<CommentListDto> commentList;
}
