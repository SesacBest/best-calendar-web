import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function DayHeader() {
  const location = useLocation();
  const currentPath = location.pathname;
  const dateMatch = currentPath.match(/\d{4}-\d{2}-\d{2}/);
  const date = dateMatch ? dateMatch[0] : '';

  const linkStyle = 'px-3 py-2 mr-2 rounded-lg text-gray-500 hover:bg-primary hover:text-white border';
  const activeLinkStyle = 'text-primary';

  const isActive = (path) => {
    return currentPath.includes(path);
  }

  return (
    <>
      <section className='pt-4 flex justify-between'>
        <nav className='flex'>
          <Link to={`/day/${date}/schedule`} className={`${linkStyle} ${isActive('/schedule') ? activeLinkStyle : ''}`}>일정</Link>
          <Link to={`/day/${date}/task`} className={`${linkStyle} ${isActive('/task') ? activeLinkStyle : ''}`}>할일</Link>
          <Link to={`/day/${date}/diary`} className={`${linkStyle} ${isActive('/diary') ? activeLinkStyle : ''}`}>일기</Link>
        </nav>
        <div className='self-center text-lg'>{date}</div>
      </section>
    </>
  );
}
