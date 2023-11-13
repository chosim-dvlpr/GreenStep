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
@Table(name = "festival", uniqueConstraints = {
        // 데이터베이스 선에서 중복방지
        @UniqueConstraint(columnNames = {"festival_name"})
})
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
