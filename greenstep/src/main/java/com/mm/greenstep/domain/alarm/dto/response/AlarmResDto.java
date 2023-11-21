package com.mm.greenstep.domain.alarm.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class AlarmResDto {

    private Long alarmId;
    private String title;
    private String content;
    private Boolean isReward;
    private LocalDate createAt;

}
