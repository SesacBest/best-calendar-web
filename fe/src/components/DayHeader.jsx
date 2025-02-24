import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function DayHeader() {
  const location = useLocation();
  const currentPath = location.pathname;
  const dateMatch = currentPath.match(/\d{4}-\d{2}-\d{2}/);
  const date = dateMatch ? dateMatch[0] : '';

  return (
    <>
      <section>
        <Link to={`/day/${date}/schedule`}>일정</Link>
        <Link to={`/day/${date}/task`}>할일</Link>
        <Link to={`/day/${date}/diary/`}>일기</Link>
      </section>
    </>
  );
}
