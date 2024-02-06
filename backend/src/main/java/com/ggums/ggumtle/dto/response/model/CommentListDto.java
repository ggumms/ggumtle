package com.ggums.ggumtle.dto.response.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class CommentListDto {

    @Schema(example = "1", description = "댓글 id")
    private long id;
    @Schema(example = "10만이 엊그제 같은데... 벌써 20만이라니...", description = "댓글 내용")
    private String context;
    @Schema(description = "댓글 작성자 정보")
    private UserListDto writer;
    @Schema(example = "1", description = "댓글 좋아요 개수(0 이면 false 1이면 true")
    private long numberOfLikes;
    @Schema(example = "min", description = "시간 단위")
    private String timeUnit;
    @Schema(example = "3", description = "시간 수")
    private long time;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    @Schema(example = "2023-12-29 10:34", description = "댓글 생성 시간", type = "string")
    private LocalDateTime createdDate;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    @Schema(example = "2023-12-29 10:34", description = "댓글 삭제 시간", type = "string")
    private LocalDateTime updatedDate;
}
