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
          <h5 class="modal-title">{{ task.title }}</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <p>Date: {{ formatDate(task.timestamp) }}</p>
          <p v-if="task.type === 'numeric'">Count: {{ task.count }}</p>
          <p v-if="task.type === 'numeric'">Goal: {{ task.goal }}</p>
          <p v-if="task.type === 'timer'">Timer: {{ getTimeStamp(task.timer) }}</p>
          <p v-if="task.type === 'yesno' && task.value">Status: Done</p>
          <p v-if="task.type === 'yesno' && !task.value">Status: Not done</p>
          <!-- You can display other task information here based on the task type -->
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

// Define props
const props = defineProps({
  showModal: Boolean,
  task: Object,
  closeModal: Function
})

// Function to translate timestamp into DD/MM/YYYY format
const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()
  return `${day}/${month}/${year}`
}

const getTimeStamp = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const paddedMinutes = minutes.toString().padStart(2, '0')
  const paddedSeconds = (seconds % 60).toString().padStart(2, '0')
  return `${hours}:${paddedMinutes}:${paddedSeconds}`
}
</script>

<style scoped>
.min-width-350 {
  min-width: 350px;
}
</style>
