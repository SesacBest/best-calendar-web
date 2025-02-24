import React, { useEffect } from 'react'
import DayHeader from '../components/DayHeader'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function Day() {
  const navigate = useNavigate();
  const location = useLocation();

  // date가 정확히 입력되지 않은 경우, 캘린더 페이지로 리다이렉트
  useEffect(() => {
    const dateMatch = location.pathname.match(/\d{4}-\d{2}-\d{2}/);

    if (!dateMatch) {
      navigate('/calendar');
      return;
    }

    const date = dateMatch[0];
    const dateFormatRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

    if (!dateFormatRegex.test(date)) {
      navigate('/calendar');
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <DayHeader />
      <Outlet />
    </>
  )
}
