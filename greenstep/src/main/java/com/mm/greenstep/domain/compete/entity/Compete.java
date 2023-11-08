package com.mm.greenstep.domain.compete.entity;

import com.mm.greenstep.domain.user.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.YearMonth;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "compete")
public class Compete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "compete_id")
    private Long competeId;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @ManyToOne
    @JoinColumn(name = "victory_id")
    private Victory victory;

    @Column(name = "compete_score", nullable = false)
    private Integer competeScore;

    @Column(name = "compete_time", nullable = false)
    private Long competeTime;

    @Column(name = "compete_range", nullable = false)
    private Double competeRange;

    @Column(name = "compete_amount", nullable = false)
    private Double competeAmount;



    @PrePersist
    public void prePersist() {
        this.competeScore = 0;
        this.competeTime = 0L;
        this.competeRange = 0.0;
        this.competeAmount = 0.0;
    }

    public void updateCompete(int travelRange, int travelTime, int trashAmount, int score){
        this.competeTime += travelTime;
        this.competeRange += travelRange;
        this.competeAmount += trashAmount;
        // 한번의 플로깅으로 얻을 수 있는 점수 제한
        this.competeScore += score;
    }

}
