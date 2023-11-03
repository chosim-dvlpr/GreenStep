package com.mm.greenstep.domain.achieve.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class AchieveDetailResDto {
    private String achieveName;
    private String achieveImg;
    private LocalDate createdAt;
    private Byte achieveType;
    private Integer progresses;
    private Integer achieveTrashAmount; // 해당 업적 쓰레기 량
    private Double achieveTravelRange; // 해당 업적 이동거리
    private Double achieveTravelTime; // 해당 업적 이동시간
    private Integer myTrashAmount; // 나의 총 쓰레기 량
    private Double myTravelRange; // 나의 총 이동거리
    private Double myTravelTime; // 나의 총 이동시간
}
