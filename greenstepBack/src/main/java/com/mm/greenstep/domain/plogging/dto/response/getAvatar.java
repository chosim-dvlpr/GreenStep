package com.mm.greenstep.domain.plogging.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class getAvatar {
    private String avatarImg;
    private String avatarName;
}
