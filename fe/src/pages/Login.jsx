import React, { useState } from 'react';
import authApi from '../api/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import SocialLogin from '../components/SocialLogin';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isFormValid, setIsFormValid] = useState(false);

  const handleFormInput = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 이메일, 비밀번호 입력되었는지 확인
    if (formData.username && formData.password) {
      setIsFormValid(true); // 로그인 버튼 활성화
    } else {
      setIsFormValid(false); // 로그인 버튼 비활성화
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authApi.login(formData);
      const data = response.data;

      const { token } = data.data;
      dispatch(login(token));
      alert('로그인 성공');
      navigate('/calendar');
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toHome = () => {
    navigate('/');
  };

  const toSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="flex flex-col items-center gap-15 mt-30">
      <h1 className="text-6xl font-semibold" onClick={toHome}>
        S-Calendar
      </h1>
      <section className="w-100">
        <form onSubmit={handleSubmit} noValidate>
          <input
            className="w-80 px-2 focus:outline-none"
            type="email"
            id="username"
            name="username"
            placeholder="이메일"
            value={formData.username}
            onChange={handleFormInput}
            requried
          />
          <hr className="mt-0.5" />
          <p className="text-red-600 text-[15px] mb-2 text-right invisible">
            <br />
          </p>
          <input
            className="w-80 px-2 focus:outline-none"
            type="password"
            id="password"
            name="password"
            required
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleFormInput}
          />
          <hr className="mt-0.5" />

          {isFormValid ? (
            <p className="text-red-600 text-[15px] mb-6">
              {error !== '' ? (
                error
              ) : (
                <p className="text-red-600 text-[15px] mb-6 text-right invisible">&nbsp;</p>
              )}
            </p>
          ) : (
            <p className="text-red-600 text-[15px] mb-6 text-right invisible">&nbsp;</p>
          )}

          <button
            className="w-full py-2.5 px-4 bg-primary text-white  rounded-md text-base mb-3 hover: cursor-pointer mb-1"
            type="submit"
            // 두 값이 모두 채워지면 disabled={false}, 하나라도 비워있으면 disabled={true}
            // disabled={isFormValid ? true : false}
            disabled={!isFormValid}
          >
            {isLoading ? '처리 중' : '로그인'}
          </button>
        </form>
        <SocialLogin></SocialLogin>
        <button
          className="w-full mt-2 py-2 px-4 bg-white text-gray-600 rounded-md cursor-pointer mb-10 text-[18px]"
          onClick={toSignup}
        >
          회원가입
        </button>
      </section>
    </div>
  );
}
