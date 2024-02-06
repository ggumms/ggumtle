package com.ggums.ggumtle.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Authentication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "authentication")
    @JoinColumn(name = "user_id")
    private User user;

    private String userEmail;

    private String userEmailPassword;

    private String userKakao;

    private String userGoogle;
}