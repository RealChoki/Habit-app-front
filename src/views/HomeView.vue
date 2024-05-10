<template>
  <HeaderNavbar />
  <div class="container-fluid d-flex justify-content-center">
    <div>
      <HomeCalender />
      <div class="max-width-500">
        <TaskElement :task="gymTask" />
        <TaskElement :task="waterTask" />
        <TaskElement :task="pianoTask" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HomeCalender from '@/components/HomeCalender.vue'
import HeaderNavbar from '@/components/Navbar.vue'
import TaskElement from '@/components/TaskElement.vue'

const gymTask = ref({
  id: 1,
  timestamp: null,
  type: 'yesno',
  title: 'Go to gym',
  value: false
})
const waterTask = ref({
  id: 1,
  timestamp: null,
  type: 'numeric',
  title: 'Drink 5 Glasses of Water',
  count: 5,
  value: null
})
const pianoTask = ref({
  id: 1,
  timestamp: null,
  type: 'timer',
  title: 'Play 1 hour of Piano',
  timer: 3600,
  value: true
})
</script>

<style scoped>
.max-width-500 {
  max-width: 500px;
}
</style>
