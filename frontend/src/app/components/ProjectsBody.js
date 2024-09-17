import React, { useState, useEffect } from 'react';
import { getProjects } from '../../services/projectService';
import ProjectCard from '../components/ProjectCard';

const ProjectsBody = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const data = await getProjects();
        setProjects(data);
    };

    return (
        <div className="w-full justify-center items-center">
            <h1 className='text-3xl m-4 font-bold text-slate-300 text-center'> My Projects </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))} 
            </div>

        </div>
    );
};

export default ProjectsBody;