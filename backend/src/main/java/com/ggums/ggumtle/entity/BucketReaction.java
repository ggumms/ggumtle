package com.ggums.ggumtle.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BucketReaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "bucket_id")
    private Bucket bucket;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String reaction;
}
