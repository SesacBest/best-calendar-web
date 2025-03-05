import React, { useEffect, useState } from 'react'
import DiaryForm from './diary/DiaryForm'
import diaryApi from '../../api/diaryApi';
import { useNavigate, useParams } from 'react-router-dom';

export default function DiaryCreate() {
  const navigate = useNavigate();
  const { date } = useParams();
  const [diary, setDiary] = useState();
  const [content, setContent] = useState("");
  const [isEdit, SetIsEdit] = useState(false);

  const fetchDiary = async () => {
    try {
      const response = await diaryApi.getDiary(date);
      if (response.data) {
        setDiary(response.data);
        setContent(response.data.content);
        SetIsEdit(true);
      }
    } catch (error) {
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

  const diaryDiv = "flex items-center flex-col gap-15 mt-15";
  const titleStyle = "text-4xl font-semibold min-w-max";

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