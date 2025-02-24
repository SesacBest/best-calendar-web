import React, { useEffect } from 'react';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import { useDispatch } from 'react-redux';
import authApi from './api/authApi';
import { logout } from './store/slices/authSlice';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await authApi.verify();
      } catch (err) {
        dispatch(logout());
      }
    };
    verifyToken();
  }, []);

  return (
    <section>
      <Header />
      <Outlet />
      <Footer />
    </section>
  );
}
