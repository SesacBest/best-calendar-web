import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import scheduleApi from '../../api/scheduleApi';
import Empty from '../Empty'
import { Link } from "react-router-dom";

export default function Schedule() {

  const { date } = useParams();

  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    async function fetchSchedules() {
      try {
        const response = await scheduleApi.schedules(date);
        setSchedules(response.data.data);
      } catch (err) {}
      // finally {
      //   setLoading(false);
      // }
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

  return (
    schedules.length == 0 ? <Empty date={date}></Empty> :
    <div>
      <ul>
        {schedules.map((schedule) => {
          const { id, scheduleTime, content } = schedule;

          console.log(scheduleTime);
          console.log(content);

          return (
            <li>
              <div>{scheduleTime}</div>
              <div>{content}</div>
              <button id={id} onClick={scheduledelete}>
                삭제
              </button>
            </li>
          );
        })}
      </ul>
      <Link to={`./create`}>추가</Link>
    </div>
  );
}
