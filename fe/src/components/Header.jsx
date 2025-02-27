import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { useDispatch } from 'react-redux';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  console.log(token);
  let isLoginHidden;
  let isLogoutHidden;

  if (token === null) {
    isLoginHidden = false;
    isLogoutHidden = true;
  } else {
    isLoginHidden = true;
    isLogoutHidden = false;
  }

  const handleOnLogoutClick = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <section className="flex justify-between text-xl">
        <div>S-Calendar</div>
        <nav className="flex gap-8">
          <Link to="/signup">회원가입</Link>
          <Link to="/login" hidden={isLoginHidden}>
            로그인
          </Link>
          <Link onClick={handleOnLogoutClick} hidden={isLogoutHidden}>
            로그아웃
          </Link>
        </nav>
      </section>
    </>
  );
}
