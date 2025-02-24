import React, { useState } from 'react';
import authApi from '../api/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';

export default function Login() {
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormInput = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name] : value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await authApi.login(formData);
      const data = response.data;

      const {token} = data.data;
      dispatch(login(token));
      navigate('/calendar');

    } catch (err) {
      setError(err.message || "로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 m-40 text-center">
      <h1 className="text-5xl font-semibold">S-Calendar</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username"></label>
          <input
          id="username"
          name="username"
          required
          placeholder="이메일"
          value={formData.username}
          onChange={handleFormInput}
          />
        </div>

        <div>
          <label htmlFor="password"></label>
          <input
          type="password"
          id="password"
          name="password"
          required
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleFormInput}
          />
        </div>

        <button
        type="submit">
        로그인
        </button>

        <nav>
          <Link to="/signup">회원가입</Link>
        </nav>

      </form>
    </div>
  );
}
