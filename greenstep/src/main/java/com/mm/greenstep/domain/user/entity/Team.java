package com.mm.greenstep.domain.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "team")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team")
    private Long teamId;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @Column(name = "team_avatar")
    private String teamAvatar;

    @Column(name = "score")
    private Integer score;

}
