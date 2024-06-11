type TimerInterval = number | ReturnType<typeof setInterval>;

export interface Task {
  id: number
  type: 'yesno' | 'numeric' | 'timer'
  frequency: 'daily' | 'weekly' | 'monthly'
  title: string
  description: string
  value: boolean | null
  // For numeric tasks
  count?: number
  goal?: number
  subtype?: 'increment' | 'decrement'
  // For timer tasks
  timer?: number
  default?: number
  timerInterval?: TimerInterval
}

export interface DayData {
  metadata: {
    timestamp: Date
  }
  tasks: { [taskId: string]: Task }
}

export interface DateInfo {
  day: string
  date: number
  month: number
  year: number
}
