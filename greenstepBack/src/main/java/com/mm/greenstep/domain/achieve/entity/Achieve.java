package com.mm.greenstep.domain.achieve.entity;

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
@Table(name = "achieve")
public class Achieve {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "achieve_id", nullable = false)
    private Long achieveId;

    @Column(name = "achieve_name", nullable = false, length = 20)
    private String achieveName;

    @Column(name = "achieve_distance")
    private Double achieveDistance;

    @Column(name = "achieve_trash")
    private Integer achieveTrash;

    @Column(name = "achieve_time")
    private Long achieveTime;

    @Column(name = "achieve_count")
    private Integer achieveCount;

    @Column(name = "achieve_type", nullable = false)
    private Byte achieveType;
}
