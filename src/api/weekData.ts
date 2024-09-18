import apiClient from './axios'

// Fetch all habits
export const getWeekData = async (startDate: string, endDate: string) => {
  try {
    console.log('Fetching days from', startDate, 'to', endDate)
    const response = await apiClient.get('/', {
      params: {
        startDate,
        endDate
      }
    })
    console.log('Days fetched:', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching week data:', error)
    throw error
  }
}
