package com.mm.greenstep.domain.plogging.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;


@Builder
@Getter
public class PloggingAllLogResDto {
    private Long travelTime;
    private Double travelRange;
    private Integer trashAmount;
}
