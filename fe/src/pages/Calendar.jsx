import { React, useState, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';

import calendarApi from '../api/calendarApi';

export default function Calendar() {
  const navigate = useNavigate();

  const calendarRef = useRef(null);

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

  const categoryButtonGroup = buttonAttributiesList.map((buttonAttribute, index) => {
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

  const moveToCurrentMonth = () => {
    calendarRef.current.getApi().gotoDate(new Date());
  };

  const moveToPrevMonth = () => {
    const targetYear = yearState - (monthState === 1);
    const targetMonth = ((monthState + 10) % 12) + 1;
    setYearState(targetYear);
    setMonthState(targetMonth);
    calendarRef.current
      .getApi()
      .gotoDate(`${targetYear}-${targetMonth.toString().padStart(2, '0')}-01`);
  };

  const moveToNextMonth = () => {
    const targetYear = yearState + (monthState === 12);
    const targetMonth = (monthState % 12) + 1;
    setYearState(targetYear);
    setMonthState(targetMonth);
    calendarRef.current
      .getApi()
      .gotoDate(`${targetYear}-${targetMonth.toString().padStart(2, '0')}-01`);
  };

  const calendarButtonGroup = [
    <div key={0} className={`${linkStyle}`} onClick={moveToPrevMonth}>
      지난 달
    </div>,
    <div key={1} className={`${linkStyle}`} onClick={moveToCurrentMonth}>
      이번 달
    </div>,
    <div key={2} className={`${linkStyle}`} onClick={moveToNextMonth}>
      다음 달
    </div>,
  ];

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
  // headerToolbar: 달력 상단에 쓸 제목과 버튼 위치 지정
  return (
    <>
      <section className="pt-4 flex justify-between">
        <nav className="flex">{categoryButtonGroup}</nav>
        <h2 className="text-3xl">
          {yearState}년 {monthState}월
        </h2>
        <nav className="flex">{calendarButtonGroup}</nav>
      </section>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={eventList}
        dateClick={handleDayCellClick}
        showNonCurrentDates={false}
        firstDay={1}
        locale={koLocale}
        dayCellClassNames={(arg) => {
          let str = '';
          if (arg.dow === 0) {
            str += 'text-red-500 ';
          } else if (arg.dow === 6) {
            str += 'text-blue-500 ';
          }

          return str;
        }}
        dayCellContent={(arg) => ({
          html: `${arg.date.getDate()}`,
        })}
        datesSet={(dateInfo) => {
          setYearState(() => dateInfo.start.getFullYear());
          setMonthState(() => dateInfo.start.getMonth() + 1);
          loadList(dateInfo.start.getFullYear(), dateInfo.start.getMonth() + 1, categoryState);
        }}
        headerToolbar={{
          left: '',
          center: '',
          right: '',
        }}
      />
    </>
  );
}
