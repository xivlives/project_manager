import React from 'react';

const TaskItem = ({ task, onUpdate }) => {
  const handleCompleteTask = async () => {
    await updateTask(task.id, { status: 'completed' });
    onUpdate();  // Refresh the task list after update
  };

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>Status: {task.status}</p>
      <button onClick={handleCompleteTask}>Mark Complete</button>
    </div>
  );
};

export default TaskItem;
