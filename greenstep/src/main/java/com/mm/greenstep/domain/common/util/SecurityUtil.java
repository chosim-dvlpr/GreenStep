package com.mm.greenstep.domain.common.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Spring Security의 SecurityContextHolder를 사용하여
 * 현재 인증된 사용자(즉, 현재 로그인한 사용자)의 이메일(또는 사용자 이름)을 검색하는 기능을 수행
 * */
public class SecurityUtil {

    public static String getCurrentUserName() {
        // SecurityContextHolder.getContext()에서 Authentication(인증객체) 얻어옴
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 인증 객체가 있으면 -> getName을 통해 사용자의 고유식별자 반환
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("No authentication information.");
        }
        return authentication.getName();
    }
}
