type TimerInterval = number | ReturnType<typeof setInterval>

// export interface Habit {
//   id: number
//   type: 'yesno' | 'numeric' | 'timer'
//   frequency: 'daily' | 'weekly' | 'monthly'
//   title: string
//   description: string
//   completed: boolean | null
//   // For numeric habits
//   count?: number
//   goal?: number
//   subtype?: 'increment' | 'decrement'
//   // For timer habits
//   currentTime?: number
//   initialTime?: number
//   timerInterval?: TimerInterval
// }

export interface DayData {
  timestamp: Date
  completed: boolean
  dailyHabits: DailyHabit[]
}

export interface DateInfo {
  day: string
  date: number
  month: number
  year: number
}

export interface UserHabit {
  type: 'yesno' | 'numeric' | 'timer';
  frequency: 'daily' | { week: string[] } | { month: number[] };
  title: string;
  description: string;
}

export interface DailyHabit {
  dailyHabitId: string // PK
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
