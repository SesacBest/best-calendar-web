import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { useDispatch } from 'react-redux';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  // console.log(token);

  let hidden = !!token;

  const handleOnScalendarClick = (e) => {
    e.preventDefault();
    navigate(hidden ? '/calendar' : '/', { replace: true });
  };

  const handleOnLogoutClick = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/', { replace: true });
  };

  return (
    <>
      <section className="flex justify-between text-xl my-7">
        <Link onClick={handleOnScalendarClick}>S-Calendar</Link>
        <nav className="flex gap-8">
          {/* <Link to="/signup" hidden={hidden}>회원가입</Link> */}
          <Link to="/login" hidden={hidden}>
            로그인 / 회원가입
          </Link>
          <Link onClick={handleOnLogoutClick} hidden={!hidden}>
            로그아웃
          </Link>
        </nav>
      </section>
    </>
  );
}
