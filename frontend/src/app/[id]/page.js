'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '', due_date: '' });
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            fetch(`/api/projects/${id}/tasks`)
                .then(res => res.json())
                .then(data => setTasks(data));
        }
    }, [id]);

    const handleCreateTask = async () => {
        await fetch(`/api/projects/${id}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask),
        });
        setNewTask({ title: '', description: '', due_date: '' });
        const res = await fetch(`/api/projects/${id}/tasks`);
        const data = await res.json();
        setTasks(data);
    };

    return (
        <div>
            <h1>Tasks for Project {id}</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        {task.title} - {task.status} (Due: {new Date(task.due_date).toLocaleDateString()})
                    </li>
                ))}
            </ul>
            <div>
                <h2>Create New Task</h2>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <textarea
                    placeholder="Task Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                <input
                    type="date"
                    value={newTask.due_date}
                    onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                />
                <button onClick={handleCreateTask}>Create Task</button>
            </div>
        </div>
    );
};

export default TaskList;
