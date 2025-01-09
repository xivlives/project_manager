import React from 'react';
import Link from 'next/link';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card bg-gray-400 p-4 rounded-lg">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <p>{project.taskCount} tasks</p>
      <Link href={`/projects/${project._id}/tasks`} legacyBehavior={true}>
        <a>View Tasks</a>
      </Link>
    </div>
  );
};

export default ProjectCard;
