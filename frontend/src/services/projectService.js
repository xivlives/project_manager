import api from '../utils/api';

// Fetch all projects
export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

// Create a new project
export const createProject = async (project) => {
  const response = await api.post('/projects/projects', project);
  return response.data;
};

// Fetch a specific project by ID
export const fetchProject = async (projectId) => {
  const response = await api.get(`/projects/projects/${projectId}`);
  return response.data;
};

// Fetch project progress
export const fetchProjectProgress = async (projectId) => {
  const response = await api.get(`/projects/projects/${projectId}/progress`);
  return response.data;
};

// Mark a project as complete
export const markProjectAsComplete = async (projectId) => {
  const response = await api.patch(`/projects/projects/${projectId}/complete`);
  return response.data;
};
