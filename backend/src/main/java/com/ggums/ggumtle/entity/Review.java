package com.ggums.ggumtle.entity;

import com.ggums.ggumtle.common.entity.BaseTime;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Review extends BaseTime {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @OneToOne
//    @JoinColumn(name = "bucket_id")
//    private Bucket bucket;

    private String title;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String context;

//    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL, orphanRemoval = true)
//    List<ReviewReaction> reviewReactions = new ArrayList<>();
}
