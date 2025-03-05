import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Empty({ children }) {
  const navigate = useNavigate();

  const nowcreate = async (e) => {
    try {
      navigate('./create');
    } catch (err) {}
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-sans mt-20 min-w-max">{children} 추가해 보세요.</h1>
      <button
        onClick={nowcreate}
        className="px-3 py-2 w-15 border rounded-lg text-white bg-primary mx-auto mt-30 mb-10"
      >
        추가
      </button>
    </div>
  );
}
