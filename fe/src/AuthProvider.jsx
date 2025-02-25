import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authApi from './api/authApi';
import { logout } from './store/slices/authSlice';

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await authApi.verify(); // 토큰 유효하면 통과
      } catch (err) {
        dispatch(logout()); // 토큰 유효하지 않으면 강제 로그아웃
      }
    };
    verifyToken();
  }, [dispatch]);

  return <>{children}</>;
}
