type TimerInterval = number | ReturnType<typeof setInterval>

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
  type: 'yesno' | 'numeric' | 'timer' | null;
  frequency: 'daily' | { week: string[] } | { month: number[] } | null;
  title: string | null;
  description: string | null;
  goal?: number
  initialTime?: number;
  startDate: number | null;
  endDate?: number;
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
