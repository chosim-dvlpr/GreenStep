package com.mm.greenstep.domain.common.oauth;

import com.mm.greenstep.domain.user.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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
