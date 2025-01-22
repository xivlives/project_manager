import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchProjectProgress, markProjectAsComplete } from '../../services/projectService';

const ProjectCard = ({ project, onProjectUpdate }) => {
  const [progress, setProgress] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProgress();
  }, [project._id]);

  const getProgress = async () => {
    try {
      setIsLoading(true);
      const data = await fetchProjectProgress(project._id);
      setProgress(data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkComplete = async () => {
    try {
      await markProjectAsComplete(project._id);
      alert('Project marked as completed!');
      onProjectUpdate(); // Notify parent to refresh project list
    } catch (error) {
      console.error('Error marking project as complete:', error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold text-slate-700 mb-2">{project.title}</h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
      <p className="text-sm text-slate-500 mb-2">
        {progress.isCompleted ? (
          <span className="text-green-600 font-semibold">Completed</span>
        ) : (
          <>
            <span className="font-semibold">{progress.inProgressTasks || 0}</span> in progress,{' '}
            <span className="font-semibold">{progress.completedTasks || 0}</span> completed
          </>
        )}
      </p>
      <p className="text-sm text-slate-500 mb-4">
        Total Tasks: <span className="font-semibold">{progress.totalTasks || 0}</span>
      </p>
      {!progress.isCompleted && (
        <button
          onClick={handleMarkComplete}
          className="block w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300 mb-4"
        >
          Mark as Complete
        </button>
      )}
      <Link href={`/projects/${project._id}/tasks`} legacyBehavior={true}>
        <a className="block text-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
          View Tasks
        </a>
      </Link>
    </div>
  );
};

export default ProjectCard;
