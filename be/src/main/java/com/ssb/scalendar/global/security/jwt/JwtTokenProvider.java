package com.ssb.scalendar.global.security.jwt;

import com.ssb.scalendar.domain.user.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider {

    // 2. 만료기간을 위한 기간 지정
    private final long tokenValidityInMilliseconds = 1000L * 60 * 60 * 72; // 24시간
    // 1. application.properties에 있는 변수 가져오기
    @Value("${jwt.secret}")
    private String secretKey;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(Authentication authentication, User user) {
        String username = authentication.getName();
        Long id = user.getId();

        Claims claims = Jwts.claims();

        claims.put("id", id);
        claims.put("username", username);

        Date now = new Date();
        Date validity = new Date(now.getTime() + tokenValidityInMilliseconds);

        return Jwts.builder()
                // 페이로드 넣기
                .setClaims(claims)
                // 만든시간 넣기
                .setIssuedAt(now)
                // 만료시간 넣기
                .setExpiration(validity)
                // 서명 넣기
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public String getUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("username", String.class);
    }
}