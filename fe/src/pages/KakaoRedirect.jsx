import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';

export default function KakaoRedirect() {
  // ?code=인가코드 / 파라미터로 넘어온 인가코드를 가져와야 함
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 카카오 로그인 후 리다이렉트 시 URL에 있는 인가코드(인증코드) 가져오기
    const code = new URL(window.location.href).searchParams.get('code');
    console.log(code); // 인가코드

    const getKakaoToken = async (code) => {
      setIsLoading(true); // 로딩 상태 설정
      try {
        const response = await authApi.kakaoLogin(code);
        console.log(response);
        navigate('/calendar');
      } catch (err) {
        console.log('카카오 로그인 처리 중 오류 발생:', err);
        // setError(err.response.data.message)
        setError('로그인 처리 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    if (code) {
      getKakaoToken(code);
    }
  }, [navigate]);

  return <div>로그인 중입니다.</div>;
}
