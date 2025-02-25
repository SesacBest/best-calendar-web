import React, { useState } from 'react';
import authApi from '../api/authApi';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
  });
  
  const [error, setError] = useState('');

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await authApi.signup(formData);
      alert('회원가입 성공');
      navigate('/calendar')
    } catch (err) {
      setError(err.message);
      console.error(err.response);
    } 
  };

  return (
    <section className="flex flex-col items-center gap-13 mt-35">
      <h1 className="text-5xl font-se">S-Calendar</h1>
      <h2 className="text-[28px] font-semibold mb-10">쉽고 간편한 달력, 지금 시작해 보세요</h2>
      <section className="w-100">
        <form onSubmit={handleSubmit}>
          <section className="flex justify-between px-2">
            <input
              type="email"
              name="email"
              placeholder="이메일"
              className="w-70 focus:outline-none"
              value={formData.email}
              onChange={handleFormInput}
              required
            />
            <button
              type="button"
              className="border border-gray-500 rounded px-1 py-0.5 hover:bg-primary hover:text-white"
              onMouseDown={(e) => e.preventDefault()}
            >
              중복확인
            </button>
          </section>
          <hr className="mb-10 mt-0.5" />
          <input
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={formData.nickname}
            onChange={handleFormInput}
            className="px-2 focus:outline-none"
            required
          />
          <hr className="mb-10 mt-0.5" />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleFormInput}
            className="px-2 focus:outline-none"
            required
          />
          <hr className="mb-15 mt-0.5" />
          <button className="border border-blue bg-primary text-white hover:bg-secondary w-100 h-10 rounded-lg mt-10">
            회원가입
          </button>
        </form>
      </section>
    </section>
  );
}
