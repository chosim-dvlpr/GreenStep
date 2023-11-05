package com.mm.greenstep.domain.common.util;

import com.mm.greenstep.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Spring Security의 SecurityContextHolder를 사용하여
 * 현재 인증된 사용자(즉, 현재 로그인한 사용자)의 이메일(또는 사용자 이름)을 검색하는 기능을 수행
 * */
@RequiredArgsConstructor
public class SecurityUtil {

    private static UserRepository userRepository;

    /**
     * SecurityContextHolder.getContext().getAuthentication()에서
     * userName얻어옴
     * */
    public static String getCurrentUserName() {
        // SecurityContextHolder.getContext()에서 Authentication(인증객체) 얻어옴
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 인증 객체가 있으면 -> getName을 통해 사용자의 고유식별자 반환
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("No authentication information.");
        }

        // 사용자가 없음
        if (authentication.getName().equals("anonymousUser")){
            return "accessToken 갱신필요";
        }

        return authentication.getName();
    }

    /**
     * SecurityUtil.getCurrentUserName을 통해 userPK를 얻어옴
     * */
    public static Long getCurrentUserId() {
        String userName = getCurrentUserName();

        return userRepository.findUserByUserName(getCurrentUserName()).getUserId();
    }
}
