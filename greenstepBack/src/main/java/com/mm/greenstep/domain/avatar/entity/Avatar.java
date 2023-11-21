package com.mm.greenstep.domain.avatar.entity;

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
@Table(name = "avatar")
public class Avatar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "box_id")
    private Long boxId;

    @Column(name = "avatar_name")
    private String avatarName;

    @Column(name = "avatar_img")
    private String avatarImg;

    @Column(name = "avatar_type")
    private Integer avatarType;
}
