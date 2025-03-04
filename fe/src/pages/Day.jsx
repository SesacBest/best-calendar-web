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

  // <div className="flex flex-col h-full">
  //     <DayHeader />
  //     {/* 두 번째 Outlet에만 스크롤이 가능하도록 설정 */}
  //     <div className="max-h-screen flex-1 overflow-y-auto">
  //       <Outlet />
  //     </div>
  //   </div>
  return (
    <>
      <DayHeader />
      <div className="h-150 overflow-y-auto">
        <Outlet />
      </div>
    </>
  );
}
12