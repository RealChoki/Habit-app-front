<template>
  <header class="navbar navbar-dark py-3 mb-3">
    <div class="container">
      <button class="navbar-toggler" type="button" @click="toggleMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <p class="navbar-brand">{{ activeDate }}</p>
      <!-- Burger menu content -->
      <div class="navbar-menu collapse px-5 w-100 text-center" :class="{ show: isOpen }">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Add Habits</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Delete Habits</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Settings</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { selectedDate } from '@/stores/selectedDate'
import type { DateInfo } from '@/types/types'

const isOpen = ref<boolean>(false)

const activeDate = ref<string>('')

const updateActiveDate = (): void => {
  if (selectedDate.value) {
    activeDate.value = formatedHeaderDate(selectedDate.value)
  } else {
    getCurrentDate()
  }
}

const getCurrentDate = (): void => {
  const today = new Date()
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }
  activeDate.value = today.toLocaleDateString('en-US', options)
}

const formatedHeaderDate = (date: DateInfo): string => {
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
    new Date(date.year, date.month - 1, date.date)
  )
  return formattedDate
}

const toggleMenu = (): void => {
  isOpen.value = !isOpen.value
}

watch(selectedDate, () => {
  updateActiveDate()
})

onMounted(() => {
  updateActiveDate()
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

.navbar-toggler {
  border: none;
  background: none;
  cursor: pointer;
}
.navbar-toggler:focus {
  outline: none;
}
.navbar-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #343a40;
  border-radius: 5px;
  padding: 10px;
  transition: all 0.3s;
  opacity: 0;
  visibility: hidden;
  height: 0; /* Initially hide the menu */
  overflow: hidden; /* Hide overflow content */
}
.navbar-menu.show {
  z-index: 1;
  opacity: 1;
  visibility: visible;
  background-color: #232323;
  height: auto; /* Auto height for the menu */
}
.navbar-nav {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.nav-item {
  margin-bottom: 5px;
}
.nav-link {
  color: white;
  text-decoration: none;
  font-size: 16px;
}
.nav-link:hover {
  color: #adb5bd;
}
</style>
