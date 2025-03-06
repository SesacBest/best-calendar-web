import React from 'react';

export default function SocialLogin() {
  // 백엔드에서 제공하는 OAuth2 로그인 URL로 이동 (백엔드를 통해 인증하는 방법)
  // 개발 환경에서는 백엔드 주소 기입
  const DOMAIN = import.meta.env.VITE_DOMAIN;
  const KAKAO_AUTH_URL = `${DOMAIN}/api/oauth2/authorization/kakao`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <>
      <button
        onClick={handleKakaoLogin}
        style={{ cursor: 'pointer' }}
        className="text-base leading-none box-border w-full py-2 px-2 mb-3 flex items-center justify-center gap-2 w-52 px-4 py-3 bg-[#FEE500] text-kakaoBrown rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="login-v2-button__item__logo"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.96052 3C5.83983 3 2.5 5.59377 2.5 8.79351C2.5 10.783 3.79233 12.537 5.75942 13.5807L4.9313 16.6204C4.85835 16.8882 5.1634 17.1029 5.39883 16.9479L9.02712 14.5398C9.33301 14.5704 9.64386 14.587 9.96052 14.587C14.0812 14.587 17.421 11.9932 17.421 8.79351C17.421 5.59377 14.0812 3 9.96052 3Z"
            fill="black"
          />
        </svg>
        카카오 로그인
      </button>
    </>
  );
}
