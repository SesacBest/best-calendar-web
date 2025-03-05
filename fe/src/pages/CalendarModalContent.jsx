export default function CalendarModalContent({
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
