package com.ggums.ggumtle.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter @Setter @Builder @Entity
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Alarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "receiver_id")
    private User receiver;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "sender_id")
    private User sender;

    @Column(length = 1000)
    private String context;

    @Builder.Default
    private Boolean isRead = false;

    @Enumerated(EnumType.STRING)
    private AlarmType type;

    private Long dataId;

    @Column(nullable = false)
    @CreatedDate
    private LocalDateTime createdDate;
}
