<template>
  <header class="navbar navbar-dark py-3 mb-3">
    <div class="container">
      <button
        class="navbar-toggler border-1"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <p class="navbar-brand">{{ currentDate }}</p>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const currentDate = ref('')

const updateCurrentDate = () => {
  const today = new Date()
  const options = { month: 'long', day: 'numeric', year: 'numeric' }
  currentDate.value = today.toLocaleDateString('en-US', options)
}

onMounted(() => {
  updateCurrentDate()
})
</script>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 15px;
  gap: 7px;
}

header p {
  font-size: 15px;
  font-weight: bold;
  color: white;
  margin: 0;
  padding: 0;
}

.navbar-brand {
  color: #fefff7;
  font-size: 16px;
}
</style>
