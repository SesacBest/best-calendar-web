package com.ssb.scalendar.kakao;

import com.ssb.scalendar.domain.user.entity.Role;
import com.ssb.scalendar.domain.user.entity.User;
import com.ssb.scalendar.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    // CustomOAuth2UserService : OAuth2 사용자 정보 처리 (사용자 인증 로직)

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();

        // 카카오 사용자 정보 DTO 변환
        KakaoUserInfo kakaoUserInfo = new KakaoUserInfo(attributes);

        // 기존 회원 확인 및 없으면 회원가입
        User user = userRepository.findByUsername(kakaoUserInfo.getEmail())
                .orElseGet(() -> registerNewUser(kakaoUserInfo));

        return new CustomOAuth2User(user, attributes); // CustomOAuth2User 반환
    }

    private User registerNewUser(KakaoUserInfo kakaoUserInfo) {
        User user = new User(kakaoUserInfo.getEmail(),
                "",
                kakaoUserInfo.getNickname(),
                Role.ROLE_USER,
                kakaoUserInfo.getProvider(),
                kakaoUserInfo.getProviderId());
        return userRepository.save(user);
    }
}
