package com.mm.greenstep.domain.common.jwt;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;


/**
 * 들어오는 요청에서 JWT추출
 * 토큰을 검증이 유효할 경우 해당 사용자의 인증정보(Authentication)를
 * SpringSecurity의 SecurityContext에 설정
 * */
// GenericFilterBean을 상속받아 스프링의 필터 체인에 통합되도록 함
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    // 모든 서블릿 요청/응답에 대해 호출됨
    // 실제 필터링 로직을 수행함
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // HttpServletRequest에서 JWT를 추출함
        String token = resolveToken((HttpServletRequest) request);

        // 토큰 유효성 검사
        if (token!=null && jwtTokenProvider.validateToken(token)) {
            // 존재 & 유효
            // jwtProvider를 사용해 Authentication객체 가져옴
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            // SecurityContext에 설정 -> 현재 사용자가 인증됨을 인식하게 함
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        // 필터 체인의 다음 필터로 요청과 응답 넘김
        // 마지막 필터일 경우 요청은 실제 자원(컨트롤러 등)으로 전달됨
        chain.doFilter(request, response);
    }

    // HttpServletRequest에서 Authorization헤더 추출
    // 값이 Bearer로 시작하는 경우 Bearer토큰 추출
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
