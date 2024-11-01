import type { DayData } from '@/types/types'
export const weekDataFrontend: DayData[] = [];

const generateWeekData = (weekOffset: number): void => {
  const currentDate = new Date()
  const currentDayOfWeek = currentDate.getDay()
  const mondayOffset = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek

  const mondayTimestamp = new Date(currentDate)
  mondayTimestamp.setDate(currentDate.getDate() + mondayOffset + weekOffset * 7)

  for (let i = 0; i < 7; i++) {
    const timestamp = new Date(mondayTimestamp)
    timestamp.setDate(mondayTimestamp.getDate() + i)

    const habits: { [key: string]: any } = {
      1: {
        dailyHabitId: 'f23qr23',
        habitId: 'daed23e',
        timestamp: timestamp,
        type: 'yesno',
        completed: null,
        frequency: 'daily',
        title: 'Go to gym',
        description: 'Go to the gym and workout for at least 1 hour',
      },
      2: {
        dailyHabitId: 'f23qr23',
        habitId: 'daed23e',
        timestamp: timestamp,
        type: 'numeric',
        completed: null,
        frequency: 'daily',
        title: 'Drink 5 Glasses of Water',
        description: 'Drink at least 5 glasses of water today',
        subtype: 'increment',
        count: 0,
        goal: 5,
      },
      3: {
        dailyHabitId: 'f23qr23',
        habitId: 'daed23e',
        timestamp: timestamp,
        type: 'timer',
        completed: null,
        frequency: 'daily',
        title: 'Play 1 hour of Piano',
        description: 'Play the piano for at least 1 hour today',
        currentTime: 3,
        initialTime: 3,
      }
    }

    const habitsForDay: any = {}
    // Loop through habits object and add each habit for the day
    Object.keys(habits).forEach((habitId) => {
      habitsForDay[habitId] = { ...habits[habitId] }
    })

    // Add the metadata object and habits for the day to the weekData array
    weekDataFrontend.push({
      timestamp,
      dailyHabits: habitsForDay,
      completed: false
    })
  }
  console.log(weekDataFrontend)
}

// Generate week data for the current week (offset 0)
generateWeekData(0)
