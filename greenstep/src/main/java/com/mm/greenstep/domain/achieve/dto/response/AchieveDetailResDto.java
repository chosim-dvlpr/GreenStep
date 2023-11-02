package com.mm.greenstep.domain.achieve.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class AchieveDetailResDto {
    private Long boxId;
    private String achieveName;
    private String achieveImg;
    private LocalDate createdAt;
    private Byte achieveType;
    private Integer progresses;
}
