"use client";
import React, { useState, useEffect } from 'react';
import { getProjects } from '../../services/projectService';
import ProjectCard from '../components/ProjectCard';
import LoadSpinner from '../components/LoadSpinner';
import { useRouter } from 'next/navigation'; // Import from 'next/navigation' instead of 'next/router'

const ProjectsBody = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Use the correct `useRouter` from 'next/navigation'
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId'); // Retrieve userId from localStorage
    if (storedUserId) {
      console.log('User ID found in localStorage:', storedUserId);
      setUserId(storedUserId);
    } else {
      console.error("User ID not found in localStorage.");
    }
  }, []);

  useEffect(() => {
    if (userId) {
      console.log('Fetching projects for user ID:', userId);
      fetchProjects();
    }
  }, [userId]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const data = await getProjects(userId);
      setProjects(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setIsLoading(false);
    }
  };

  const handleProjectUpdate = () => {
    // Refresh the projects list after an update
    fetchProjects();
  };

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <LoadSpinner />
        </div>
      )}
      {!isLoading && projects.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <h2 className="text-2xl text-gray-300 mb-4">No Projects Yet</h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            onClick={() => router.push('/projects/add')} // Use router.push correctly
          >
            Add Project
          </button>
        </div>
      ) : (
        <div className="w-fit ml-64 h-screen justify-center items-center">
          <h1 className="text-3xl m-4 font-bold text-slate-300 text-center">
            My Projects
          </h1>
          <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onProjectUpdate={handleProjectUpdate}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsBody;
