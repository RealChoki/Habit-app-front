import apiClient from './axios'; 

const login = async (username: any, password: any) => {
  try {
    const response = await apiClient.post('/users/login', {
      username,
      password,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred during login');
  }
};

export default {
  login,
};
