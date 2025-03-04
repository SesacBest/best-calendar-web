import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

export default function DayHeader() {
  const { date } = useParams();

  const linkStyle = 'px-3 py-2 mr-2 rounded-lg text-gray-500 hover:bg-primary hover:text-white border';
  const activeLinkStyle = 'text-primary';

  return (
    <>
      <section className='pt-4 flex justify-between'>
        <nav className='flex'>
          <NavLink to={`/day/${date}/schedule`} className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>일정</NavLink>
          <NavLink to={`/day/${date}/task`} className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>할일</NavLink>
          <NavLink to={`/day/${date}/diary`} className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>일기</NavLink>
        </nav>
        <div className='self-center text-lg'>{date}</div>
      </section>
    </>
  );
}
