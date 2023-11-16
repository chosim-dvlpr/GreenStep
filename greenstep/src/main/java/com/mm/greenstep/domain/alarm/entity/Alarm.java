package com.mm.greenstep.domain.alarm.entity;

import com.mm.greenstep.domain.compete.entity.Victory;
import com.mm.greenstep.domain.user.entity.Team;
import com.mm.greenstep.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "alarm")
public class Alarm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_id", nullable = false)
    private Long alarmId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "victory_id")
    private Victory victory;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "is_confirm")
    private Boolean isConfirm;

    @Column(name = "is_reward")
    private Boolean isReward;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @PrePersist
    public void prepersist(){
        this.isConfirm = false;
        this.createdAt = LocalDate.now();
    }

    public void updateConfirmAlarm(){
        this.isConfirm = true;
    }
}
