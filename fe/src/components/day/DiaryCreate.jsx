import React, { useEffect, useState } from 'react'
import DiaryForm from './diary/DiaryForm'
import diaryApi from '../../api/diaryApi';
import { useNavigate, useParams } from 'react-router-dom';

export default function DiaryCreate() {
  const navigate = useNavigate();
  const { date } = useParams();
  const [diary, setDiary] = useState();
  const [content, setContent] = useState("");
  const [isLoading, SetIsLoading] = useState(true);
  const [isEdit, SetIsEdit] = useState(false);

  const fetchDiary = async () => {
    try {
      SetIsLoading(true);
      const response = await diaryApi.getDiary(date);
      if (response.data) {
        setDiary(response.data);
        setContent(response.data.content);
        SetIsEdit(true);
      }
    } catch (error) {
    } finally {
      SetIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiary();
  }, [date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await diaryApi.updateDiary(diary.id, { content });
      } else {
        await diaryApi.createDiary({ 
          selectedDate: date,
          content,      
        });
      }
      navigate(`/day/${date}/diary`);
    } catch (error) {
    }
  }

  const handleContentChange = (newContent) => {
    setContent(newContent);
  }

  const diaryDiv = "flex items-center flex-col gap-10 mx-20 my-5 text-center";
  const titleStyle = "text-4xl font-semibold min-w-max";
  
  if (isLoading) {
    return <div>로딩 중</div>
  }

  return (
    <div className={diaryDiv}>
      <h1 className={titleStyle}>
        {isEdit ? "일기를 수정해 보세요." : "일기를 작성해 보세요."}
      </h1>
      <DiaryForm
        content={content}
        onContentChange={handleContentChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
