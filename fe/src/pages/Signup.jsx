import React, { useState } from 'react';
import authApi from '../api/authApi';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [nicknameTouched, setNicknameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[#?!]).{8,}$/;
  const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,15}$/;

  const isButtonEnabled = formData.username.trim() !== '' && isNicknameValid && isPasswordValid;

  const enabledClasses =
    'border border-blue bg-primary text-white hover:bg-secondary w-full h-10 rounded-lg mt-10';
  const disabledClasses =
    'border border-gray-300 bg-gray-200 text-gray-500 w-full h-10 rounded-lg mt-10 cursor-not-allowed';

  const handleFormInput = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNicknameChange = (e) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      nickname: value,
    }));
    setIsNicknameValid(nicknameRegex.test(value));
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      password: value,
    }));
    setIsPasswordValid(passwordRegex.test(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await authApi.signup(formData);
      alert('회원가입 성공');
      navigate('/calendar');
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
              name="username"
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
            onChange={handleNicknameChange}
            onBlur={() => setNicknameTouched(true)}
            className="px-2 focus:outline-none"
            required
          />
          <hr className="mb-10 mt-0.5" />
          {!isNicknameValid && nicknameTouched && (
            <p className="text-red-600 text-[10px] mb-10">
              닉네임은 한글, 영문, 숫자를 사용할 수 있고, 2자 이상 25자 이하여야 합니다.
            </p>
          )}
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handlePasswordChange}
            onFocus={() => setPasswordTouched(true)}
            className="px-2 focus:outline-none"
            required
          />
          <hr className="mb-10 mt-0.5" />
          {!isPasswordValid && passwordTouched && (
            <p className="text-red-600 text-[10px] mb-10">
              비밀번호는 8자 이상, 영문, 숫자, 특수문자(#, ?, !)가 각각 1자 이상 포함되어야 합니다.
            </p>
          )}
          <button
            className={isButtonEnabled ? enabledClasses : disabledClasses}
            disabled={!isButtonEnabled}
          >
            회원가입
          </button>
        </form>
      </section>
    </section>
  );
}
