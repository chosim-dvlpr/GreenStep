package com.mm.greenstep.domain.plogging.dto.request;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class PloggingReqDto {
    private Double travelTime;
    private Double travelRange;
    private Integer AITrashAmount; // AI 찍은 쓰레기 수
    private Integer trashAmount; // 일반 쓰레기 봉투수

    // 플로깅 종료까지의 이동거리 위도, 경도 리스트
    private List<PloggingCoorReqDto> coorList;

    // 플로깅 하며 주운 쓰레기의 타입과 위도, 경도 리스트
    private List<PloggingTrashReqDto> trashList;
}
