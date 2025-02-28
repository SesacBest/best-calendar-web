import React from 'react'
import DiaryForm from './diary/DiaryForm'

export default function DiaryCreate() {
  return (
    <div className="flex items-center flex-col gap-10 m-20 text-center">
      <h1 className="text-4xl font-semibold min-w-max">일기를 작성해 보세요.</h1>
      <DiaryForm />
    </div>
  )
};
