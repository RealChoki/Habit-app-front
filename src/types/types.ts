type TimerInterval = number | ReturnType<typeof setInterval>

export interface Habit {
  id: number
  type: 'yesno' | 'numeric' | 'timer'
  frequency: 'daily' | 'weekly' | 'monthly'
  title: string
  description: string
  completed: boolean | null
  // For numeric habits
  count?: number
  goal?: number
  subtype?: 'increment' | 'decrement'
  // For timer habits
  currentTime?: number
  initialTime?: number
  timerInterval?: TimerInterval
}

export interface DayData {
  timestamp: Date // id string yyyy-mm-dd
  completed: boolean
  habits: { [habitId: string]: Habit }
}

export interface DateInfo {
  day: string
  date: number
  month: number
  year: number
}

// These aren't used yet
export interface UserHabit {
  id: string
  type: 'yesno' | 'numeric' | 'timer'
  frequency: 'daily' | 'weekly' | 'monthly'
  title: string
  description: string
}

export interface DailyHabit {
  habitId: string // FK
  timestamp: Date
  type: 'yesno' | 'numeric' | 'timer'
  completed: boolean | null
  // For numeric habits
  count?: number
  goal?: number
  subtype?: 'increment' | 'decrement'
  // For timer habits
  currentTime?: number
  initialTime?: number
  timerInterval?: TimerInterval
}
