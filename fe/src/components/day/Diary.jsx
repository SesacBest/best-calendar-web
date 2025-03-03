import React, { useEffect, useState } from 'react'
import { editorStyles } from './diary/styles/editorStyles'
import { useParams } from 'react-router-dom'
import diaryApi from '../../api/diaryApi';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Empty from '../Empty';

export default function Diary() {
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
      console.log(response.data.data);
      setDiary(response.data.data);
      if (response.data.data) {
        editor?.commands.setContent(response.data.data.content);
      }
    } catch (error) {
      console.error("일기 조회 실패: ", error);
    } finally {
      setIsLoading(false);
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
            <button className={`${editorStyles.ButtonStyle} text-gray-500`}>삭제</button>
            <button className={`${editorStyles.ButtonStyle} text-primary`}>수정</button>
          </div>
        </div>
      ) : (
        <Empty date={date} />
      )}
    </div>
  )
}
