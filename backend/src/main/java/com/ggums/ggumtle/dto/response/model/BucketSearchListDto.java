package com.ggums.ggumtle.dto.response.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter @Builder
public class BucketSearchListDto {
    private Long bucketId;
    private String title;
    private Long dayCount;
    private List<String> category;
    private int reactionCount;
    private int commentCount;
    private String color;
    private Boolean isAchieved;
}
