import React, { useEffect, useState } from 'react';
import Empty from '../Empty';
import { useNavigate, useParams } from 'react-router-dom';
import taskApi from '../../api/TaskApi';

export default function Task() {
  const { date } = useParams();

  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await taskApi.tasks(date);
        const data = response.data.data;

        setTasks(data);
        setIsLoading(true);
      } catch (err) {}
    }
    fetchTasks();
  }, []);

  const checkUpdate = async (e) => {
    try {
      const { id, checked } = e.target;
      await taskApi.taskupdate(id, checked);
    } catch (err) {}
  };

  const taskDelete = async (e) => {
    try {
      const { id } = e.target;

      await taskApi.taskdelete(id);
      setTasks(tasks.filter((task) => task.id != id));
    } catch (err) {}
  };

  const taskcreate = async (e) => {
    try {
      navigate("./create");
    } catch (err) {}
  };

  return tasks.length == 0 ? (
    <Empty date={date}></Empty>
  ) : (
    <div className="flex flex-col items-center gap-15 mt-15">
      <h1 className="text-4xl font-semibold min-w-max">오늘 할 일</h1>

      <div className="h-80 overflow-y-auto">
        <ul className="mx-20">
          {tasks.map((task) => {
            const { id, isCompleted, content } = task;

            return (
              <li className="flex gap-10 mt-10 mb-15">
                <input
                  type="checkbox"
                  id={id}
                  onClick={checkUpdate}
                  defaultChecked={isCompleted}
                  className="w-6 h-7 text-lg"
                />
                <div>
                  <div className="text-xl">{content}</div>
                  <hr className="mt-0.5 w-100" />
                </div>
                <button
                  className="px-3 py-2 w-15 border rounded-lg border-black text-primary hover:bg-primary hover:text-white"
                  id={id}
                  onClick={taskDelete}
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
        onClick={taskcreate}
      >
        추가
      </button>
    </div>
  );
}

