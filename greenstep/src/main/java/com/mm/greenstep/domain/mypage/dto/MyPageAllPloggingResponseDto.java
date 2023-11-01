package com.mm.greenstep.domain.mypage.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MyPageAllPloggingResponseDto {
    private Double travelRange;
    private Long travelTime;
    private Long trashAmount;
}
