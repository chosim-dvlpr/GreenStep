package com.mm.greenstep.domain.common.config;

import com.mm.greenstep.domain.common.jwt.JwtAuthenticationFilter;
import com.mm.greenstep.domain.common.jwt.JwtTokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


/**
 * 스프링 시큐리티의 보안 설정 정의
 * */
@Configuration  // 스프링이 설정으로 인식
@EnableWebSecurity// (debug = true)    //시큐리티 활성화(보안 관련 디버그 정보 로깅)
public class SecurityConfig {

    // JWT에 의존하여 생성 및 검증하는 기능을 제공
    private final JwtTokenProvider jwtTokenProvider;
/*    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

    public SecurityConfig(JwtTokenProvider jwtTokenProvider, CustomOAuth2UserService customOAuth2UserService, OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler, OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.customOAuth2UserService = customOAuth2UserService;
        this.oAuth2AuthenticationSuccessHandler = oAuth2AuthenticationSuccessHandler;
        this.oAuth2AuthenticationFailureHandler = oAuth2AuthenticationFailureHandler;
    }
*/

    public SecurityConfig(JwtTokenProvider jwtTokenProvider ) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

/*
    @Bean
    public HttpCookieOAuth2AuthorizationRequestRepository cookieOAuth2AuthorizationRequestRepository() {
        return new HttpCookieOAuth2AuthorizationRequestRepository();
    }
*/

    // BCrypt알고리즘을 통해 비밀번호 인코더 빈으로 등록 -> 비밀번호 해싱에 사용
    @Bean
    public BCryptPasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    // 보안 필터 체인 구성
    // HttpSecurity객체를 사용하여 HTTP보안 세부 설정 가능
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                //CSRF방지 기능 비활성화 -> REST API구축시 보통 비활성화
                .csrf().disable()
                // 세션 생성X -> JWT는 상태를 유지하지 않는 방식임
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                // 폼 기반 로그인 비활성화
                .formLogin().disable()
                // 기본 인증 방식 비활성화
                .httpBasic().disable()

                /** 요청에 대한 접근 제어 설정 */
                .authorizeRequests()
                // 아래 경로에 대해 모든 사용자 접근 가능하도록 설정
                .antMatchers ("/user/**", "/login/**", "/oauth2/**").permitAll ()
                .and()

//                .oauth2Login()
//                .authorizationEndpoint().baseUri("/oauth2/authorize")
//                .authorizationRequestRepository(cookieOAuth2AuthorizationRequestRepository())
//                .and()
//                .redirectionEndpoint()
//                .baseUri("/login/oauth2/code/**")
//                .and()
//                .userInfoEndpoint().userService(customOAuth2UserService)
//                .and()
//                .successHandler(oAuth2AuthenticationSuccessHandler)
//                .failureHandler(oAuth2AuthenticationFailureHandler)
//                .and()
                // JWT검사를 통해 사용자의 인증정보를 SecurityContext에 저장하는 역할
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}