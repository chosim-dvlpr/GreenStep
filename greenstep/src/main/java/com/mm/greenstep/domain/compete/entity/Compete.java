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

    @Column(name = "compete_month")
    private YearMonth competeMonth;

    @Column(name = "compete_score", nullable = false)
    private Integer competeScore;

    @Column(name = "is_victory", nullable = false)
    private Boolean isVictory;

    @PrePersist
    public void prePersist() {
        this.competeMonth = YearMonth.from(LocalDateTime.now());
        this.isVictory = false;
        this.competeScore = 0;
    }

}
