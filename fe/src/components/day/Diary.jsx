import React, { useEffect, useState } from 'react'
import { editorStyles } from './diary/styles/editorStyles'
import { useNavigate, useParams } from 'react-router-dom'
import diaryApi from '../../api/diaryApi';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Empty from '../Empty';

export default function Diary() {
  const navigate = useNavigate();
  const { date } = useParams();
  const [diary, setDiary] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        defaultAlignment: "left",
      })
    ],
    editable: false,  // 읽기 전용
    content: diary?.content,
  });

  const fetchDiary = async () => {
    try {
      const response = await diaryApi.getDiary(date);
      setDiary(response.data);
      if (response.data) {
        editor?.commands.setContent(response.data.content);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDiary = async () => {
    try {
      const id = diary?.id;
      await diaryApi.deleteDiary(id);
      navigate(0);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchDiary();
  }, [date, editor]);

  const diaryDiv = "flex items-center flex-col gap-10 mx-20 my-5 text-center";
  const titleStyle = "text-4xl font-semibold min-w-max";

  return (
    <div className={diaryDiv}>
      <h1 className={titleStyle}>오늘 일기</h1>
      {isLoading ? (
        <p>로딩 중</p>
      ) : diary ? (
        <div className='w-full max-w-xl'>
          <div className={`${editorStyles.DiaryForm} ${editorStyles.editorDiv}`}>
            <EditorContent editor={editor} />
          </div>
          <div className={editorStyles.ButtonDiv}>
            <button
              className={`${editorStyles.ButtonStyle} text-gray-500`}
              onClick={deleteDiary}
            >
              삭제
            </button>
            <button className={`${editorStyles.ButtonStyle} text-primary`}>수정</button>
          </div>
        </div>
      ) : (
        <Empty date={date} />
      )}
    </div>
  )
}
