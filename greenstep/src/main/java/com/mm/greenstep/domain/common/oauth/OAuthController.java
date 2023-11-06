package com.mm.greenstep.domain.common.oauth;

import com.mm.greenstep.domain.common.lib.Helper;
import com.mm.greenstep.domain.user.dto.request.UserReqDto;
import com.mm.greenstep.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/OAuth")
@RestController
public class OAuthController {

    private final OAuthService oAuthService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody String accessToken) {
        String kakaoId = oAuthService.findKakaoId(accessToken);

        return oAuthService.findUserByKakaoId(kakaoId);
    }
}
