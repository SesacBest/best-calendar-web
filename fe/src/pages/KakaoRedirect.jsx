import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { kakaoLogin } from '../store/slices/authSlice';

export default function KakaoRedirect() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // 백엔드에서 가져오기 (방법2로 변경)
    // 현재 url에서 token 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token !== null && token !== undefined) {
      try {
        console.log('토큰 저장 성공:', token);

        dispatch(kakaoLogin(token));

        navigate('/calendar');
      } catch (error) {
        console.error('토큰 저장 중 오류:', error);
        navigate('/');
      }
    }
  }, [navigate, dispatch]);

  return <div>로그인 중입니다.</div>;
}
