import React from 'react';
import { updateTask } from '@/services/taskService';

const TaskItem = ({ task, onUpdate }) => {
  const handleCompleteTask = async () => {
    await updateTask(task._id, { status: 'completed' });
    onUpdate();  // Refresh the task list after update
  };

  const startTask = async () => {
    await updateTask(task._id, { status: 'in-progress' });
    onUpdate();  // Refresh the task list after update
  };

  return (
    <div className={`relative p-4 w-fit rounded transition-all duration-500 hover:scale-110 ${task.status === 'completed' ? 'bg-green-400' : 'bg-orange-400'}`}>
      <h3 className="text-lg font-semibold pt-4">{task.title}</h3>
      <p>Status: {task.status}</p>
      {task.status === 'in-progress' && (
          <button className='absolute top-0 right-0 py-1 px-2 rounded-tr bg-slate-300' id='task-complete' onClick={handleCompleteTask}>Mark Complete</button>
        )}
      {task.status === 'pending' && (
         <button className='absolute top-0 right-0 py-1 px-2 rounded-tr bg-slate-300' onClick={startTask}>▶️start</button>
      )}
    </div>
  );
};

export default TaskItem;
