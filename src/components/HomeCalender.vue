<template>
  <div class="calender d-flex align-items-center mb-2">
    <!-- Arrow icon to the left -->
    <font-awesome-icon
      :icon="['fas', 'chevron-left']"
      class="arrow-icon mt-0 me-2 cursor-pointer text-white btn-click no-select"
      @click="previousWeek"
    />

    <div
      class="day pt-0 cursor-pointer d-flex flex-column justify-content-between align-items-center rounded-4 no-select"
      v-for="(day, index) in days"
      :key="day.date"
      :class="{ 'border border-white': isToday(index) }"
      @click="selectDate(index)"
    >
      <p class="m-0 mt-1">{{ day.day }}</p>
      <div class="date rounded-top-2 rounded-bottom-4 w-100">
        <p class="my-1 fw-bold">
          <span class="d-flex justify-content-center align-items-center">{{ day.date }}</span>
        </p>
      </div>
    </div>

    <!-- Arrow icon to the right -->
    <font-awesome-icon
      :icon="['fas', 'chevron-right']"
      class="arrow-icon mt-0 ms-2 cursor-pointer text-white btn-click no-select"
      @click="nextWeek"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

// Add the arrow icons to the library
library.add(faChevronLeft, faChevronRight)

const days = ref([])
let weekOffset = 0
const selectedDateIndex = ref(null) // Initially, no date is selected
const today = new Date()
today.setDate(today.getDate() - 1) // tem

// Function to check if the date at the given index is today
const isToday = (index) => {
  return (
    index === selectedDateIndex.value ||
    (selectedDateIndex.value === null && new Date().getDate() === days.value[index].date)
  )
}

const selectDate = (index) => {
  selectedDateIndex.value = index
}

const calculateDates = (offset) => {
  const monday = new Date(today)
  const currentDay = today.getDay()

  // Calculate Monday of the current week with offset
  monday.setDate(today.getDate() - currentDay + 1 + offset * 7)

  // Generate dates for Monday to Sunday
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    days.value.push({
      day: getDayName(date.getDay()),
      date: date.getDate()
    })
  }
}

const getDayName = (dayIndex) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return daysOfWeek[dayIndex]
}

const previousWeek = () => {
  weekOffset--
  days.value = []
  calculateDates(weekOffset)
}

const nextWeek = () => {
  weekOffset++
  days.value = []
  calculateDates(weekOffset)
}

// Initial call to calculate dates
calculateDates(weekOffset)
</script>

<style scoped>
.calender {
  gap: 4px;
}

.day p {
  font-size: 10px;
  color: #c5c5c5;
}

.day {
  width: 40px;
  height: 50px;
  background-color: #1a1a1b;
  border: 1px solid transparent;
  border-left: none;
  border-right: none;
  /** border-bottom: none; **/
}

.date {
  background-color: #232323;
  z-index: 0;
  padding-bottom: 2px;
}

.date p {
  font-size: 13px;
  color: #fefff7;
}
</style>
