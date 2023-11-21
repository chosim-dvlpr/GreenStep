package com.mm.greenstep.domain.plogging.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TrashBoxAllResDto {
    private Byte type;
    private String longitude; // 경도
    private String latitude; // 위도
}
