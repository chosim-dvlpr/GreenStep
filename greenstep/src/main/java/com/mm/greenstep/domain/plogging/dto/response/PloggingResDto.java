package com.mm.greenstep.domain.plogging.dto.response;

import lombok.Builder;
import lombok.Getter;


@Builder
@Getter
public class PloggingResDto {
    private Integer getExp;
    private Double travelTime;
    private Double travelRange;
    private Integer trashAmount;
    private Boolean isLevelUp; // true면 레벨업
    private String avatarName;
    private String avatarImg;
    private Long ploggingId;
}
