package com.mm.greenstep.domain.user.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SignUpReqDto {
    private String kakaoId;
    private String userPW;
    private String nickName;
}
