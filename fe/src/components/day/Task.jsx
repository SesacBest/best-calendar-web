import React, { useEffect, useState } from 'react'
import Empty from '../Empty'
import { Link, useParams } from 'react-router-dom';
import taskApi from '../../api/TaskApi';

export default function Task() {

  const { date } = useParams();
  
  const [tasks, setTasks] = useState([]);

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
      const { id,checked } = e.target;
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

  return (
     tasks.length == 0 ? <Empty date={date}></Empty> :
    <div>
      {
        tasks.map((task) => {
          const {id, isCompleted, content} = task;
          
          return (
            <ul>
              <input 
                type="checkbox" 
                id={id} 
                onClick={checkUpdate} 
                defaultChecked={isCompleted}
              />
              <li>{content}</li>
              <button 
                id={id} 
                onClick={taskDelete}>
                삭제
              </button>
            </ul>
          )
        })
      }
       <Link to={`./create`}>추가</Link>
    </div>
  )
}
