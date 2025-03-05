export default function CalendarModalContent({
  onClose,
  calendarOption,
  setCalendarOption,
  dataColorsArray,
  todayColorsArray,
  holidayColorsArray,
}) {
  const dataButtonColorsArray = [
    'border-green-300 text-green-300',
    'border-red-300 text-red-300',
    'border-blue-300 text-blue-300',
    'border-yellow-300 text-yellow-300',
    'border-orange-300 text-orange-300',
  ];
  const todayButtonColorsArray = [
    'border-black text-black',
    'border-primary text-primary',
    'border-secondary text-secondary',
  ];
  const holidayButtonColorsArray = [
    'border-red-300 text-red-300',
    'border-blue-300 text-blue-300',
    'border-green-300 text-green-300',
  ];

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

  const linkStyle =
    'px-3 py-2 mr-2 rounded-lg hover:bg-primary hover:text-white border cursor-pointer';

  return (
    <div className="w-full h-full bg-black/75 absolute top-0 left-0 z-3 flex" onClick={onClose}>
      <div
        className="w-150 h-100 bg-white mx-auto my-auto flex flex-col justify-center items-center"
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
          <ul className="w-90 h-100 mx-auto my-auto flex flex-col justify-center items-center list-inside list-disc">
            <li className="w-90 my-2 flex flex-row justify-between items-center">
              <div className="flex">
                <label className="text-xl" htmlFor="todayColor">
                  오늘 강조 색상
                </label>
              </div>
              <div className="flex">
                <input
                  type="button"
                  name="todayColor"
                  className={`${linkStyle} ${todayButtonColorsArray[calendarOption.todayColorIndex]}`}
                  value="변경"
                  onClick={() => changeTodayColor()}
                />
              </div>
            </li>
            <li className="w-90 my-2 flex flex-row justify-between items-center">
              <div className="flex">
                <label className="text-xl" htmlFor="dataColor">
                  일정 색상
                </label>
              </div>
              <div className="flex">
                <input
                  type="button"
                  name="dataColor"
                  className={`${linkStyle} ${dataButtonColorsArray[calendarOption.dataColorIndex]}`}
                  value="변경"
                  onClick={() =>
                    changeOption(
                      'dataColorIndex',
                      (calendarOption.dataColorIndex + 1) % dataColorsArray.length,
                    )
                  }
                />
              </div>
            </li>
            <li className="w-90 my-2 flex flex-row justify-between items-center">
              <div className="flex">
                <label className="text-xl" htmlFor="sundayColor">
                  일요일 색상
                </label>
              </div>
              <div className="flex">
                <input
                  type="button"
                  name="sundayColor"
                  className={`${linkStyle} ${holidayButtonColorsArray[calendarOption.sundayColorIndex]}`}
                  value="변경"
                  onClick={() =>
                    changeOption(
                      'sundayColorIndex',
                      (calendarOption.sundayColorIndex + 1) % holidayColorsArray.length,
                    )
                  }
                />
              </div>
            </li>
            <li className="w-90 my-2 flex flex-row justify-between items-center">
              <div className="flex">
                <label className="text-xl" htmlFor="saturdayColor">
                  토요일 색상
                </label>
              </div>
              <div className="flex">
                <input
                  type="button"
                  name="saturdayColor"
                  className={`${linkStyle} ${holidayButtonColorsArray[calendarOption.saturdayColorIndex]}`}
                  value="변경"
                  onClick={() =>
                    changeOption(
                      'saturdayColorIndex',
                      (calendarOption.saturdayColorIndex + 1) % holidayColorsArray.length,
                    )
                  }
                />
              </div>
            </li>
            <li className="w-90 my-2 flex flex-row justify-between items-center">
              <div className="flex">
                <label className="text-xl" htmlFor="firstDayOfWeek">
                  주 시작 요일
                </label>
              </div>
              <div className="flex">
                <input
                  type="button"
                  name="firstDayOfWeek"
                  className={`${linkStyle} ${calendarOption.firstDayOfWeek ? '' : 'border-primary text-primary'}`}
                  value="일요일"
                  onClick={() => changeOption('firstDayOfWeek', 0)}
                />
                <input
                  type="button"
                  name="firstDayOfWeek"
                  className={`${linkStyle} ${calendarOption.firstDayOfWeek ? 'border-primary text-primary' : ''}`}
                  value="월요일"
                  onClick={() => changeOption('firstDayOfWeek', 1)}
                />
              </div>
            </li>
            <li className="w-90 my-2 flex flex-row justify-center items-center">
              <button
                className="px-4 py-2 mr-2 rounded-lg bg-primary text-white text-xl border cursor-pointer"
                onClick={onClose}
              >
                확인
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
