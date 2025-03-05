import { React, useState, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { createPortal } from 'react-dom';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';

import calendarApi from '../api/calendarApi';

import { useMyHistory } from '../MyHistoryProvider';

export default function Calendar() {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const { myHistory } = useMyHistory();

  const [eventList, setEventList] = useState([]);

  const [categoryState, setCategoryState] = useState('');
  const [yearState, setYearState] = useState(0);
  const [monthState, setMonthState] = useState(0);

  const [calendarOption, setCalendarOption] = useState({
    todayColorIndex: 0,
    dataColorIndex: 0,
    sundayColorIndex: 0,
    saturdayColorIndex: 1,
    firstDayOfWeek: 0,
  });

  const [showModal, setShowModal] = useState(false);

  const dataColorsArray = [
    ['bg-green-100', 'bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500'],
    ['bg-red-100', 'bg-red-200', 'bg-red-300', 'bg-red-400', 'bg-red-500'],
    ['bg-blue-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500'],
    ['bg-orange-100', 'bg-orange-200', 'bg-orange-300', 'bg-orange-400', 'bg-orange-500'],
    ['bg-yellow-100', 'bg-yellow-200', 'bg-yellow-300', 'bg-yellow-400', 'bg-yellow-500'],
  ];

  const todayColorsArray = ['#2799c3', '#2182a7'];
  const holidayColorsArray = ['text-red-500', 'text-blue-500', 'text-green-500'];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }

    let nowDateObject = new Date();
    let initialDate = `${nowDateObject.getFullYear()}-${(nowDateObject.getMonth() + 1).toString().padStart(2, '0')}-01`;
    let initialCategory = 'schedule';

    if (myHistory.length > 0) {
      const previousUrlSplitArray = myHistory[myHistory.length - 1].split('/');

      if (previousUrlSplitArray[1] === 'day') {
        const dateUrlSplitArray = previousUrlSplitArray[2].split('-');
        if (dateUrlSplitArray.length === 3) {
          const dateNumberArray = dateUrlSplitArray.map((dateNumber) => {
            return Number.parseInt(dateNumber);
          });

          let isValidDate = true;
          for (const dateNumber of dateNumberArray) {
            if (!dateNumber) {
              isValidDate = false;
              break;
            }
          }

          if (isValidDate) {
            const year = dateNumberArray[0];
            const month = dateNumberArray[1];
            const day = dateNumberArray[2];
            if (month >= 1 && month <= 12) {
              const endOfMonthDay =
                month === 2
                  ? 28 + (!(year % 400) || (!(year % 4) && year % 100))
                  : 31 - [4, 6, 9, 11].includes(month);

              if (day >= 1 && day <= endOfMonthDay) {
                initialDate = previousUrlSplitArray[2];
              }
            }
          }
        }

        initialCategory = ['schedule', 'task', 'diary'].includes(previousUrlSplitArray[3])
          ? previousUrlSplitArray[3]
          : 'schedule';
      }
    }

    setCategoryState(initialCategory);
    calendarRef.current.getApi().gotoDate(initialDate);
    loadList(
      Number.parseInt(initialDate.substring(0, 4)),
      Number.parseInt(initialDate.substring(5, 7)),
      initialCategory,
    );
  }, []);

  const linkStyle =
    'px-3 py-2 mr-2 rounded-lg text-gray-500 hover:bg-primary hover:text-white border cursor-pointer';
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

  const openModal = () => {
    setShowModal(() => true);
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
    <div key={3} className={`${linkStyle}`} onClick={openModal}>
      설정
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

      const addDataArray = response.data.data.map((element) => {
        return {
          date: element.day,
          display: 'background',
          count: element.count,
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
      {showModal &&
        createPortal(
          <ModalContent
            onClose={() => setShowModal(false)}
            calendarOption={calendarOption}
            setCalendarOption={setCalendarOption}
            dataColorsArray={dataColorsArray}
            todayColorsArray={todayColorsArray}
            holidayColorsArray={holidayColorsArray}
          />,
          document.body,
        )}
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
        firstDay={calendarOption.firstDayOfWeek}
        locale={koLocale}
        eventBackgroundColor="#FFFFFF"
        dayCellClassNames={(arg) => {
          let str = '';
          if (arg.dow === 0) {
            str += `${holidayColorsArray[calendarOption.sundayColorIndex]} `;
          } else if (arg.dow === 6) {
            str += `${holidayColorsArray[calendarOption.saturdayColorIndex]} `;
          }

          const date = `${arg.date.getFullYear()}-${(arg.date.getMonth() + 1).toString().padStart(2, '0')}-${arg.date.getDate().toString().padStart(2, '0')}`;
          for (let i = 0; i < eventList.length; i++) {
            if (date === eventList[i].date) {
              str +=
                dataColorsArray[calendarOption.dataColorIndex][
                  Math.min(Number.parseInt(eventList[i].count / 3), 4)
                ];
              break;
            }
          }

          return str;
        }}
        dayCellContent={(arg) => ({
          html: `${arg.date.getDate()}`,
        })}
        datesSet={(dateInfo) => {
          setYearState(() => dateInfo.start.getFullYear());
          setMonthState(() => dateInfo.start.getMonth() + 1);
          if (categoryState !== '') {
            loadList(dateInfo.start.getFullYear(), dateInfo.start.getMonth() + 1, categoryState);
          }
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

function ModalContent({
  onClose,
  calendarOption,
  setCalendarOption,
  dataColorsArray,
  todayColorsArray,
  holidayColorsArray,
}) {
  const changeTodayColor = () => {
    const nextIndex = (calendarOption.todayColorIndex + 1) % todayColorsArray.length;
    document.documentElement.style.setProperty('--fc-today-bg-color', todayColorsArray[nextIndex]);
    setCalendarOption((prev) => ({
      ...prev,
      todayColorIndex: nextIndex,
    }));
  };

  const changeOption = (key, value) => {
    setCalendarOption((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="w-full h-full bg-black/75 absolute top-0 left-0 z-3 flex" onClick={onClose}>
      <div
        className="w-150 h-100 bg-white mx-auto my-auto p-5 flex flex-col justify-center items-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div>
            <label htmlFor="todayColor">오늘 강조 색상</label>
            <input
              type="button"
              name="todayColor"
              className="cursor-pointer"
              value="변경"
              onClick={() => changeTodayColor()}
            />
          </div>
          <div>
            <label htmlFor="dataColor">일정 색상</label>
            <input
              type="button"
              name="dataColor"
              className="cursor-pointer"
              value="변경"
              onClick={() =>
                changeOption(
                  'dataColorIndex',
                  (calendarOption.dataColorIndex + 1) % dataColorsArray.length,
                )
              }
            />
          </div>
          <div>
            <label htmlFor="sundayColor">일요일 색상</label>
            <input
              type="button"
              name="sundayColor"
              className="cursor-pointer"
              value="변경"
              onClick={() =>
                changeOption(
                  'sundayColorIndex',
                  (calendarOption.sundayColorIndex + 1) % holidayColorsArray.length,
                )
              }
            />
          </div>
          <div>
            <label htmlFor="saturdayColor">토요일 색상</label>
            <input
              type="button"
              name="saturdayColor"
              className="cursor-pointer"
              value="변경"
              onClick={() =>
                changeOption(
                  'saturdayColorIndex',
                  (calendarOption.saturdayColorIndex + 1) % holidayColorsArray.length,
                )
              }
            />
          </div>
          <div>
            <label htmlFor="firstDayOfWeek">주 시작 요일</label>
            <input
              type="button"
              name="firstDayOfWeek"
              className="cursor-pointer"
              value="일요일"
              onClick={() => changeOption('firstDayOfWeek', 0)}
            />
            <input
              type="button"
              name="firstDayOfWeek"
              className="cursor-pointer"
              value="월요일"
              onClick={() => changeOption('firstDayOfWeek', 1)}
            />
          </div>
          <button className="cursor-pointer" onClick={onClose}>
            확인
          </button>
        </form>
      </div>
    </div>
  );
}
