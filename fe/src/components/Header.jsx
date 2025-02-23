import React from 'react';

export default function Header() {
  return (
    <>
      <section className="flex justify-between">
        <div>S-Calendar</div>
        <section className="flex gap-8">
          <div>회원가입</div>
          <div>로그인</div>
        </section>
      </section>
    </>
  );
}
