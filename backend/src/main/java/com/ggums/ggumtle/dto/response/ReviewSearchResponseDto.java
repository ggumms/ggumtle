package com.ggums.ggumtle.dto.response;

import com.ggums.ggumtle.dto.response.model.ReviewSearchListDto;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

@Getter
@Builder
public class ReviewSearchResponseDto {


    Page<ReviewSearchListDto> searchList;
}
