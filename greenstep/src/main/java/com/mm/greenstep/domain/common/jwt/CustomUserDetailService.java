package com.mm.greenstep.domain.common.jwt;

import com.mm.greenstep.domain.user.entity.User;
import com.mm.greenstep.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String kakaoId) throws UsernameNotFoundException {
        log.info("UserDetails - 사용자 여부 확인");
        User principal = userRepository.findByKakaoId(kakaoId).orElseThrow(() -> {
            log.error("UserDetails - 사용자 없음");
            return new UsernameNotFoundException("해당 사용자를 찾을 수 없습니다");
        });
        log.info("UserDetails - 사용자 확인 완료");
        SessionUser sessionUser = new SessionUser(principal);
        System.out.println(sessionUser.getUser().getKakaoId());
        System.out.println(sessionUser.getUser().getPassword());
        System.out.println(sessionUser.getAuthorities());

        return sessionUser;
    }
}
