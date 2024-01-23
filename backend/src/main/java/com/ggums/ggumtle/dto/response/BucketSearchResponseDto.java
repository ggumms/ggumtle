package com.ggums.ggumtle.dto.response;

import com.ggums.ggumtle.dto.response.model.BucketSearchListDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

@Getter @Setter @Builder
public class BucketSearchResponseDto {
    Page<BucketSearchListDto> searchList;
}
