import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import scheduleApi from '../../api/scheduleApi';

export default function ScheduleCreate() {
  const navigate = useNavigate();

  const { date } = useParams();

  const [formData, setFormData] = useState({
    selectedDate: date,
    scheduleTime: '',
    content: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await scheduleApi.schedulecreate(formData);

      navigate(`/day/${date}/schedule`);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log(isLoading);
  // }, [isLoading]);

  return (
    <div className="flex flex-col items-center gap-15 mt-15">
      <h1 className="text-4xl font-semibold min-w-max">일정을 만들어 보세요.</h1>
      <form onSubmit={handleSubmit} className="w-130 flex flex-col items-center">
        <div>
          <input
            className="w-120 px-2 focus:outline-none mt-5 text-xl"
            type="text"
            id="content"
            name="content"
            placeholder="일정 내용"
            value={formData.content}
            onChange={handleChange}
            required
            maxlength="23"
          />
          <hr className="mt-0.5" />
        </div>
        <input
          type="time"
          className="time-input border-2 rounded-xl text-7xl w-130 h-50 pl-23 mt-20"
          id="scheduleTime"
          name="scheduleTime"
          value={formData.scheduleTime}
          onChange={handleChange}
          onFocus={(e) => e.target.showPicker()}
        />
        <button className="px-3 py-2 w-15 mt-15 rounded-lg border-black text-primary hover:bg-primary hover:text-white border self-end">
          {isLoading ? '생성중' : '생성'}
        </button>
      </form>
    </div>
  );
}
