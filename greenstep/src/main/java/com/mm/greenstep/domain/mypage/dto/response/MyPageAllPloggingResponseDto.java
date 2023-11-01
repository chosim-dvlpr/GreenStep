package com.mm.greenstep.domain.mypage.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MyPageAllPloggingResponseDto {
    private Double travelRange;
    private Double travelTime;
    private Integer trashAmount;
}
