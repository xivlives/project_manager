import api from '../utils/api';

export const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    console.log(response.data);

    // Ensure token exists before setting it
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('username', response.data.name);
    } else {
      throw new Error('Token not found in response');
    }

    // console.log(response.data);

    return response.data; // Return the full response data if needed
  } catch (error) {
    console.error('Login error:', error.message);
    throw error; // Re-throw to handle it in the UI
  }
};


export const signupUser = async ({fullName, username, email, password }) => {
  const response = await api.post('/auth/signup', {fullName, username, email, password });
  // Assuming JWT token is returned
  localStorage.setItem('token', response.data.token);
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
};

export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  
  return Boolean(token && userId && username);
};
