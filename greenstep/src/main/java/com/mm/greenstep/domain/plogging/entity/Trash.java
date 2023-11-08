package com.mm.greenstep.domain.plogging.entity;

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
@Table(name = "trash")
public class Trash {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trash_id")
    private Long trashId;

    @ManyToOne
    @JoinColumn(name = "plogging_id")
    private Plogging plogging;

    @Column(name = "trash_count")
    private Long trashCount;

    @Column(name = "latitude", nullable = false)
    private String latitude;

    @Column(name = "longitude", nullable = false)
    private String longitude;

    @Column(name = "is_picture", nullable = false)
    private Boolean isPicture;

    @Column(name = "trash_picture")
    private String trashPicture;

    @Column(name = "trash_type")
    private Byte trashType;
}