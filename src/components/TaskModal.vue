<template>
  <div v-if="showModal" class="modal fade show" tabindex="-1" role="dialog" style="display: block">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ task.title }}</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <p>Task ID: {{ task.id }}</p>
          <p>Type: {{ task.type }}</p>
          <p v-if="task.type === 'numeric'">Goal: {{ task.goal }}</p>
          <p v-if="task.type === 'timer'">Timer: {{ task.timer }} hours</p>
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
</script>
