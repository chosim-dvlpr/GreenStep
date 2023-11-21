package com.mm.greenstep.domain.achieve.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class AchieveDetailResDto {
    private String achieveName;
    private LocalDate createdAt;
    private Integer achieveTrashAmount; // 해당 업적 쓰레기 량
    private Double achieveTravelRange; // 해당 업적 이동거리
    private Long achieveTravelTime; // 해당 업적 이동시간
    private Integer achievePloggingCount; // 해당 업적 플로깅 횟수
    private Integer myTrashAmount; // 나의 총 쓰레기 량
    private Double myTravelRange; // 나의 총 이동거리
    private Long myTravelTime; // 나의 총 이동시간
    private Integer myPloggingCount; // 해당 업적 플로깅 횟수
}
