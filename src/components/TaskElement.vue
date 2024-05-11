<template>
  <div class="container d-flex align-items-center justify-content-between p-2 py-3">
    <div class="d-flex align-items-center">
      <font-awesome-icon
        class="tasktype-icon rounded-square"
        :icon="['fas', 'list-check']"
        v-if="task.type === 'yesno'"
      />
      <font-awesome-icon
        class="tasktype-icon rounded-square"
        :icon="['fas', 'plus-minus']"
        v-else-if="task.type === 'numeric'"
      />
      <font-awesome-icon
        class="tasktype-icon rounded-square"
        :icon="['fas', 'clock']"
        v-else-if="task.type === 'timer'"
      />
      <p class="mb-0 ms-2 text-white">{{ task.title }}</p>
    </div>
    <div v-if="task.type === 'yesno'">
      <font-awesome-icon
        class="cursor-pointer rounded-circle no-select"
        :icon="['fas', 'check']"
        :class="{
          'text-success': task.value,
          'text-danger': task.value === false
        }"
        @click="toggleTaskValue(task)"
      />
    </div>
    <div v-else-if="task.type === 'numeric'">
      <div class="position-relative pt-2">
        <font-awesome-icon
          class="cursor-pointer rounded-circle no-select"
          :icon="['fas', 'minus']"
          :class="{ 'text-success': task.value }"
          @click="decrementCount(task)"
        />
        <font-awesome-icon
          class="cursor-pointer rounded-circle no-select"
          :icon="['fas', 'plus']"
          :class="{ 'text-success': task.value }"
          @click="incrementCount(task)"
        />
        <p
          class="timer position-absolute translate-middle p-0 m-0"
          :class="{
            'text-success': task.value,
            'text-danger': task.value === false
          }"
        >
          Count: {{ task.count }}
        </p>
      </div>
    </div>
    <div v-else-if="task.type === 'timer'">
      <div class="position-relative pt-2">
        <font-awesome-icon
          class="cursor-pointer rounded-circle no-select"
          :icon="['fas', 'pause']"
          :class="{ 'text-success': task.value, 'text-danger': task.value === false }"
          @click="pauseCountdown(task)"
        />
        <font-awesome-icon
          class="cursor-pointer rounded-circle no-select"
          :icon="['fas', 'play']"
          :class="{ 'text-success': task.value, 'text-danger': task.value === false }"
          @click="startCountdown(task)"
        />
        <p
          class="timer position-absolute translate-middle p-0 m-0"
          :class="{
            'text-success': isTimerRunning || task.value,
            'text-danger': isTimerRunning === false || task.value === false
          }"
        >
          {{ getTimeStamp(task.timer) }}
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
import { defineProps, ref } from 'vue'

// Add the icons to the library
library.add(faPlus, faMinus, faCheck, faListCheck, faClock, faPlay, faPause, faPlusMinus)

// Define props
const props = defineProps({
  task: Object
})

// Define a variable to track timer running state
const isTimerRunning = ref(null)

const isInPast = (timestamp) => {
  const beginningOfDay = new Date()
  beginningOfDay.setHours(0, 0, 0, 0)
  return timestamp <= beginningOfDay.getTime()
}

const toggleTaskValue = (task) => {
  if (isInPast(task.timestamp)) return
  task.value = task.value ? null : true
}

const updateNumericTaskValue = (task) => {
  if (
    (task.subtype === 'increment' && task.count >= task.goal) ||
    (task.subtype !== 'increment' && task.count <= task.goal)
  ) {
    task.value = true
  } else {
    task.value = null
  }
}

const incrementCount = (task) => {
  if (isInPast(task.timestamp)) return
  task.count += 1
  updateNumericTaskValue(task)
}

const decrementCount = (task) => {
  if (isInPast(task.timestamp)) return
  if (task.count > 0) {
    task.count -= 1
    updateNumericTaskValue(task)
  }
}

const getTimeStamp = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
  const paddedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds

  return `${hours}:${paddedMinutes}:${paddedSeconds}`
}

const startCountdown = (task) => {
  if (isInPast(task.timestamp) || isTimerRunning.value) return
  if (task.value === true || task.value == false) return
  isTimerRunning.value = true
  task.timerInterval = setInterval(() => {
    if (task.timer <= 1) {
      // UI: the buttons turn green when the timer hits 0 (1s in code)
      task.value = true
      isTimerRunning.value = null
      task.timer--
      clearInterval(task.timerInterval)
    } else {
      isTimerRunning.value = true
      task.timer--
    }
  }, 1000)
}

const pauseCountdown = (task) => {
  if (isInPast(task.timestamp) || !isTimerRunning.value) return
  if (task.value === true || task.value === false) return
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
