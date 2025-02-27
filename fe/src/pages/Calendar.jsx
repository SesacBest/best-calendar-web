import { React, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import calendarApi from '../api/calendarApi';

export default function Calendar() {
  const navigate = useNavigate();

  const [eventList, setEventList] = useState([]);

  const [categoryState, setCategoryState] = useState('schedule');
  const [yearState, setYearState] = useState(0);
  const [monthState, setMonthState] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, []);

  const linkStyle =
    'px-3 py-2 mr-2 rounded-lg text-gray-500 hover:bg-primary hover:text-white border';
  const activeLinkStyle = 'text-primary';

  const buttonAttributiesList = [
    { categoryForUrl: 'schedule', buttonName: '일정', categoryForApi: 'schedules' },
    { categoryForUrl: 'task', buttonName: '할일', categoryForApi: 'tasks' },
    { categoryForUrl: 'diary', buttonName: '일기', categoryForApi: 'diaries' },
  ];

  const buttonGroup = buttonAttributiesList.map((buttonAttribute, index) => {
    return (
      <div
        key={index}
        className={`${linkStyle} ${categoryState === buttonAttribute.categoryForUrl ? activeLinkStyle : ''}`}
        onClick={() => {
          setCategoryState(() => buttonAttribute.categoryForUrl);
          loadList(yearState, monthState, buttonAttribute.categoryForUrl);
        }}
      >
        {buttonAttribute.buttonName}
      </div>
    );
  });

  const handleDayCellClick = (e) => {
    navigate(`/day/${e.dateStr}/${categoryState}`);
  };

  const loadList = async (year, month, categoryState) => {
    setEventList(() => []);

    let categoryForApi = '';
    buttonAttributiesList.forEach((buttonAttribute) => {
      if (buttonAttribute.categoryForUrl === categoryState) {
        categoryForApi = buttonAttribute.categoryForApi;
      }
    });

    if (categoryForApi === '') {
      console.log('카테고리 선택에서 오류가 발생했습니다.');
      return;
    }

    try {
      const response = await calendarApi.getMonthly(
        categoryForApi,
        `${year}-${month.toString().padStart(2, '0')}`,
      );

      const colorArray = ['#AAFFAA', '#55FF55', '#00FF00', '#00BB00', '#007700', '#003300'];
      const addDataArray = response.data.data.map((element) => {
        return {
          date: element.day,
          display: 'background',
          backgroundColor: colorArray[Math.min(element.count / 3, 5)],
        };
      });

      setEventList(() => addDataArray);
    } catch (error) {
      console.log(error);
    }
  };

  // showNonCurrentDates: 이번 달이 아닌 날짜를 활성화할지 결정
  // firstDay: 0이면 일요일, 1이면 월요일 시작
  // dayCellClassNames: 각 날짜가 가진 속성('오늘', '과거', '주말' 여부 등)에 따라 className 추가(Tailwind CSS 적용 가능)
  // datesSet: 월 변경 시 함수 실행
  // titleFormat: 달력 상단에 쓸 제목 설정
  // headerToolbar: 달력 상단에 쓸 제목과 버튼 위치 지정
  return (
    <>
      <section className="pt-4 flex justify-between">
        <nav className="flex">{buttonGroup}</nav>
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
        datesSet={(dateInfo) => {
          setYearState(() => dateInfo.start.getFullYear());
          setMonthState(() => dateInfo.start.getMonth() + 1);
          loadList(dateInfo.start.getFullYear(), dateInfo.start.getMonth() + 1, categoryState);
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
