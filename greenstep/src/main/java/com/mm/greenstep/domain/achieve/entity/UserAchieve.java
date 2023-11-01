package com.mm.greenstep.domain.achieve.entity;

import com.mm.greenstep.domain.user.entity.User;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Table(name = "user_achieve")
public class UserAchieve {
    @Id
    @Column(name = "my_achieve_id", nullable = false)
    private Long myAchieveId;

    @ManyToOne
    @JoinColumn(name = "achieve_id")
    private Achieve achieve;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JoinColumn(name = "is_breaked")
    private Boolean isBreaked;

    @JoinColumn(name = "created_at")
    private LocalDate createdAt;
}