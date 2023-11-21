package com.mm.greenstep.domain.plogging.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PloggingCoorResDto {
    private String longitude; // 경도
    private String latitude; // 위도
}
