package com.ssb.scalendar.kakao;

import java.util.Map;

public class KakaoUserInfo implements OAuth2UserInfo {
    // OAuth2User에서 전달된 사용자 정보 담는 DTO임
    private final Map<String, Object> attributes;

    public KakaoUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getProviderId() {
        return attributes.get("id").toString(); // 카카오의 유저 ID
    }

    @Override
    public String getProvider() {
        return "KAKAO";
    }

    @Override
    public String getEmail() {
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        if (kakaoAccount != null) {
            return kakaoAccount.get("email") != null ? kakaoAccount.get("email").toString() : null;
        }
        return null;
    }

    @Override
    public String getNickname() {
        Map<String, Object> profile = (Map<String, Object>) attributes.get("profile");
        if (profile != null) {
            return profile.get("nickname") != null ? profile.get("nickname").toString() : null;
        }
        return null;
    }
}
