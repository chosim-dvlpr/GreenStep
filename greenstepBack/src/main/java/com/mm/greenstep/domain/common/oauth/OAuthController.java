package com.mm.greenstep.domain.common.oauth;

import com.mm.greenstep.domain.compete.entity.Victory;
import com.mm.greenstep.domain.compete.repository.VictoryRepository;
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
    private final VictoryRepository victoryRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody String accessToken) {
        String kakaoId = oAuthService.findKakaoId(accessToken);

        return oAuthService.findUserByKakaoId(kakaoId);
    }

    @GetMapping("/test")
    public String test(){
        Victory victory = victoryRepository.findById(1).orElseThrow();
        System.out.println(victory.getVictoryMonth().getYear());
        System.out.println(victory.getVictoryMonth().getMonth());
        System.out.println(victory.getVictoryMonth().getDayOfYear());
        System.out.println(victory.getVictoryMonth().getDayOfMonth());

        return null;
    }

}
