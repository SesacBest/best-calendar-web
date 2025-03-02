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
    <form action="" onSubmit={handleSubmit} className='flex flex-col items-center mt-40 gap-35'>
      <div className='flex flex-col gap-7'>
        <label for="content" className='font-mono text-xl'>content</label>
        <input
        type="text"
        className="w-230 p-2 border-b-4 rounded-lg shadow-sm focus:outline-none focus:border-violet-600 bg-gray-200 text-gray-700"
        id="content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        required
        />
      </div>
      <div className='flex flex-col gap-7'>
        <label for="schduleTime" className='font-mono text-xl'>scheduleTime</label>
        <input
        type="time"
        // className="w-40 border border-gray-300 rounded px-2 py-1 bg-black text-white"
        className='w-230 p-2 border-b-4 rounded-lg shadow-sm focus:outline-none focus:border-violet-600 bg-gray-200 text-gray-700'
        id="scheduleTime"
        name="scheduleTime"
        value={formData.scheduleTime}
        onChange={handleChange}
        />
        
      </div>
      <button className='px-3 py-2 rounded-lg text-gray-500 hover:bg-violet-600 hover:text-white border w-15 absolute right-45 bottom-5'>{isLoading ? '생성중' : '생성'}</button>
    </form>
  );
}
