package com.mm.greenstep.domain.mypage.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MyPageDetailStreakResponseDto {
    private Integer month;
    private Integer weekly;
    private Long count;
}
