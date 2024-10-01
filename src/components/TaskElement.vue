<template>
  <div
    class="container d-flex align-items-center justify-content-between p-2 py-3"
    @click="openTaskModal(task)"
  >
    <div class="d-flex align-items-center cursor-pointer">
      <font-awesome-icon
        class="tasktype-icon rounded-square"
        :icon="['fas', 'list-check']"
        v-if="task?.type === 'yesno'"
      />
      <font-awesome-icon
        class="tasktype-icon rounded-square"
        :icon="['fas', 'plus-minus']"
        v-else-if="task?.type === 'numeric'"
      />
      <font-awesome-icon
        class="tasktype-icon rounded-square"
        :icon="['fas', 'clock']"
        v-else-if="task?.type === 'timer'"
      />
      <p class="mb-0 ms-2 text-white">{{ task?.title }}</p>
    </div>
    <div v-if="task?.type === 'yesno'">
      <font-awesome-icon
        class="cursor-pointer rounded-circle btn-click no-select"
        :icon="['fas', 'check']"
        :class="{
          'text-success': task?.completed,
          'text-danger': task?.completed === false
        }"
        @click.stop="toggleTaskValue(task)"
      />
    </div>
    <div v-else-if="task?.type === 'numeric'">
      <div class="position-relative pt-2">
        <font-awesome-icon
          class="cursor-pointer rounded-circle btn-click no-select"
          :icon="['fas', 'minus']"
          :class="{ 'text-success': task?.completed, 'text-danger': task?.completed === false }"
          @click.stop="adjustCount(task, false)"
        />
        <font-awesome-icon
          class="cursor-pointer rounded-circle btn-click no-select"
          :icon="['fas', 'plus']"
          :class="{ 'text-success': task.completed, 'text-danger': task.completed === false }"
          @click.stop="adjustCount(task, true)"
        />
        <p
          class="timer position-absolute translate-middle p-0 m-0"
          :class="{
            'text-success': task.completed,
            'text-danger': task.completed === false
          }"
        >
          Count: {{ task.count }}
        </p>
      </div>
    </div>
    <div v-else-if="task?.type === 'timer'">
      <div class="position-relative pt-2">
        <font-awesome-icon
          class="cursor-pointer rounded-circle btn-click no-select"
          :icon="['fas', 'pause']"
          :class="{ 'text-success': task?.completed, 'text-danger': task?.completed === false }"
          @click.stop="pauseCountdown(task)"
        />
        <font-awesome-icon
          class="cursor-pointer rounded-circle btn-click no-select"
          :icon="['fas', 'play']"
          :class="{ 'text-success': task?.completed, 'text-danger': task?.completed === false }"
          @click.stop="startCountdown(task)"
        />
        <p
          class="timer position-absolute translate-middle p-0 m-0"
          :class="{
            'text-success': isTimerRunning || task?.completed,
            'text-danger': isTimerRunning === false || task?.completed === false
          }"
        >
          {{ getTimeStamp(task.timer ?? 0) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus,
  faMinus,
  faCheck,
  faListCheck,
  faClock,
  faPlay,
  faPause,
  faPlusMinus
} from '@fortawesome/free-solid-svg-icons'
import type { Task } from '../types/types'
import { defineProps, ref, toRefs } from 'vue'
import type { PropType } from 'vue'

// Add the icons to the library
library.add(faPlus, faMinus, faCheck, faListCheck, faClock, faPlay, faPause, faPlusMinus)

// Define props
const props = defineProps({
  task: {
    type: Object as () => Task,
    required: true
  },
  openTaskModal: {
    type: Function as PropType<(task: Task) => void>,
    required: true
  },
  timestamp: {
    type: Date as PropType<Date | null>,
    default: null
  }
})
// Destructure props to use them directly
const { openTaskModal, timestamp } = props

// Make task UI reactive
const { task } = toRefs(props)

// Define a variable to track timer running state
const isTimerRunning = ref<null | boolean>(null)
const beginningOfDay = new Date()
beginningOfDay.setHours(0, 0, 0, 0)

const isInPast = (timestamp: Date) => timestamp.getTime() <= beginningOfDay.getTime()

const toggleTaskValue = (task: Task) => {
  if (timestamp === null || isInPast(timestamp)) return
  task.completed = task.completed ? null : true
}

const updateNumericTaskValue = (task: Task) => {
  if (
    (task.subtype === 'increment' && (task.count ?? 0) >= (task.goal ?? 0)) ||
    (task.subtype !== 'increment' && (task.count ?? 0) <= (task.goal ?? 0))
  ) {
    task.completed = true
  } else {
    task.completed = null
  }
}

const adjustCount = (task: Task, increment: boolean) => {
  if (timestamp === null || isInPast(timestamp)) return

  if (increment) {
    if (task.count !== undefined) {
      task.count = (task.count ?? 0) + 1
    }
  } else {
    if (task.count !== undefined && task.count > 0) {
      task.count -= 1
    }
  }
  updateNumericTaskValue(task)
}

const getTimeStamp = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const paddedMinutes = minutes.toString().padStart(2, '0')
  const paddedSeconds = (seconds % 60).toString().padStart(2, '0')
  return `${hours}:${paddedMinutes}:${paddedSeconds}`
}

const startCountdown = (task: Task) => {
  if (timestamp === null || isInPast(timestamp) || isTimerRunning.value || task.completed !== null)
    return
  isTimerRunning.value = true
  task.timerInterval = setInterval(() => {
    const timer = task.timer ?? 0
    if (timer <= 1) {
      task.completed = true
      isTimerRunning.value = null
      task.timer = 0
      clearInterval(task.timerInterval)
    } else {
      task.timer = timer - 1
    }
  }, 1000)
}

const pauseCountdown = (task: Task) => {
  if (timestamp === null || isInPast(timestamp) || !isTimerRunning.value) return
  isTimerRunning.value = false
  clearInterval(task.timerInterval)
}
</script>

<style scoped>
.tasktype-icon {
  color: #5b5b5b;
}
.rounded-circle {
  border-radius: 50%;
  width: 12px;
  height: 12px;
  background-color: #232323;
  color: #5b5b5b;
  padding: 8px;
  margin-left: 8px;
}

.rounded-square {
  border-radius: 5px;
  width: 12px;
  height: 12px;
  background-color: #232323;
  color: #5b5b5b;
  padding: 10px;
}

.container {
  border-bottom: 1px solid #232323;
}

p.timer {
  color: white;
  font-size: 11px;
  font-style: italic;
  top: -5%;
  left: 55%;
  white-space: nowrap;
}
</style>
