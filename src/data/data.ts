import type { DayData } from '@/types/types'
export const weekData: DayData[] = [];

const generateWeekData = (weekOffset: number): void => {
  const currentDate = new Date()
  const currentDayOfWeek = currentDate.getDay()
  const mondayOffset = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek

  const mondayTimestamp = new Date(currentDate)
  mondayTimestamp.setDate(currentDate.getDate() + mondayOffset + weekOffset * 7)

  for (let i = 0; i < 7; i++) {
    const timestamp = new Date(mondayTimestamp)
    timestamp.setDate(mondayTimestamp.getDate() + i)

    const tasks: { [key: string]: any } = {
      1: {
        id: 1,
        type: 'yesno',
        frequency: 'daily',
        title: 'Go to gym',
        description: 'Go to the gym and workout for at least 1 hour',
        value: null
      },
      2: {
        id: 2,
        type: 'numeric',
        frequency: 'daily',
        title: 'Drink 5 Glasses of Water',
        description: 'Drink at least 5 glasses of water today',
        subtype: 'increment',
        count: 0,
        goal: 5,
        value: null
      },
      3: {
        id: 3,
        type: 'timer',
        frequency: 'daily',
        title: 'Play 1 hour of Piano',
        description: 'Play the piano for at least 1 hour today',
        default: 3,
        timer: 3,
        value: null
      }
    }

    const metadata = {
      timestamp: timestamp
    }

    const tasksForDay: any = {}
    // Loop through tasks object and add each task for the day
    Object.keys(tasks).forEach((taskId) => {
      tasksForDay[taskId] = { ...tasks[taskId] }
    })

    // Add the metadata object and tasks for the day to the weekData array
    weekData.push({
      metadata: metadata,
      tasks: tasksForDay
    })
  }
}

// Generate week data for the current week (offset 0)
generateWeekData(0)
