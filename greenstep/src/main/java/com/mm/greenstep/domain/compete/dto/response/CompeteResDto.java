package com.mm.greenstep.domain.compete.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CompeteResDto {
    private Integer myTeamScore;
    private Integer otherTeamScore;
    private Integer goalScore;
    private Long myTeamCompeteTime;
    private Double myTeamCompeteRange;
    private Double myTeamCompeteAmount;
}
