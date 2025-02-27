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
    <form action="" onSubmit={handleSubmit}>
      <input
        type="text"
        className="test"
        id="content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        className="w-40 border border-gray-300 rounded px-2 py-1 bg-black text-white"
        id="scheduleTime"
        name="scheduleTime"
        value={formData.scheduleTime}
        onChange={handleChange}
      />
      <button>{isLoading ? '생성중...' : '생성'}</button>
    </form>
  );
}
