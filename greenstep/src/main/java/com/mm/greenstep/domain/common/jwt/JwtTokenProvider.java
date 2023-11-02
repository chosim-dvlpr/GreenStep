package com.mm.greenstep.domain.common.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

/** 토큰을 생성하고 검증하는 클래스입니다.
 *  해당 컴포넌트는 필터클래스에서 사전 검증을 거칩니다.
 */
@Slf4j
@Component
public class JwtTokenProvider {

    // JWT생성과 검증에 사용될 암호화 키 저장
    private final Key key;

    // @Value를 통해 jwt.secret속성값을 읽어 secretKey에 할당
//    @Value("${jwt.secretKey}")
//    private String secretKey;

    @Value("${jwt.access.expiration}")
    private long expiration;

    @Value("${jwt.refresh.expiration}")
    private long refreshExpiration;

    public JwtTokenProvider(@Value("${jwt.secretKey}") String secretKey) {
        // secretKey를 Base64디코딩 후, HMAC SHA키로 변환
        byte[] secretByteKey = DatatypeConverter.parseBase64Binary(secretKey);
        this.key = Keys.hmacShaKeyFor(secretByteKey);
    }

    public JwtToken generateToken(Authentication authentication) {
        // 인증정보로부터 권한을 문자열로 반환
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        // access토큰 생성
        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim("auth", authorities) //위의 권한을 JWT클레임으로 설정
                .setExpiration(new Date(System.currentTimeMillis()+ expiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        // refresh토큰 생성
        String refreshToken = Jwts.builder()
                .setExpiration(new Date(System.currentTimeMillis()+ refreshExpiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        //Access Token 생성
        return JwtToken.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public Authentication getAuthentication(String accessToken) {
        //토큰 복호화 -> 클레임을 가져옴
        Claims claims = parseClaims(accessToken);

        if (claims.get("auth") == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        // 클레임의 권한 정보를 가져와 리스트로 변환
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get("auth").toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        // User객체를 생성하여 UsernamePasswordAuthenticationToken와 함께 반환
        // 스프링 시큐리티 컨텍스트에 인증 정보로 사용
        UserDetails principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }


    // 주어진 토큰 유효성 검사
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        }catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT Token", e);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token", e);
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token", e);
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty.", e);
        }
        return false;
    }


    // access토큰으로부터 클레임 추출
    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}