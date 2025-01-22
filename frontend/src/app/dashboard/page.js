"use client";
import React, { useState, useEffect } from 'react';
import { getProjects } from '@/services/projectService';
import { getTasks } from '@/services/taskService';
import ProjectCard from '../components/ProjectCard';
import PieChart from '../components/charts/PieChart';
import TimelineChart from '../components/charts/TimelineChart';
import StatCard from '../components/StatCard';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState({
        totalProjects: 0,
        totalTasks: 0,
        completedTasks: 0,
        quickestTask: null
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const projectsData = await getProjects();
        const tasksData = await Promise.all(
            projectsData.map(project => getTasks(project._id))
        );
        
        // Ensure projects include `startDate` and `endDate`
        const projectsWithDates = projectsData.map(project => ({
            ...project,
            startDate: project.dateCreated || '2025-01-01', // Default if missing
            endDate: project.completionDate || '2025-12-31', // Default if missing
        }));
    
        setProjects(projectsWithDates);
        setTasks(tasksData.flat());
        calculateStats(projectsWithDates, tasksData.flat());
    };
    

    const calculateStats = (projects, tasks) => {
        const completedTasks = tasks.filter(task => task.status === 'completed');
        const quickestTask = tasks.reduce((fastest, current) => {
            if (!fastest) return current;
            return current.completion_time < fastest.completion_time ? current : fastest;
        }, null);

        setStats({
            totalProjects: projects.length,
            totalTasks: tasks.length,
            completedTasks: completedTasks.length,
            quickestTask
        });
    };

    return (
        <div className="p-6 ml-64 h-fit">
            <h1 className="text-3xl text-center font-bold text-slate-400 mb-8">Dashboard</h1>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard title="Total Projects" value={stats.totalProjects} />
                <StatCard title="Total Tasks" value={stats.totalTasks} />
                <StatCard title="Completed Tasks" value={stats.completedTasks} />
                <StatCard
                    title="Quickest Task" 
                    value={stats.quickestTask?.title || 'N/A'} 
                    subtitle={`Completed in ${stats.quickestTask?.completion_time || 0} days`}
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Task Status Distribution</h2>
                    <PieChart 
                        data={[
                            { name: 'Completed', value: stats.completedTasks },
                            { name: 'Pending', value: stats.totalTasks - stats.completedTasks }
                        ]} 
                    />
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Project Timeline</h2>
                    <TimelineChart data={projects} />
                </div>
            </div>

            {/* Recent Projects */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.slice(0, 6).map(project => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;