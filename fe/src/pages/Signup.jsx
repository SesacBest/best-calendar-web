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

  /**
   * nickname
   * 
   * isValid - 닉네임 유효성, 
   * isTouched (+ onBlur) - 입력란에서 벗어나 다른 곳에 포커스가 옮겨가면 오류 메시지가 나타나도록 설정 
   */

  /**
   * password
   * 
   * isValid - 비밀번호 유효성
   * isTouched (+ onFocus) - 입력란에 포커스가 됐을 때 오류 미시지가 나타나도록 설정
   * isEqual - 입력된 두 비밀번호가 같은지 확인
   * verifiedValue - 비밀번호 확인 입력란에 입력된 비밀번호 
   */

  /**
   * email
   * 
   * isClicked - 중복확인 버튼이 클릭되면 값 변경
   * status - 중복확인이 된 후 사용가능하면 'OK'값이 저장됨 
   */

  const [validation, setValidation] = useState({
    nickname: { isValid: false, isTouched: false },
    password: { isValid: false, isTouched: false, isEqual: false, verifiedValue: '' },
    email: { isClicked: false, status: '' },
  });

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[#?!]).{8,}$/;
  const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,15}$/;

  const isButtonEnabled =
    formData.username.trim() !== '' &&
    validation.nickname.isValid &&
    validation.password.isValid &&
    validation.password.isEqual &&
    validation.email.status === 'OK';

  const enabledClasses =
    'border border-blue bg-primary text-white hover:bg-secondary w-full h-10 rounded-lg mt-10';
  const disabledClasses =
    'border border-gray-300 bg-gray-200 text-gray-500 w-full h-10 rounded-lg mt-10 cursor-not-allowed';

  const validPassword = 'text-primary px-2 w-100 focus:outline-none';
  const noValidPassword = 'text-red-600 px-2 w-100 focus:outline-none';

  const availableEmail = (
    <p className="text-primary text-[15px] mt-1 mb-6 ">사용가능한 이메일입니다.</p>
  );
  const noAvailableEmail = (
    <p className="text-red-600 text-[15px] mt-1 mb-6">이미 사용 중인 이메일입니다.</p>
  );

  const handleFormInput = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'username') {
      setValidation((prev) => ({
        ...prev,
        email: { isClicked: false, status: '' },
      }));
    }
  };

  const handleNicknameChange = (e) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      nickname: value,
    }));
    setValidation((prev) => ({
      ...prev,
      nickname: { ...prev.nickname, isValid: nicknameRegex.test(value) },
    }));
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      password: value,
    }));
    setValidation((prev) => ({
      ...prev,
      password: { ...prev.password, isValid: passwordRegex.test(value) },
    }));
  };

  const handleVerifyPassword = (e) => {
    const { value } = e.target;
    setValidation((prev) => ({
      ...prev,
      password: { ...prev.password, verifiedValue: value, isEqual: value === formData.password },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await authApi.signup(formData);
      alert('회원가입 성공');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  const toHome = () => {
    navigate('/');
  };

  const checkEmailAvailability = async () => {
    setError('');

    try {
      const response = await authApi.checkEmailAvailability(formData.username);
      const data = response.data;
      setValidation((prev) => ({
        ...prev,
        email: { ...prev.email, isClicked: true, status: data.code },
      }));
      console.log(data.code);
    } catch (err) {
      setError(err.message);
      setValidation((prev) => ({
        ...prev,
        email: { ...prev.email, isClicked: true, status: '' },
      }));
      console.log(err.message);
    }
  };

  return (
    <section className="flex flex-col items-center gap-15 mt-30">
      <h1 className="text-6xl font-semibold" onClick={toHome}>
        S-Calendar
      </h1>
      <h2 className="text-[28px] font-semibold mb-10">쉽고 간편한 달력, 지금 시작해 보세요</h2>
      <section className="w-100">
        <form onSubmit={handleSubmit}>
          <section className="flex justify-between">
            <input
              type="email"
              name="username"
              placeholder="이메일"
              autoComplete="email"
              className="w-80 px-2 focus:outline-none"
              value={formData.email}
              onChange={handleFormInput}
              required
            />
            <button
              type="button"
              className="border border-gray-500 rounded w-20 px-1 py-0.5 hover:bg-primary hover:text-white"
              onMouseDown={(e) => e.preventDefault()}
              onClick={checkEmailAvailability}
            >
              중복확인
            </button>
          </section>
          <hr className=" mt-0.5" />
          {validation.email.isClicked ? (
            validation.email.status === 'OK' ? (
              availableEmail
            ) : (
              noAvailableEmail
            )
          ) : (
            <p className="text-primary text-[15px] mt-1 mb-6 invisible ">
              사용가능한 이메일입니다.
            </p>
          )}
          <input
            type="text"
            name="nickname"
            placeholder="닉네임(2자 이상)"
            autoComplete="username"
            value={formData.nickname}
            onChange={handleNicknameChange}
            onBlur={() =>
              setValidation((prev) => ({
                ...prev,
                nickname: { ...prev.nickname, isTouched: true },
              }))
            }
            className="px-2 w-100 focus:outline-none"
            required
          />
          <hr className="mt-0.5" />
          {!validation.nickname.isValid && validation.nickname.isTouched ? (
            <p className="text-red-600 text-[15px] mb-7 text-right">
              특수문자 제외, 2자 이상 15자 이하여야 합니다.
            </p>
          ) : (
            <p className="text-red-600 text-[15px] mb-7 text-right invisible">
              특수문자 제외, 2자 이상 15자 이하여야 합니다.
            </p>
          )}
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            autoComplete="current-password"
            value={formData.password}
            onChange={handlePasswordChange}
            onFocus={() =>
              setValidation((prev) => ({
                ...prev,
                password: { ...prev.password, isTouched: true },
              }))
            }
            className="px-2 w-100 focus:outline-none"
            required
          />
          <hr className="mt-0.5" />
          {!validation.password.isValid && validation.password.isTouched ? (
            <p className="text-red-600 text-[15px] mb-2 text-right">
              8자 이상, 영문, 숫자, 특수문자(#, ?, !)가<br /> 각각 1자 이상 포함되어야 합니다.
            </p>
          ) : (
            <p className="text-red-600 text-[15px] mb-2 text-right invisible">
              8자 이상, 영문, 숫자, 특수문자(#, ?, !)가<br /> 각각 1자 이상 포함되어야 합니다.
            </p>
          )}
          <input
            type="password"
            name="verifyPassword"
            placeholder="비밀번호 확인"
            autoComplete="new-password"
            onChange={handleVerifyPassword}
            value={validation.password.verifiedValue}
            onBlur={() =>
              setValidation((prev) => ({
                ...prev,
                password: { ...prev.password, isTouched: true },
              }))
            }
            className={validation.password.isEqual ? validPassword : noValidPassword}
            required
          />
          <hr className="mb-10 mt-0.5" />
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
