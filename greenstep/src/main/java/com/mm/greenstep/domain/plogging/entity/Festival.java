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
@Table(name = "festival")
public class Festival {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "festival_id")
    private Long festivalId;

    @Column(name = "festival_name")
    private String festivalName;

    @Column(name = "festival_url")
    private String festivalUrl;
}
