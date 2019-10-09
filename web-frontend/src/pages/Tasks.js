import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './Tasks.css';

export default function Tasks({ location }) {
  const [tasks, setTasks] = useState([]);
  const token = location.state.token;

  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await api.get('/tasks', {
          headers: { "Authorization": token }
        });
        if (response.status === 200) {
          console.log(response.data);
          setTasks(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    loadTasks();
  }, [token]);

  return (
    <div className="content">
      {tasks.map((task) => (
        <div className="task" key={task._id}>
          <p>{task.description}</p>
          <input
            type="checkbox"
            name="completed"
            id="completed"
            checked={task.completed}
            onChange={()=>{}}
          />
        </div>
      ))}
    </div>
  );
}
