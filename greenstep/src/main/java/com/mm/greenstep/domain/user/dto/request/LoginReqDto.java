package com.mm.greenstep.domain.user.dto.request;

import lombok.Getter;

@Getter
public class LoginReqDto {
    private String kakaoId;
    private String userPW;
}
