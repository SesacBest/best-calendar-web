export default function CalendarModalContent({
  onClose,
  calendarOption,
  setCalendarOption,
  dataColorsArray,
  todayDataColorsArray,
  intensityIndex,
}) {
  const dataButtonColorsArray = [
    'border-green-300 text-green-300 hover:bg-green-300',
    'border-red-300 text-red-300 hover:bg-red-300',
    'border-blue-300 text-blue-300 hover:bg-blue-300',
    'border-yellow-300 text-yellow-300 hover:bg-yellow-300',
    'border-orange-300 text-orange-300 hover:bg-orange-300',
  ];

  const dataColorChangeOption = (value) => {
    const newCalendarOption = {
      ...calendarOption,
      dataColorIndex: value,
    };

    setCalendarOption(() => newCalendarOption);
    localStorage.setItem('calendarOption', JSON.stringify(newCalendarOption));

    // 달력 library 특성 상, 오늘 일정에 대해서는 색상 표현을 별도로 구현
    if (intensityIndex >= 0) {
      document.documentElement.style.setProperty(
        '--fc-today-bg-color',
        todayDataColorsArray[value][intensityIndex],
      );
    }
  };

  const changeOption = (key, value) => {
    const newCalendarOption = {
      ...calendarOption,
      [key]: value,
    };

    setCalendarOption(() => newCalendarOption);
    localStorage.setItem('calendarOption', JSON.stringify(newCalendarOption));
  };

  const linkStyle = 'px-3 py-2 mr-2 rounded-lg hover:text-white border cursor-pointer';

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
                    dataColorChangeOption(
                      (calendarOption.dataColorIndex + 1) % dataColorsArray.length,
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
                  className={`${linkStyle} hover:bg-primary ${calendarOption.firstDayOfWeek ? '' : 'border-primary text-primary'}`}
                  value="일요일"
                  onClick={() => changeOption('firstDayOfWeek', 0)}
                />
                <input
                  type="button"
                  name="firstDayOfWeek"
                  className={`${linkStyle} hover:bg-primary ${calendarOption.firstDayOfWeek ? 'border-primary text-primary' : ''}`}
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
