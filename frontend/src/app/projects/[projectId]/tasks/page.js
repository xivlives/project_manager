import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask } from '../../../services/taskService';
import TaskItem from '../../../components/TaskItem';

const TasksPage = ({ params }) => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks(params.projectId);
    setTasks(data);
  };

  const handleAddTask = async () => {
    await createTask(params.projectId, { title: newTaskTitle });
    fetchTasks();
  };

  return (
    <div>
      <h1>Tasks for Project</h1>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onUpdate={fetchTasks} />
        ))}
      </div>

      <div className="task-create">
        <input 
          type="text" 
          value={newTaskTitle} 
          onChange={(e) => setNewTaskTitle(e.target.value)} 
          placeholder="New Task Title" 
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

export default TasksPage;
