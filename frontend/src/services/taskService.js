import api from '../utils/api';

export const getTasks = async (projectId) => {
  const response = await api.get(`/tasks/${projectId}`);
  return response.data;
};

export const createTask = async (projectId, task) => {
  const response = await api.post(`/tasks/${projectId}`, task);
  return response.data;
};

export const updateTask = async (taskId, taskData) => {
  const response = await api.put(`/tasks/${taskId}`, taskData);
  return response.data;
};
