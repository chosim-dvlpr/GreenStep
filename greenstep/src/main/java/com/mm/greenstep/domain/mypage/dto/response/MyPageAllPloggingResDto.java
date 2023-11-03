package com.mm.greenstep.domain.mypage.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MyPageAllPloggingResDto {
    private Double travelRange;
    private Double travelTime;
    private Integer trashAmount;
}
