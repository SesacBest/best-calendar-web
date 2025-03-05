package com.ssb.scalendar.kakao;

import com.ssb.scalendar.domain.user.entity.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

@Getter
public class CustomOAuth2User implements OAuth2User {

    private final User user;
    private final Map<String, Object> attributes;

    public CustomOAuth2User(User user, Map<String, Object> attributes) {
        this.user = user;
        this.attributes = attributes;
    }

    // OAuth2User 인터페이스 구현: 인증된 사용자의 추가 속성들을 반환
    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    // Spring Security에서 사용자 권한 정보를 사용할 때 호출됨
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user.getAuthorities();
    }

    // getName()은 기본적으로 사용자의 식별자로 사용되며, 여기서는 username(email)을 반환함
    @Override
    public String getName() {
        return user.getUsername(); //email
    }

}
