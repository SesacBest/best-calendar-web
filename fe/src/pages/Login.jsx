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
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormInput = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authApi.login(formData);
      const data = response.data;

      const { token } = data.data;
      console.log(token);
      dispatch(login(token));
      navigate('/calendar');
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-col gap-10 m-40 text-center">
      <Link to="/">
        <h1 className="text-5xl font-semibold">S-Calendar</h1>
      </Link>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 w-100">
          <div className="space-y-2">
            <label htmlFor="username"></label>
            <input
              className="w-full py-2.5 text-gray-900 bg-transparent border-0 border-b border-gray-300 
                  focus:outline-none focus:border-gray-900 focus:ring-0 text-sm"
              id="username"
              name="username"
              required
              placeholder="이메일"
              value={formData.username}
              onChange={handleFormInput}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password"></label>
            <input
              className="w-full py-2.5 text-gray-900 bg-transparent border-0 border-b border-gray-300 
                  focus:outline-none focus:border-gray-900 focus:ring-0 text-sm"
              type="password"
              id="password"
              name="password"
              required
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleFormInput}
            />
          </div>

          {error && <div style={{color : "red"}}>{error}</div>}

          <button
            className="w-full py-2 px-4 bg-primary text-white rounded-md text-base
                hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            type="submit"
          >
            {isLoading ? '처리중...' : '로그인'}
          </button>

          <nav className="text-center text-base text-gray-600">
            <Link to="/signup">회원가입</Link>
          </nav>
        </div>
      </form>
    </div>
  );
}
