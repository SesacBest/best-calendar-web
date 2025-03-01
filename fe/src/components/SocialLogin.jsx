import React from 'react';
import kakaoLoginImgL from '../images/kakao_login_large_wide.png';

export default function SocialLogin() {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const kakaoLogin = (e) => {
    e.preventDefault();
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div>
      <img
        // className='w-full'
        src={kakaoLoginImgL}
        alt="카카오 로그인"
        onClick={kakaoLogin}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
}
