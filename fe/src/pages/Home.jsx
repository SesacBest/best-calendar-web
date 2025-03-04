import React from 'react';

export default function Home() {
  return (
    // <section>
    //   <section>
    //     <main className="flex flex-col gap-10 mx-40 my-36 text-center">
    //       <h1 className="text-5xl font-semibold">Calendar의 모든 것</h1>
    //       <h1 className="text-5xl font-semibold">
    //         <span className="relative inline-block custom-hand-circle">S-Calendar</span>에서 쉽고
    //         간편하게
    //       </h1>
    //       <span className="relative inline-block">
    //         <section className="flex gap-28 justify-center mt-20 text-[27px]">
    //           {/* <span className="z-10">달력</span>
    //           <span className="absolute w-15 left-27 right-0 bottom-1 block h-3 bg-[#d4eaf7] opacity-100 -skew-x-20 -skew-y-7"></span> */}
    //           <span className="z-10">일정</span>
    //           <span className="absolute w-15 left-45 right-0 bottom-1 block h-3 bg-[#b6ccd8] opacity-80 -skew-x-20 -skew-y-7"></span>
    //           <span className="z-10">할일</span>
    //           <span className="absolute w-15 left-85 right-0 bottom-1 block h-3 bg-[#b6ccd8] opacity-80 -skew-x-20 -skew-y-7"></span>
    //           <span className="z-10">일기</span>
    //           <span className="absolute w-15 left-124 right-0 bottom-1 block h-3 bg-[#b6ccd8] opacity-80 -skew-x-20 -skew-y-7"></span>
    //         </section>
    //       </span>
    //     </main>
    //   </section>
    // </section>

    <section>
      <section>
        <main className="flex flex-col gap-10 mx-40 my-36 text-center">
          <h1 className="text-5xl font-semibold">Calendar의 모든 것</h1>
          <h1 className="text-5xl font-semibold">
            <span className="relative inline-block custom-hand-circle">S-Calendar</span>에서 쉽고
            간편하게
          </h1>
          <section className="flex gap-30 justify-center mt-20 text-[27px]">
            {/* 각각의 텍스트와 형광펜 효과를 그룹화 */}
            <div className="relative">
              <span className="z-10 relative">일정</span>
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 block h-3 w-[120%] bg-[#b6ccd8] opacity-80 -skew-x-20 -skew-y-7"></span>
            </div>
            <div className="relative">
              <span className="z-10 relative">할일</span>
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 block h-3 w-[120%] bg-[#b6ccd8] opacity-80 -skew-x-20 -skew-y-7"></span>
            </div>
            <div className="relative">
              <span className="z-10 relative">일기</span>
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 block h-3 w-[120%] bg-[#b6ccd8] opacity-80 -skew-x-20 -skew-y-7"></span>
            </div>
          </section>
        </main>
      </section>
    </section>
  );
}
