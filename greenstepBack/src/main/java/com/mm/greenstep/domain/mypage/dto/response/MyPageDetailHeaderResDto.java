package com.mm.greenstep.domain.mypage.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MyPageDetailHeaderResDto {
    private String nickname;
    private Integer level;
    private Integer exp;
}
