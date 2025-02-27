import { React, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import mockApi from '../api/mockApi';

export default function Calendar() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('schedule');

  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, []);

  const linkStyle =
    'px-3 py-2 mr-2 rounded-lg text-gray-500 hover:bg-primary hover:text-white border';
  const activeLinkStyle = 'text-primary';

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
        events={eventList}
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
        datesSet={async (dateInfo) => {
          setEventList(() => []);

          const year = dateInfo.start.getFullYear();
          const month = dateInfo.start.getMonth() + 1;

          try {
            const response = await mockApi.getMonthlySchedules(
              `${year}-${month.toString().padStart(2, '0')}`,
            );

            const addDataArray = [];
            response.data.forEach((data) => {
              const addDataObject = { date: data.day, display: 'background' };
              let color;
              if (data.count < 3) {
                color = '#AAFFAA';
              } else if (data.count < 6) {
                color = '#55FF55';
              } else if (data.count < 9) {
                color = '#00FF00';
              } else if (data.count < 12) {
                color = '#00BB00';
              } else if (data.count < 15) {
                color = '#007700';
              } else {
                color = '#003300';
              }

              addDataObject.backgroundColor = color;

              addDataArray.push(addDataObject);
            });

            setEventList(() => addDataArray);
          } catch (error) {
            console.log(error);
          }
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
