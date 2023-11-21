package com.mm.greenstep.domain.plogging.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TrashDataAllResDto {
    private String longitude; // 경도
    private String latitude; // 위도
    private Byte trashType; // 쓰레기타입
}
