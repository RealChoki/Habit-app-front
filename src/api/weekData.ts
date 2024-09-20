import apiClient from './axios'

// Fetch all habits
export const getWeekData = async (startDate: string, endDate: string) => {
  try {
    const response = await apiClient.get(`/week/${startDate}/${endDate}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching week data:', error);
    throw error;
  }
};