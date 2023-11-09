package com.mm.greenstep.domain.achieve.entity;

import com.mm.greenstep.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Builder
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
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

    @Column(name = "is_breaked")
    private Boolean isBreaked;

    @Column(name = "created_at")
    private LocalDate createdAt;

    public void updateisBreaked() {
        this.isBreaked = true;
        this.createdAt = LocalDate.now();
    }

    @PrePersist
    public void prePersist(){
        this.isBreaked = false;
    }
}