package com.mm.greenstep.domain.plogging.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;


@Builder
@Getter
public class PloggingAllResDto {
    private Integer getExp;
    private Double travelTime;
    private Double travelRange;
    private Integer trashAmount;
    private Long ploggingId;
    private LocalDateTime createdAt;
    private String travelPicture;
}
