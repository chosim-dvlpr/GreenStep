package com.mm.greenstep.domain.common.jwt;

import com.mm.greenstep.domain.user.dto.response.UserResDto;
import com.mm.greenstep.domain.user.entity.User;
import com.mm.greenstep.domain.user.repository.UserRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtTokenProvider {

    private UserRepository userRepository;
    private static final String AUTHORITIES_KEY = "auth";
    private static final String BEARER_TYPE = "Bearer";

    private static final String USER_ID = "userId";

//    private static final long ACCESS_TOKEN_EXPIRE_TIME = 30 * 60 * 1000L;              // 30분
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 24 * 30 * 60 * 1000L;          // 24시간
//    private static final long ACCESS_TOKEN_EXPIRE_TIME = 60 * 1000L;              // 60초
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000L;    // 7일
//    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1 * 60 * 1000L;    // 1분

//    @Value("${jwt.access.expiration}")
//    private long expiration;
//
//    @Value("${jwt.refresh.expiration}")
//    private long refreshExpiration;


    private final Key key;


    public JwtTokenProvider(@Value("${jwt.secretKey}") String secretKey, UserRepository userRepository) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.userRepository = userRepository;
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * 유저 정보(authentication)를 가지고 AccessToken, RefreshToken 을 생성하는 메서드
     * 사용안했음
     */
    public UserResDto.TokenInfo generateToken(String name, Collection<? extends GrantedAuthority> inputAuthorities) {
        // 1. 권한 가져오기
        // map함수를 사용하여 각 권한을 문자열로 반환
        // collect를 사용하여 ,로 구분된 단일 문자열로 결합
        String authorities = inputAuthorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        // 현재 시간을 설정
        // -> 토큰의 유효시간을 계산하는데 사용
        long now = (new Date()).getTime();


        // Access Token 생성
        // Jwts.builder를 사용하여 JWT생성
        Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        String accessToken = Jwts.builder()
                // 토큰의 주체 설정-> 일반적으로 사용자의 식별자가 사용됨
                .setSubject(name)
                // 추가적인 클레임 설정
                .claim(AUTHORITIES_KEY, authorities)
                // 토큰의 만료 시간 설정
                .setExpiration(accessTokenExpiresIn)
                // 토큰을 서명할 때 사용할 알고리즘과 키 설정
                .signWith(key, SignatureAlgorithm.HS256)
                // 위의 설정 내용으로 JWT를 생성, 문자열로 압축
                .compact();

        // Refresh Token 생성
        String refreshToken = Jwts.builder()
                .setExpiration(new Date(now + REFRESH_TOKEN_EXPIRE_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        // 토큰 정보를 담은 객체 생성
        // -> 토큰 타입, accessToken, refreshToken, refreshToken만료시간 포함
        return UserResDto.TokenInfo.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .refreshTokenExpirationTime(REFRESH_TOKEN_EXPIRE_TIME)
                .build();
    }
    public UserResDto.TokenInfo generateToken(Authentication authentication) {
        Long userId = userRepository.findUserByUserName(authentication.getName()).getUserId();
        return generateToken(userId, authentication);
    }


    /**
     * 유저 정보(authentication)를 가지고 AccessToken, RefreshToken 을 생성하는 메서드
     * userId가 있는 Token생성
     */
    public UserResDto.TokenInfo generateTokenWithUserId(Long userId, String name, Collection<? extends GrantedAuthority> inputAuthorities) {
        // 1. 권한 가져오기
        // map함수를 사용하여 각 권한을 문자열로 반환
        // collect를 사용하여 ,로 구분된 단일 문자열로 결합
        String authorities = inputAuthorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        // 현재 시간을 설정
        // -> 토큰의 유효시간을 계산하는데 사용
        long now = (new Date()).getTime();


        // Access Token 생성
        // Jwts.builder를 사용하여 JWT생성
        Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        String accessToken = Jwts.builder()
                // 토큰의 주체 설정-> 일반적으로 사용자의 식별자가 사용됨
                .setSubject(name)
                // 추가적인 클레임 설정
                .claim(AUTHORITIES_KEY, authorities)
                .claim(USER_ID, userId) // userId 클레임 추가
                // 토큰의 만료 시간 설정
                .setExpiration(accessTokenExpiresIn)
                // 토큰을 서명할 때 사용할 알고리즘과 키 설정
                .signWith(key, SignatureAlgorithm.HS256)
                // 위의 설정 내용으로 JWT를 생성, 문자열로 압축
                .compact();

        // Refresh Token 생성
        String refreshToken = Jwts.builder()
                .setExpiration(new Date(now + REFRESH_TOKEN_EXPIRE_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        // 토큰 정보를 담은 객체 생성
        // -> 토큰 타입, accessToken, refreshToken, refreshToken만료시간 포함
        return UserResDto.TokenInfo.builder()
                .grantType(BEARER_TYPE)
                .userId(userId)
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .refreshTokenExpirationTime(REFRESH_TOKEN_EXPIRE_TIME)
                .build();
    }
    public UserResDto.TokenInfo generateToken(Long userId, Authentication authentication) {

        return generateTokenWithUserId(userId, authentication.getName(), authentication.getAuthorities());
    }





    // JWT 토큰을 복호화하여 토큰에 들어있는 정보를 꺼내는 메서드
    public Authentication getAuthentication(String accessToken) {
        // 토큰 복호화
        Claims claims = parseClaims(accessToken);

        if (claims.get(AUTHORITIES_KEY) == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        // userId 클레임에서 userId 정보 가져오기
        Long userId = claims.get(USER_ID, Long.class);

        // 클레임에서 권한 정보 가져오기
        // 권한을 쉼표로 분리하여 GrantedAuthority객체의 리스트로 변환
        // -> 사용자가 가지고 있는 권한을 나타냄
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        // UserDetails 객체를 만들어서 Authentication 리턴
//        UserDetails principal = new org.springframework.security.core.userdetails.User(claims.getSubject(), "", authorities);
        UserDetails principal = userRepository.findByUserId(userId);
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    // 토큰 정보를 검증하는 메서드
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("validateToken - Invalid JWT Token", e);
        } catch (ExpiredJwtException e) {
            log.info("validateToken - Expired JWT Token", e);
        } catch (UnsupportedJwtException e) {
            log.info("validateToken - Unsupported JWT Token", e);
        } catch (IllegalArgumentException e) {
            log.info("validateToken - JWT claims string is empty.", e);
        }
        return false;
    }

    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    public Long getExpiration(String accessToken) {
        // accessToken 남은 유효시간
        Date expiration = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody().getExpiration();
        // 현재 시간
        Long now = new Date().getTime();
        return (expiration.getTime() - now);
    }
}
