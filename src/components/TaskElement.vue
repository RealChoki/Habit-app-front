<template>
  <div
    class="container d-flex align-items-center justify-content-between p-2 py-3"
    @click="openTaskModal(task)"
  >
    <div class="d-flex align-items-center cursor-pointer">
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
        class="cursor-pointer rounded-circle btn-click no-select"
        :icon="['fas', 'check']"
        :class="{
          'text-success': task.value,
          'text-danger': task.value === false
        }"
        @click.stop="toggleTaskValue(task)"
      />
    </div>
    <div v-else-if="task.type === 'numeric'">
      <div class="position-relative pt-2">
        <font-awesome-icon
          class="cursor-pointer rounded-circle btn-click no-select"
          :icon="['fas', 'minus']"
          :class="{ 'text-success': task.value, 'text-danger': task.value === false }"
          @click.stop="adjustCount(task, false)"
        />
        <font-awesome-icon
          class="cursor-pointer rounded-circle btn-click no-select"
          :icon="['fas', 'plus']"
          :class="{ 'text-success': task.value, 'text-danger': task.value === false }"
          @click.stop="adjustCount(task, true)"
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
          class="cursor-pointer rounded-circle btn-click no-select"
          :icon="['fas', 'pause']"
          :class="{ 'text-success': task.value, 'text-danger': task.value === false }"
          @click.stop="pauseCountdown(task)"
        />
        <font-awesome-icon
          class="cursor-pointer rounded-circle btn-click no-select"
          :icon="['fas', 'play']"
          :class="{ 'text-success': task.value, 'text-danger': task.value === false }"
          @click.stop="startCountdown(task)"
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
import { defineProps, ref, toRefs } from 'vue'

// Add the icons to the library
library.add(faPlus, faMinus, faCheck, faListCheck, faClock, faPlay, faPause, faPlusMinus)

// Define props
const props = defineProps({
  task: Object,
  openTaskModal: Function
})

// Make task UI reactive
const { task } = toRefs(props)

// Define a variable to track timer running state
const isTimerRunning = ref(null)
const beginningOfDay = new Date()
beginningOfDay.setHours(0, 0, 0, 0)

const isInPast = (timestamp) => timestamp <= beginningOfDay.getTime()

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

const adjustCount = (task, increment) => {
  if (isInPast(task.timestamp)) return
  if (increment) {
    task.count += 1
  } else if (task.count > 0) {
    task.count -= 1
  }
  updateNumericTaskValue(task)
}

const getTimeStamp = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const paddedMinutes = minutes.toString().padStart(2, '0')
  const paddedSeconds = (seconds % 60).toString().padStart(2, '0')
  return `${hours}:${paddedMinutes}:${paddedSeconds}`
}

const startCountdown = (task) => {
  if (isInPast(task.timestamp) || isTimerRunning.value || task.value !== null) return
  isTimerRunning.value = true
  task.timerInterval = setInterval(() => {
    if (task.timer <= 1) {
      task.value = true
      isTimerRunning.value = null
      task.timer = 0
      clearInterval(task.timerInterval)
    } else {
      task.timer--
    }
  }, 1000)
}

const pauseCountdown = (task) => {
  if (isInPast(task.timestamp) || !isTimerRunning.value) return
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
