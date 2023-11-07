package com.mm.greenstep.domain.avatar.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AvatarAllResDto {
    private Long boxId;
    private String avatarImg;
    private String avatarName;
    private Boolean isSelected;
}
