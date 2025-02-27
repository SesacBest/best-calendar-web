import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ScheduleCreate() {

  const navigate = useNavigate();

  const { date } = useParams();
  console.log(date);
  
  
  const [formData, setFormData] = useState({
      selectedDate: date,
      scheduleTime: '',
      content: '',
  });

  const handleChange = async (e) => {

    const { name, value } = e.target;
    

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    navigate(`/day/${date}/schedule`);
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <input 
        type="text" 
        className="test"
        id="content"
        name="content"
        value={formData.content}
        onChange={handleChange}
      />
      <input type="time" className="w-40 border border-gray-300 rounded px-2 py-1 bg-black text-white"/>
      <button>생성</button>
    </form>
  )
}
