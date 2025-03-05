import React, { useEffect, useState } from 'react';
import { editorStyles } from './diary/styles/editorStyles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import diaryApi from '../../api/diaryApi';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Empty from '../Empty';

import './diary/styles/DiaryEditor.css';

export default function Diary() {
  const navigate = useNavigate();
  const { date } = useParams();
  const [diary, setDiary] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment: 'left',
      }),
      Highlight,
    ],
    editable: false, // 읽기 전용
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

  useEffect(() => {
    fetchDiary();
  }, [date, editor]);

  const deleteDiary = async () => {
    try {
      const id = diary?.id;
      await diaryApi.deleteDiary(id);
      navigate(0);
    } catch (error) {}
  };

  const diaryDiv = 'flex items-center flex-col gap-10 mx-20 my-5 text-center';
  const titleStyle = 'text-4xl font-semibold min-w-max';

  return (
    <div className={diaryDiv}>
      <h1 className={titleStyle}>오늘 일기</h1>
      {isLoading ? (
        <p>로딩 중</p>
      ) : diary ? (
        <div className="w-full max-w-xl">
          <div className={`${editorStyles.DiaryForm} ${editorStyles.editorDiv}`}>
            <EditorContent editor={editor} />
          </div>
          <div className={editorStyles.ButtonDiv}>
            <button className={`${editorStyles.ButtonStyle} text-gray-500`} onClick={deleteDiary}>
              삭제
            </button>
            <Link className={`${editorStyles.ButtonStyle} text-primary`} to={'./create'}>
              수정
            </Link>
          </div>
        </div>
      ) : (
        <Empty date={date} />
      )}
    </div>
  );
}
