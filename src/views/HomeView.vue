<template>
  <HeaderNavbar />
  <div class="container-fluid d-flex justify-content-center">
    <div>
      <HomeCalender />
      <div class="max-width-500">
        <TaskElement :task="gymTask" @click="openTaskModal(gymTask)" />
        <TaskElement :task="waterTask" @click="openTaskModal(waterTask)" />
        <TaskElement :task="pianoTask" @click="openTaskModal(pianoTask)" />
      </div>
    </div>
    <TaskModal :showModal="showModal" :task="selectedTask" :closeModal="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HomeCalender from '@/components/HomeCalender.vue'
import TaskModal from '@/components/TaskModal.vue'
import HeaderNavbar from '@/components/HeaderNavbar.vue'
import TaskElement from '@/components/TaskElement.vue'

const gymTask = ref({
  id: 1,
  timestamp: new Date(),
  type: 'yesno',
  title: 'Go to gym',
  value: null
})
const waterTask = ref({
  id: 2,
  timestamp: new Date(),
  type: 'numeric',
  subtype: 'increment', // 'increment' or 'decrement
  title: 'Drink 5 Glasses of Water',
  count: 0,
  goal: 5,
  value: null
})
const pianoTask = ref({
  id: 3,
  timestamp: new Date(),
  type: 'timer',
  title: 'Play 1 hour of Piano',
  timer: 3,
  value: null
})

// Define a reactive variable to control the modal visibility
const showModal = ref(false)
// Define a reactive variable to store the selected task
const selectedTask = ref(null)

// Method to toggle the modal visibility and set the selected task
const openTaskModal = (task) => {
  selectedTask.value = task
  showModal.value = true
}

// Method to set showModal to false
const closeModal = () => {
  showModal.value = false
}
</script>

<style scoped>
.max-width-500 {
  max-width: 500px;
}
</style>

<style scoped>
.max-width-500 {
  max-width: 500px;
}
</style>

<style scoped>
.max-width-500 {
  max-width: 500px;
}
</style>
