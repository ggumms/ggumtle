package com.ggums.ggumtle.entity;


import com.ggums.ggumtle.common.entity.BaseTime;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentBucket extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private String context;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bucket_id")
    private Bucket bucket;

    @OneToMany(mappedBy = "commentBucket", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommentBucketLike> commentBucketLikes;

    public void update(String context) {
        this.context = context;
    }

}

