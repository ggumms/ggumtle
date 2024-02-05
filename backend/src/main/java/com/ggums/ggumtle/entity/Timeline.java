package com.ggums.ggumtle.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter @Builder @Entity
@NoArgsConstructor
@AllArgsConstructor
public class Timeline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private TimelineType type;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bucket_id")
    private Bucket bucket;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id")
    private Review review;

    private Boolean isAchieved;

    private Boolean isPrivate;

    @Column(nullable = false)
    private LocalDateTime createdDate;
}
