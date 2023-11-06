package com.mm.greenstep.domain.compete.entity;

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
@Table(name = "victory")
public class Victory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "victory_id")
    private Long victoryId;



}
