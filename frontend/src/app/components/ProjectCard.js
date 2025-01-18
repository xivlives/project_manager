import React from 'react';
import Link from 'next/link';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold text-slate-700 mb-2">{project.title}</h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
      <p className="text-sm text-slate-500 mb-4">
        <span className="font-semibold">{project.taskCount}</span> tasks
      </p>
      <Link href={`/projects/${project._id}/tasks`} legacyBehavior={true}>
        <a className="block text-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
          View Tasks
        </a>
      </Link>
    </div>
  );
};

export default ProjectCard;
