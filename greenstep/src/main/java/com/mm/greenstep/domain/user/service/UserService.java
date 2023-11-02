package com.mm.greenstep.domain.user.service;

import com.mm.greenstep.domain.common.jwt.JwtToken;
import com.mm.greenstep.domain.common.jwt.JwtTokenProvider;
import com.mm.greenstep.domain.user.dto.request.SignUpReqDto;
import com.mm.greenstep.domain.user.dto.request.LoginReqDto;
import com.mm.greenstep.domain.user.entity.Role;
import com.mm.greenstep.domain.user.entity.User;
import com.mm.greenstep.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final BCryptPasswordEncoder encoder;
    private final UserRepository repository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;


    public JwtToken login(LoginReqDto loginReqDto) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginReqDto.getKakaoId(), loginReqDto.getUserPW());

        // 검증
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        log.info("사용자 검증 완료" + authentication);

        // 검증된 인증 정보로 JWT 토큰 생성
        JwtToken token = jwtTokenProvider.generateToken(authentication);
        return token;
    }

    public Long signup(SignUpReqDto signUpReqDto) {
        boolean check = checkkakaoIdExists(signUpReqDto.getKakaoId());

        if (check) {
            throw new IllegalArgumentException("이미 존재하는 유저입니다.");
        }

        String encPwd = encoder.encode(signUpReqDto.getUserPW());

        User user = User.builder()
                .kakaoId(signUpReqDto.getKakaoId())
                .nickName(signUpReqDto.getNickName())
                .password(encPwd)
                .role(Collections.singletonList(Role.ROLE_USER.name()))
                .build();
        repository.save(user);

        if(user!=null) {
            return user.getUserId();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    public boolean checkkakaoIdExists(String kakaoId) {
        return repository.existsUserByKakaoId(kakaoId);
    }
}
