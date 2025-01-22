import React, { useState, useEffect } from 'react';
import { getProjects } from '../../services/projectService';
import ProjectCard from '../components/ProjectCard';
import LoadSpinner from '../components/LoadSpinner';

const ProjectsBody = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
        setIsLoading(true);
      const data = await getProjects();
      setProjects(data);
        setIsLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleProjectUpdate = () => {
    // Refresh the projects list after an update
    fetchProjects();
  };

  return (
    <>
      {isLoading && 
      <div className='flex justify-center items-center h-screen'>
        <LoadSpinner />
      </div>}
      <div className="w-fit ml-64 h-fit justify-center items-center">
        <h1 className="text-3xl m-4 font-bold text-slate-300 text-center">My Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard 
              key={project._id} 
              project={project} 
              onProjectUpdate={handleProjectUpdate} 
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectsBody;
