import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import DayHeader from '../components/DayHeader';

export default function Day() {
  const navigate = useNavigate();
  const location = useLocation();
  const { date } = useParams();

  useEffect(() => {
    // date가 존재하지 않거나 형식에 맞지 않으면 리다이렉트
    const dateFormatRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!date || !dateFormatRegex.test(date)) {
      navigate('/calendar');
      return;
    }
  }, [date, navigate]);

  return (
    <>
      <DayHeader />
      <Outlet />
    </>
  )
}
