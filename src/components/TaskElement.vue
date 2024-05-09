<template>
  <div class="container d-flex align-items-center justify-content-between p-2 py-3">
    <div class="d-flex align-items-center">
      <font-awesome-icon
        class="tasktype-icon"
        :icon="['fas', 'list-check']"
        v-if="task.type === 'yesno'"
      />
      <font-awesome-icon
        class="tasktype-icon"
        :icon="['fas', 'plus-minus']"
        style="width: 16px"
        v-else-if="task.type === 'numeric'"
      />
      <font-awesome-icon
        class="tasktype-icon"
        :icon="['fas', 'clock']"
        v-else-if="task.type === 'timer'"
      />
      <p class="mb-0 ms-2 text-white">{{ task.title }}</p>
    </div>
    <div v-if="task.type === 'yesno'">
      <font-awesome-icon
        class="cursor-pointer rounded-circle"
        :icon="['fas', 'check']"
        :class="{ 'text-success': task.value }"
      />
    </div>
    <div v-else-if="task.type === 'numeric'">
      <div class="position-relative pt-2">
        <font-awesome-icon class="cursor-pointer rounded-circle" :icon="['fas', 'minus']" :class="{ 'text-success': task.value }"/>
        <font-awesome-icon class="cursor-pointer rounded-circle" :icon="['fas', 'plus']" :class="{ 'text-success': task.value }"/>
        <p class="timer position-absolute translate-middle p-0 m-0" :class="{ 'text-success': task.value }">
          Count: {{ task.count }}
        </p>
      </div>
    </div>
    <div v-else-if="task.type === 'timer'">
      <div class="position-relative pt-2">
        <font-awesome-icon class="cursor-pointer rounded-circle" :icon="['fas', 'pause']" :class="{ 'text-success': task.value }"/>
        <font-awesome-icon class="cursor-pointer rounded-circle" :icon="['fas', 'play']" :class="{ 'text-success': task.value }"/>
        <p class="timer position-absolute translate-middle p-0 m-0" :class="{ 'text-success': task.value }">
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
import { defineProps } from 'vue'

// Add the icons to the library
library.add(faPlus, faMinus, faCheck, faListCheck, faClock, faPlay, faPause, faPlusMinus)

// Define props
const props = defineProps({
  task: Object
})

const getTimeStamp = (timer) => {
  const seconds = timer
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
  const paddedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds

  return `${hours}:${paddedMinutes}:${paddedSeconds}`
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
  background-color: #2e2e2f;
  color: #5b5b5b;
  padding: 8px;
  margin-left: 8px;
}

.container {
  border-bottom: 1px solid #2e2e2f;
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
