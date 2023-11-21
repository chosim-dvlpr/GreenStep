package com.mm.greenstep.domain.compete.dto.response;

import com.mm.greenstep.domain.user.entity.Team;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CompeteResDto {
    private Integer myTeamScore;
    private String myTeamName;
    private Integer otherTeamScore;
    private String otherTeamName;
    private Integer goalScore;
    private Long myTeamCompeteTime;
    private Double myTeamCompeteRange;
    private Double myTeamCompeteAmount;
    private Boolean isCompleted;
    private Team victoryTeam;
}
