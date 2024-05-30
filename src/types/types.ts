export interface Task {
  id: number;
  type: 'yesno' | 'numeric' | 'timer';
  frequency: 'daily' | 'weekly' | 'monthly';
  title: string;
  description: string;
  value: boolean | null;
  count?: number;
  timer?: number;
  subtype?: 'increment' | 'decrement';
  goal?: number;
}

export interface DayData {
  metadata: {
    timestamp: Date;
  };
  tasks: { [taskId: string]: Task };
}
