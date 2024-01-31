package com.ggums.ggumtle.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @Builder
public class RadarBucketDto {

    private Long bucketId;
    private String title;
    private String bucketPicture;
    private String color;
}
