import apiClient from './axios'

// Fetch all habits
export const getWeekData = async (startDate: string, endDate: string) => {
  const userId = '60d5ec49a7211c12345e6abc';
  console.log(startDate, endDate);

  try {
    const response = await apiClient.get(`/week/${startDate}/${endDate}`, {
      params: { userId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching or creating week data:', error);
    throw error;
  }
};