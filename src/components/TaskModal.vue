<template>
  <div
    v-if="showModal"
    class="modal fade show d-flex justify-content-center mt-5"
    tabindex="-1"
    role="dialog"
    style="display: block"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content min-width-350">
        <div class="modal-header">
          <h5 class="modal-title">{{ task.title || 'No Title' }}</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <p>Date: {{ formatDate(selectedDate) }}</p>
          <p>Description: {{ task.description }}</p>
          <p v-if="task.type === 'numeric'">Count: {{ task.count }}</p>
          <p v-if="task.type === 'numeric'">Goal: {{ task.goal }}</p>
          <p v-if="task.type === 'timer'">Timer: {{ getTimeStamp(task.timer) }}</p>
          <p>Status: {{ task.completed ? 'Done' : 'Not done' }}</p>
          <button
            v-if="task.type === 'timer'"
            type="button"
            class="btn btn-primary"
            @click="restartTimer(task)"
          >
            Restart Timer
          </button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Task } from '@/types/types'
import type { PropType } from 'vue'
import { selectedDate } from '../services/selectedDate'
import type { DateInfo } from '../types/types'

const props = defineProps({
  showModal: Boolean,
  closeModal: {
    type: Function as PropType<() => void>,
    required: true
  },
  task: {
    type: Object as PropType<Task>,
    required: true
  },
  timestamp: {
    type: Date as PropType<Date | null>,
    default: null
  }
})

const formatDate = (dateInfo: DateInfo | null): string => {
  if (!dateInfo) return ''
  
  const day = dateInfo.date.toString().padStart(2, '0')
  const month = dateInfo.month.toString().padStart(2, '0')
  const year = dateInfo.year.toString()

  return `${day}/${month}/${year}`
}

const getTimeStamp = (seconds: number | undefined): string => {
  if (seconds === undefined) return ''
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const paddedMinutes = minutes.toString().padStart(2, '0')
  const paddedSeconds = (seconds % 60).toString().padStart(2, '0')
  return `${hours}:${paddedMinutes}:${paddedSeconds}`
}

const restartTimer = (task: Task): void => {
  task.timer = task.default
  task.completed = null
}
</script>

<style scoped>
.min-width-350 {
  min-width: 350px;
}
</style>
