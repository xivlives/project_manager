import api from '../utils/api';

export const loginUser = async ({ email, password }) => {
  const response = await api.post('/auth/login', { email, password });
  // Assuming JWT token is returned
  localStorage.setItem('token', response.data.token);
};

export const signupUser = async ({ email, password }) => {
  const response = await api.post('/auth/signup', { email, password });
  // Assuming JWT token is returned
  localStorage.setItem('token', response.data.token);
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};

export const isLoggedIn = () => {
  return localStorage.getItem('token') !== null;
};
