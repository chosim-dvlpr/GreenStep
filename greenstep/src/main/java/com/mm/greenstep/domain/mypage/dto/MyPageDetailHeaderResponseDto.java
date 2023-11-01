package com.mm.greenstep.domain.mypage.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MyPageDetailHeaderResponseDto {
    private String nickname;
    private Integer level;
    private Long exp;
}
