<template>
  <HeaderNavbar />
  <div class="container-fluid d-flex justify-content-center">
    <div>
      <HomeCalender />
      <div class="max-width-500">
        <TaskElement
          v-for="(task, key) in data.tasks"
          :key="key"
          :task="task"
          :openTaskModal="openTaskModal"
        />
      </div>
    </div>
    <TaskModal
      :showModal="showModal"
      :closeModal="closeModal"
      :metadata="data.metadata"
      :task="selectedTask"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HomeCalender from '@/components/HomeCalender.vue'
import TaskModal from '@/components/TaskModal.vue'
import HeaderNavbar from '@/components/HeaderNavbar.vue'
import TaskElement from '@/components/TaskElement.vue'

// Define tasks
const data = {
  metadata: {
    timestamp: new Date()
  },
  tasks: {
    gymTask: {
      id: 1,
      type: 'yesno',
      title: 'Go to gym',
      value: null
    },
    waterTask: {
      id: 2,
      type: 'numeric',
      subtype: 'increment',
      title: 'Drink 5 Glasses of Water',
      count: 0,
      goal: 5,
      value: null
    },
    pianoTask: {
      id: 3,
      type: 'timer',
      title: 'Play 1 hour of Piano',
      timer: 3,
      value: null
    }
  }
}

const showModal = ref(false)
const selectedTask = ref(null)

const openTaskModal = (task) => {
  selectedTask.value = task
  showModal.value = true
}
const closeModal = () => {
  showModal.value = false 
}
</script>

<style scoped>
.max-width-500 {
  max-width: 500px;
}
</style>
