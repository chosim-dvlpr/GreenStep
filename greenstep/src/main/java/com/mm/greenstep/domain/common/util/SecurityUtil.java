package com.mm.greenstep.domain.common.util;

import com.mm.greenstep.domain.user.entity.User;
import com.mm.greenstep.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Spring Security의 SecurityContextHolder를 사용하여
 * 현재 인증된 사용자(즉, 현재 로그인한 사용자)의 이메일(또는 사용자 이름)을 검색하는 기능을 수행
 * */
@Slf4j
public class SecurityUtil {

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
            log.debug("SecurityFilter - 사용자가 없음");
            return null;
        }

        return authentication.getName();    // jwt token생성시 Subject를 의미함
    }

    /**
     * accessToken에서 userID를 얻어옴
     * */
    public static Long getCurrentUserId() {
        // SecurityContextHolder.getContext()에서 Authentication(인증객체) 얻어옴
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 인증 객체가 있으면 -> getName을 통해 사용자의 고유식별자 반환
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("No authentication information.");
        }

        // 사용자가 없음
        if (authentication.getName().equals("anonymousUser")){
            log.debug("SecurityFilter - 사용자가 없음");
            return null;
        }

        User user = (User) authentication.getPrincipal();

        return user.getUserId();
    }

    /**
     * accessToken에서 User를 얻어옴
     * */
    public static User getCurrentUser() {
        // SecurityContextHolder.getContext()에서 Authentication(인증객체) 얻어옴
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 인증 객체가 있으면 -> getName을 통해 사용자의 고유식별자 반환
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("No authentication information.");
        }

        // 사용자가 없음
        if (authentication.getName().equals("anonymousUser")){
            log.debug("SecurityFilter - 사용자가 없음");
            return null;
        }

        User user = (User) authentication.getPrincipal();

        return user;
    }
}
