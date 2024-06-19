import apiClient from './axios';

// Fetch all habits
export const getHabits = async () => {
  try {
    const response = await apiClient.get('/habits');
    return response.data;
  } catch (error) {
    console.error('Error fetching habits:', error);
    throw error;
  }
};

// Add a new habit
export const addHabit = async (habit: any) => {
  try {
    const response = await apiClient.post('/habits', habit);
    return response.data;
  } catch (error) {
    console.error('Error adding habit:', error);
    throw error;
  }
};

// Update a habit
export const updateHabit = async (habit: any) => {
  try {
    const response = await apiClient.put(`/habits/${habit.id}`, habit);
    return response.data;
  } catch (error) {
    console.error('Error updating habit:', error);
    throw error;
  }
};

// Delete a habit
export const deleteHabit = async (id: any) => {
  try {
    await apiClient.delete(`/habits/${id}`);
  } catch (error) {
    console.error('Error deleting habit:', error);
    throw error;
  }
};

// Get a specific habit by ID
export const getHabitById = async (id: any) => {
  try {
    const response = await apiClient.get(`/habits/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching habit by ID:', error);
    throw error;
  }
};
