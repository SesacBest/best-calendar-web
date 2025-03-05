import { React, useState, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { createPortal } from 'react-dom';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';

import calendarApi from '../api/calendarApi';

import { useMyHistory } from '../MyHistoryProvider';

import CalendarModalContent from './CalendarModalContent';

export default function Calendar() {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const { myHistory } = useMyHistory();

  const [eventList, setEventList] = useState([]);

  const [categoryState, setCategoryState] = useState('');
  const [yearState, setYearState] = useState(0);
  const [monthState, setMonthState] = useState(0);

  const [calendarOption, setCalendarOption] = useState({
    dataColorIndex: 0,
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

  const todayDataColorsArray = [
    [
      'oklch(0.962 0.044 156.743)',
      'oklch(0.925 0.084 155.995)',
      'oklch(0.871 0.15 154.449)',
      'oklch(0.792 0.209 151.711)',
      'oklch(0.723 0.219 149.579)',
    ],
    [
      'oklch(0.936 0.032 17.717)',
      'oklch(0.885 0.062 18.334)',
      'oklch(0.808 0.114 19.571)',
      'oklch(0.704 0.191 22.216)',
      'oklch(0.637 0.237 25.331)',
    ],
    [
      'oklch(0.932 0.032 255.585)',
      'oklch(0.882 0.059 254.128)',
      'oklch(0.809 0.105 251.813)',
      'oklch(0.707 0.165 254.624)',
      'oklch(0.623 0.214 259.815)',
    ],
    [
      'oklch(0.954 0.038 75.164)',
      'oklch(0.901 0.076 70.697)',
      'oklch(0.837 0.128 66.29)',
      'oklch(0.75 0.183 55.934)',
      'oklch(0.705 0.213 47.604)',
    ],
    [
      'oklch(0.973 0.071 103.193)',
      'oklch(0.945 0.129 101.54)',
      'oklch(0.905 0.182 98.111)',
      'oklch(0.852 0.199 91.936)',
      'oklch(0.795 0.184 86.047)',
    ],
  ];

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

    document.documentElement.style.setProperty('--fc-today-bg-color', '#ffffff');

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
    <div key={0} className={`${linkStyle}`} onClick={moveToCurrentMonth}>
      오늘로
    </div>,
    <div key={1} className={`${linkStyle}`} onClick={openModal}>
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
          <CalendarModalContent
            onClose={() => setShowModal(false)}
            calendarOption={calendarOption}
            setCalendarOption={setCalendarOption}
            dataColorsArray={dataColorsArray}
          />,
          document.body,
        )}
      <div className="w-full flex justify-center">
        <div className="w-9/10 flex flex-col justify-center item-center">
          <section className="pt-4 flex justify-between">
            <nav className="flex flex-1 justify-start">{categoryButtonGroup}</nav>
            <nav className="flex flex-2 justify-center items-center">
              <div className="flex flex-1 justify-end" onClick={moveToPrevMonth}>
                <div className={linkStyle}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </div>
              </div>
              <div className="mx-5 flex flex-3 justify-center">
                <h2 className="text-3xl">
                  {yearState}년 {monthState}월
                </h2>
              </div>
              <div className="flex flex-1 justify-start" onClick={moveToNextMonth}>
                <div className={linkStyle}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </div>
            </nav>
            <nav className="flex flex-1 justify-end">{calendarButtonGroup}</nav>
          </section>
          <div className="w-full">
            <FullCalendar
              ref={calendarRef}
              aspectRatio={1.55}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={eventList}
              dateClick={handleDayCellClick}
              showNonCurrentDates={false}
              firstDay={calendarOption.firstDayOfWeek}
              locale={koLocale}
              eventBackgroundColor="rgba(0, 0, 0, 0)"
              dayCellClassNames={(arg) => {
                let str = '';
                if (arg.dow === 0) {
                  str += `text-red-500 `;
                } else if (arg.dow === 6) {
                  str += `text-blue-500 `;
                }

                const date = `${arg.date.getFullYear()}-${(arg.date.getMonth() + 1).toString().padStart(2, '0')}-${arg.date.getDate().toString().padStart(2, '0')}`;
                for (let i = 0; i < eventList.length; i++) {
                  if (date === eventList[i].date) {
                    const intensityIndex = Math.min(Number.parseInt(eventList[i].count / 3), 4);
                    str += dataColorsArray[calendarOption.dataColorIndex][intensityIndex];
                    if (arg.isToday) {
                      document.documentElement.style.setProperty(
                        '--fc-today-bg-color',
                        todayDataColorsArray[calendarOption.dataColorIndex][intensityIndex],
                      );
                    }
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
                  loadList(
                    dateInfo.start.getFullYear(),
                    dateInfo.start.getMonth() + 1,
                    categoryState,
                  );
                }
              }}
              headerToolbar={{
                left: '',
                center: '',
                right: '',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
