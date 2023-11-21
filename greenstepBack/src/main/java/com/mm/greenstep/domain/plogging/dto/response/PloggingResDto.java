package com.mm.greenstep.domain.plogging.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;


@Builder
@Getter
public class PloggingResDto {
    private Integer getExp;
    private Long travelTime;
    private Double travelRange;
    private Integer trashAmount;
    private Boolean isLevelUp; // true면 레벨업
    private String avatarName;
    private String avatarImg;
    private Long ploggingId;
    private List<getAvatar> getAvatarList;
}
