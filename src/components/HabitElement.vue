<template>
  <div class="container d-flex align-items-center justify-content-between p-2 py-3">
    <div class="d-flex align-items-center">
      <font-awesome-icon
        class="habittype-icon rounded-square"
        :class="{
          'text-success': habit?.completed,
          'text-danger': habit?.completed === false
        }"
        :icon="['fas', 'list-check']"
        v-if="habit?.type === 'yesno'"
      />
      <font-awesome-icon
        class="habittype-icon rounded-square"
        :class="{
          'text-success': habit?.completed,
          'text-danger': habit?.completed === false
        }"
        :icon="['fas', 'plus-minus']"
        v-else-if="habit?.type === 'numeric'"
      />
      <font-awesome-icon
        class="habittype-icon rounded-square"
        :class="{
          'text-success': habit?.completed,
          'text-danger': habit?.completed === false
        }"
        :icon="['fas', 'clock']"
        v-else-if="habit?.type === 'timer'"
      />
      <p
        class="mb-0 ms-2"
        :class="{
          'text-success': habit?.completed,
          'text-danger': habit?.completed === false,
          'text-white': habit?.completed === null
        }"
      >
        {{ habit?.title }}
      </p>
    </div>
    <!-- <div v-if="istInDerVergangenHeit(habit?.timestamp)"> -->
    <div v-if="habit?.type === 'yesno'">
      <font-awesome-icon
        class="cursor-pointer rounded-circle btn-click no-select"
        :icon="['fas', 'check']"
        :class="{
          'text-success': habit?.completed,
          'text-danger': habit?.completed === false
        }"
        @click.stop="toggleHabitValue(habit)"
      />
    </div>
    <div v-else-if="habit?.type === 'numeric'">
      <div class="position-relative pt-2">
        <font-awesome-icon
          class="cursor-pointer rounded-circle btn-click no-select"
          :icon="['fas', 'minus']"
          :class="{ 'text-success': habit?.completed, 'text-danger': habit?.completed === false }"
          @click.stop="adjustCount(habit, false)"
        />
        <font-awesome-icon
          class="cursor-pointer rounded-circle btn-click no-select"
          :icon="['fas', 'plus']"
          :class="{ 'text-success': habit.completed, 'text-danger': habit.completed === false }"
          @click.stop="adjustCount(habit, true)"
        />
        <p
          class="timer position-absolute translate-middle p-0 m-0"
          :class="{
            'text-success': habit.completed,
            'text-danger': habit.completed === false
          }"
        >
          Count: {{ habit.count }}
        </p>
      </div>
    </div>
    <div v-else-if="habit?.type === 'timer'">
      <div class="position-relative pt-2">
        <font-awesome-icon
          v-if="habit.currentTime > 0 && !isTimerRunning"
          class="cursor-pointer rounded-circle btn-click no-select"
          :icon="['fas', 'play']"
          :class="{ 'text-success': habit?.completed, 'text-danger': habit?.completed === false }"
          @click.stop="startCountdown(habit)"
        />

        <font-awesome-icon
          v-if="habit.currentTime > 0 && isTimerRunning"
          class="cursor-pointer rounded-circle btn-click no-select"
          :icon="['fas', 'pause']"
          :class="{ 'text-success': habit?.completed, 'text-danger': habit?.completed === false }"
          @click.stop="pauseCountdown(habit)"
        />

        <font-awesome-icon
          v-if="habit.currentTime === 0 || showRestart"
          class="cursor-pointer rounded-circle btn-click no-select"
          :icon="['fas', 'redo']"
          :class="{ 'text-success': habit?.completed, 'text-danger': habit?.completed === false }"
          @click.stop="restartCountdown(habit)"
        />

        <p
          class="timer position-absolute translate-middle p-0 m-0"
          :class="{
            'text-success': isTimerRunning || habit?.completed,
            'text-danger': isTimerRunning === false || habit?.completed === false
          }"
        >
          {{ getTimeStamp(habit.currentTime ?? 0) }}
        </p>
      </div>
    </div>
    <!-- </div> -->
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
  faPlusMinus,
  faRedo
} from '@fortawesome/free-solid-svg-icons'
import type { DailyHabit } from '../types/types'
import { defineProps, ref, toRefs } from 'vue'
import type { PropType } from 'vue'

// Add the icons to the library
library.add(faPlus, faMinus, faCheck, faListCheck, faClock, faPlay, faPause, faPlusMinus, faRedo)

// Define props
const props = defineProps({
  habit: {
    type: Object as () => DailyHabit,
    required: true
  }
})
// Destructure props to use them directly

// Make habit UI reactive
const { habit } = toRefs(props)

// Define a variable to track timer running state
const isTimerRunning = ref<null | boolean>(null)
const showRestart = ref(false)
const beginningOfDay = new Date()
beginningOfDay.setHours(0, 0, 0, 0)

const isInPast = (timestamp: Date) => timestamp.getTime() <= beginningOfDay.getTime()

const toggleHabitValue = (habit: DailyHabit) => {
  if (habit.timestamp === null || isInPast(habit.timestamp)) return
  habit.completed = habit.completed ? null : true
}

const updateNumericHabitValue = (habit: DailyHabit) => {
  if (
    (habit.subtype === 'increment' && (habit.count ?? 0) >= (habit.goal ?? 0)) ||
    (habit.subtype !== 'increment' && (habit.count ?? 0) <= (habit.goal ?? 0))
  ) {
    habit.completed = true
  } else {
    habit.completed = null
  }
}

const adjustCount = (habit: DailyHabit, increment: boolean) => {
  if (habit.timestamp === null || isInPast(habit.timestamp)) return

  if (increment) {
    if (habit.count !== undefined) {
      habit.count = (habit.count ?? 0) + 1
    }
  } else {
    if (habit.count !== undefined && habit.count > 0) {
      habit.count -= 1
    }
  }
  updateNumericHabitValue(habit)
}

const getTimeStamp = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const paddedMinutes = minutes.toString().padStart(2, '0')
  const paddedSeconds = (seconds % 60).toString().padStart(2, '0')
  return `${hours}:${paddedMinutes}:${paddedSeconds}`
}

const startCountdown = (habit: DailyHabit) => {
  showRestart.value = true
  if (habit.timestamp === null || isInPast(habit.timestamp)) return
  if (isTimerRunning.value || habit.completed !== null) return
  isTimerRunning.value = true
  habit.timerInterval = setInterval(() => {
    const timer = habit.currentTime ?? 0
    if (timer <= 1) {
      habit.completed = true
      isTimerRunning.value = null
      habit.currentTime = 0
      clearInterval(habit.timerInterval)
    } else {
      habit.currentTime = timer - 1
    }
  }, 1000)
}

const pauseCountdown = (habit: DailyHabit) => {
  if (habit.timestamp === null || isInPast(habit.timestamp)) return
  if (!isTimerRunning.value) return
  isTimerRunning.value = false
  clearInterval(habit.timerInterval)
}

const restartCountdown = (habit: DailyHabit) => {
  pauseCountdown(habit)
  habit.currentTime = habit.initialTime

  isTimerRunning.value = null
  showRestart.value = false
  habit.completed = null
}
</script>

<style scoped>
.habittype-icon {
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
