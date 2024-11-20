import axios from 'axios'
import type { UserHabit } from '../types/types'

let currentHabit: UserHabit = {
  title: undefined,
  description: undefined,
  frequency: undefined,
  type: undefined,
  startDate: undefined
}

const getHabit = () => {
  return currentHabit
}

const setHabit = (habit: Partial<UserHabit>) => {
  currentHabit = { ...currentHabit, ...habit }
  console.log('habit:', currentHabit)
}

const deleteEndDate = () => {
  delete currentHabit.endDate
}

const resetHabit = (type: 'yesno' | 'numeric' | 'timer') => {
  currentHabit = {
    title: undefined,
    description: undefined,
    frequency: undefined,
    type: type,
    startDate: undefined
  }
  console.log('habit:', currentHabit)
}

const createHabit = async (userId: string): Promise<any> => {
  try {
    const response = await axios.post(`/users/${userId}/habits`, currentHabit)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error creating habit:', error.response?.data)
      throw new Error(error.response?.data.message || 'Failed to create habit')
    } else {
      console.error('An unexpected error occurred:', error)
      throw error
    }
  }
}

export default {
  getHabit,
  setHabit,
  resetHabit,
  deleteEndDate,
  createHabit
}
