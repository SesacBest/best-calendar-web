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
      const response = await taskApi.taskcreate(formData);
      // console.log(response);
      

      navigate(`/day/${date}/task`);
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
      <button>{isLoading ? '생성중...' : '생성'}</button>
    </form>
  );
}
