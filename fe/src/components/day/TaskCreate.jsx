import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import taskApi from '../../api/TaskApi';

export default function TaskCreate() {
  const navigate = useNavigate();

  const { date } = useParams();

  const [formData, setFormData] = useState({
    selectedDate: date,
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
      await taskApi.taskcreate(formData);
      navigate(`/day/${date}/task`);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-30 mt-15">
      <h1 className="text-4xl font-semibold min-w-max">할 일을 생성해 보세요.</h1>
      <form onSubmit={handleSubmit} className="w-120 h-90 flex flex-col items-center">
        <div>
          <input
            className="w-120 px-2 focus:outline-none mt-5 text-xl"
            type="text"
            id="content"
            name="content"
            placeholder="할 일 내용"
            value={formData.content}
            onChange={handleChange}
            required
            maxlength="23"
          />
          <hr className="mt-0.5" />
        </div>
        <button className="px-3 py-2 w-15 mt-30 rounded-lg text-white bg-primary border self-end">
          {isLoading ? '생성중' : '생성'}
        </button>
      </form>
    </div>
  );
}
