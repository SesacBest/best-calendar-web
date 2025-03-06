import React from 'react';

export default function Home() {
  return (
    <section>
      <section>
        <main className="flex flex-col gap-10 mx-40 my-40 text-center">
          <h1 className="text-5xl font-semibold">Calendar의 모든 것</h1>
          <h1 className="relative text-5xl font-semibold">
            <span className="z-10 relative inline-block">S-Calendar</span><span className='z-10 relative'>에서 쉽고 간편하게</span> 
            <span className="absolute w-65 left-1/13 bottom-1 block h-1 bg-[#71c4ef] opacity-80 -skew-x-20 -skew-y-2"></span> 
            <span className="absolute w-68 left-1/13 bottom-0 block h-1 bg-[#71c4ef] opacity-80 -skew-x-20 -skew-y-2"></span> 
          </h1>
          <section className="flex gap-35 justify-center mt-30 text-[27px]">
            {/* 각각의 텍스트와 형광펜 효과를 그룹화 */}
            <div className="relative">
              <span className="z-10 relative">일정</span>
              <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 block h-1 w-[115%] bg-[#71c4ef] opacity-60 -skew-x-20 -skew-y-3"></span>
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 block h-1 w-[126%] bg-[#71c4ef] opacity-60 -skew-x-20 -skew-y-3"></span>
            </div>
            <div className="relative">
              <span className="z-10 relative">할일</span>
              <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 block h-1 w-[115%] bg-[#71c4ef] opacity-60 -skew-x-20 -skew-y-3"></span>
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 block h-1 w-[126%] bg-[#71c4ef] opacity-60 -skew-x-20 -skew-y-3"></span>
            </div>
            <div className="relative">
              <span className="z-10 relative">일기</span>
              <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 block h-1 w-[115%] bg-[#71c4ef] opacity-60 -skew-x-20 -skew-y-3"></span>
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 block h-1 w-[126%] bg-[#71c4ef] opacity-60 -skew-x-20 -skew-y-3"></span>
            </div>
          </section>
        </main>
      </section>
    </section>
  );
}
