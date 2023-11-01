package com.mm.greenstep.domain.mypage.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MyPageDetailStreakResponseDto {
    private Integer month;
    private Integer weekly;
    private Integer count;
}
