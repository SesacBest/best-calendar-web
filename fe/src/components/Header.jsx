import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <section className="flex justify-between">
        <div>S-Calendar</div>
        <nav className="flex gap-8">
          <Link to="/signup">회원가입</Link>
          <Link to="/login">로그인</Link>
        </nav>
      </section>
    </>
  );
}
