import React from 'react';
import kakaoLoginImgL from '../images/kakao_login_large_wide.png';

export default function SocialLogin() {
  // 백엔드에서 제공하는 OAuth2 로그인 URL로 이동 (백엔드를 통해 인증하는 방법)
  const KAKAO_AUTH_URL = 'http://localhost:8080/api/oauth2/authorization/kakao';

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div>
      <img
        // className='w-full'
        src={kakaoLoginImgL}
        alt="카카오 로그인"
        onClick={handleKakaoLogin}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
}
