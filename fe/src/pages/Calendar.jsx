import { React, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('schedule');

  const linkStyle =
    'px-3 py-2 mr-2 rounded-lg text-gray-500 hover:bg-primary hover:text-white border';
  const activeLinkStyle = 'text-primary';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, []);

  // TODO: 임시적인 일정 목록이므로, 실제 DB 연동 이후 수정 예정
  const [tempEventList, setTempEventList] = useState([
    { date: '2025-01-03', display: 'background', backgroundColor: 'red' },
    { date: '2025-01-21', display: 'background', backgroundColor: 'blue' },
    { date: '2025-02-11', display: 'background', backgroundColor: 'green' },
    { date: '2025-02-12', display: 'background', backgroundColor: 'yellow' },
    { date: '2025-02-22', display: 'background', backgroundColor: 'brown' },
    { date: '2025-03-03', display: 'background', backgroundColor: 'grey' },
    { date: '2025-03-05', display: 'background', backgroundColor: 'violet' },
    { date: '2025-03-08', display: 'background', backgroundColor: 'orange' },
    { date: '2025-03-11', display: 'background', backgroundColor: 'black' },
  ]);

  // TODO: 일정, 할일, 일기 카테고리 설정에 따라 각 상세 페이지로 향하는 기능 추가 예정
  const handleDayCellClick = (e) => {
    navigate(`/day/${e.dateStr}/${category}`);
  };

  // showNonCurrentDates: 이번 달 날짜만 활성화
  // firstDay: 0이면 일요일, 1이면 월요일 시작
  // dayCellClassNames: 각 날짜가 가진 속성에 따라 className 추가(Tailwind CSS 적용 가능)
  // titleFormat: 달력 상단에 쓸 제목 설정
  // headerToolbar: 달력 상단에 쓸 제목과 버튼 위치 지정
  return (
    <>
      <section className="pt-4 flex justify-between">
        <nav className="flex">
          <div
            className={`${linkStyle} ${category === 'schedule' ? activeLinkStyle : ''}`}
            onClick={() => {
              setCategory(() => 'schedule');
            }}
          >
            일정
          </div>
          <div
            className={`${linkStyle} ${category === 'task' ? activeLinkStyle : ''}`}
            onClick={() => {
              setCategory(() => 'task');
            }}
          >
            할일
          </div>
          <div
            className={`${linkStyle} ${category === 'diary' ? activeLinkStyle : ''}`}
            onClick={() => {
              setCategory(() => 'diary');
            }}
          >
            일기
          </div>
        </nav>
      </section>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={tempEventList}
        dateClick={handleDayCellClick}
        showNonCurrentDates={false}
        firstDay={1}
        dayCellClassNames={(arg) => {
          let str = '';
          if (arg.dow === 0) {
            str += 'text-red-500 ';
          } else if (arg.dow === 6) {
            str += 'text-blue-500 ';
          }

          return str;
        }}
        titleFormat={(info) => `${info.date.year}년  ${info.date.month + 1}월`}
        headerToolbar={{
          left: '',
          center: 'title',
          right: 'today prev,next',
        }}
      />
    </>
  );
}
