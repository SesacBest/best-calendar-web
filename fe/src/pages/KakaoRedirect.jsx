import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function KakaoRedirect() {
  // http://localhost:5173/login/oauth/callback/kakao?code=uUEiy82-ITfC4KT3wUOWeugcSOrDXiOMx0gIrRRVqNEHVFWEGNRABwAAAAQKKcjZAAABlVtEkL3SDh85zpcCzQ
  // ?code=인가코드 / 파라미터로 넘어온 인가코드를 가져와야 함
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code); // 인가코드
    console.log("테스트");


  }, []);



  return (
    <div>
      <p>로그인 중입니다.</p>
      <p>잠시만 기다려 주세요.</p>
    </div>
  )
}
