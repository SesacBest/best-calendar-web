import React, { useState } from 'react'
import DiaryForm from './diary/DiaryForm'
import diaryApi from '../../api/diaryApi';
import { useNavigate, useParams } from 'react-router-dom';

export default function DiaryCreate() {
  const navigate = useNavigate();
  const { date } = useParams();
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await diaryApi.createDiary({ 
        selectedDate: date,
        content,      
      });
      navigate(`/day/${date}/diary`);
    } catch (error) {
      console.error("메모 생성 실패: ", error);
    }
  }
  
  const diaryDiv = "flex items-center flex-col gap-10 mx-20 my-5 text-center";
  const titleStyle = "text-4xl font-semibold min-w-max";
  
  return (
    <div className={diaryDiv}>
      <h1 className={titleStyle}>일기를 작성해 보세요.</h1>
      <DiaryForm
        content={content}
        onContentChange={setContent}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
