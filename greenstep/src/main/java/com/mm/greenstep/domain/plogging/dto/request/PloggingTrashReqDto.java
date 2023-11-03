package com.mm.greenstep.domain.plogging.dto.request;

import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Builder
@Getter
public class PloggingTrashReqDto {
    private String longitude; // 경도
    private String latitude; // 위도
    private Byte trashType; // 쓰레기타입
    private String trashPicture; // 사진

}
