package com.mm.greenstep.domain.board.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AttendResDto {
    private Long userId;
    private String nickname;
    private String avatarImg;
}
