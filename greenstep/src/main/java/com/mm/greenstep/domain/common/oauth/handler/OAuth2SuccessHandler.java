package com.mm.greenstep.domain.common.oauth.handler;


import com.mm.greenstep.domain.common.config.RedisRepositoryConfig;
import com.mm.greenstep.domain.common.jwt.JwtTokenProvider;
import com.mm.greenstep.domain.user.dto.response.UserResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        // OAuth2User로 캐스팅하여 인증된 사용자 정보를 가져온다.
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        // 사용자 이메일을 가져온다.
        String userName = oAuth2User.getAttribute("userName");
        // 서비스 제공 플랫폼(GOOGLE, KAKAO, NAVER)이 어디인지 가져온다.
        String provider = oAuth2User.getAttribute("provider");

        // CustomOAuth2UserService에서 셋팅한 로그인한 회원 존재 여부를 가져온다.
        boolean isExist = oAuth2User.getAttribute("exist");

        // OAuth2User로 부터 Role을 얻어온다.
//        String role = oAuth2User.getAuthorities().stream().
//                findFirst() // 첫번째 Role을 찾아온다.
//                .orElseThrow(IllegalAccessError::new) // 존재하지 않을 시 예외를 던진다.
//                .getAuthority(); // Role을 가져온다.
        Collection<? extends GrantedAuthority> role = oAuth2User.getAuthorities();

        // 회원이 존재할경우
        if (isExist) {
            // 회원이 존재하면 jwt token 발행을 시작한다.
            UserResDto.TokenInfo token = jwtTokenProvider.generateToken(userName, role);
            log.info("jwtToken = {}", token.getAccessToken());

            // accessToken을 쿼리스트링에 담는 url을 만들어준다.
            String targetUrl = UriComponentsBuilder.fromUriString("https://k9b303.p.ssafy.io/user")
                    .queryParam("accessToken", token)
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString();
            log.info("redirect 준비");

            response.addHeader("Authorization", "Bearer " + token.getAccessToken());
            response.addHeader("Refresh-Token", token.getRefreshToken());

            // 4. RefreshToken Redis 저장 (expirationTime 설정을 통해 자동 삭제 처리)
            redisTemplate.opsForValue()
                    .set("RT:" + authentication.getName(),token.getRefreshToken(), token.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

            // 로그인 확인 페이지로 리다이렉트 시킨다.
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        } else {
            // 회원이 존재하지 않을경우, 서비스 제공자와 email을 쿼리스트링으로 전달하는 url을 만들어준다.
            String targetUrl = UriComponentsBuilder.fromUriString("https://k9b303.p.ssafy.io/user")
                    .queryParam("userName", userName)
                    .queryParam("provider", provider)
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString();
            // 회원가입 페이지로 리다이렉트 시킨다.
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        }
    }

}
