import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import scheduleApi from '../../api/scheduleApi';
import Empty from '../Empty';

export default function Schedule() {
  const { date } = useParams();

  const [schedules, setSchedules] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSchedules() {
      try {
        const response = await scheduleApi.schedules(date);
        setSchedules(response.data.data);
      } catch (err) {}
    }
    fetchSchedules();
  }, []);

  const scheduledelete = async (e) => {
    try {
      const { id } = e.target;

      await scheduleApi.scheduledelete(id);
      setSchedules(schedules.filter((schedule) => schedule.id != id));
    } catch (err) {}
  };

  const schedulecreate = async (e) => {
    try {
      navigate('./create');
    } catch (err) {}
  };

  return (
    <div className="flex flex-col items-center gap-15 mt-15">
      <h1 className="text-4xl font-semibold min-w-max">오늘 일정</h1>
      {schedules.length == 0 ? (
        <Empty>일정</Empty>
      ) : (
        <>
          <div className="h-80 overflow-y-auto">
            <ul className="mx-20">
              {schedules.map((schedule) => {
                const { id, scheduleTime, content } = schedule;

                return (
                  <li className="flex gap-10 mt-10 mb-15">
                    <div className="w-10 font-mono text-lg">{scheduleTime}</div>
                    <div>
                      <div className="text-xl">{content}</div>
                      <hr className="mt-0.5 w-100" />
                    </div>
                    <button
                      className="px-3 py-2 w-15 border rounded-lg border-black text-primary hover:bg-primary hover:text-white"
                      id={id}
                      onClick={scheduledelete}
                    >
                      삭제
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <button
            className="px-3 py-2 w-15 border rounded-lg text-white bg-primary mx-auto my-auto"
            onClick={schedulecreate}
          >
            추가
          </button>
        </>
      )}
    </div>
  );
}
