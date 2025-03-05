package com.ssb.scalendar.kakao;

public interface OAuth2UserInfo {

    String getEmail();

    String getNickname();

    String getProviderId();
    // OAuth2 제공자 내부 사용자 ID

    String getProvider();


}
