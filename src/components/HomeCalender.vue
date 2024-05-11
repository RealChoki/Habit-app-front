<template>
  <div class="calender d-flex align-items-center mb-2">
    <!-- Arrow icon to the left -->
    <font-awesome-icon
      :icon="['fas', 'chevron-left']"
      class="arrow-icon mt-0 me-2 cursor-pointer text-white btn-click no-select"
      @click="previousWeek"
    />

    <div
      class="day cursor-pointer text-center"
      v-for="(day, index) in days"
      :key="day.date"
      :class="{ 'border border-white': isToday(index) }"
      @click="selectDate(index)"
    >
      <p>{{ day.day }}</p>
      <div class="date">
        <p>{{ day.date }}</p>
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

// Function to check if the date at the given index is today
const isToday = (index) => {
  return (
    index === selectedDateIndex.value ||
    (selectedDateIndex.value === null && new Date().getDate() === days.value[index].date)
  )
}

// Function to select a date
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
  weekOffset++
  days.value = [] // Clear previous dates
  calculateDates(weekOffset)
}

const nextWeek = () => {
  weekOffset--
  days.value = [] // Clear previous dates
  calculateDates(weekOffset)
}

// Initial call to calculate dates
calculateDates(weekOffset)
</script>

<style scoped>
.calender {
  gap: 4px;
}

.day {
  width: 40px;
  height: 50px;
  border-radius: 15px;
  background-color: #1a1a1b;
  padding: 0;
  position: relative;
}

.day p {
  font-size: 10px;
  margin: 0;
  padding-top: 5px;
  color: #c5c5c5;
}

.date {
  width: 40px;
  height: 28.85px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  background-color: #232323;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 0;
}

.date p {
  font-size: 13px;
  font-weight: bold;
  color: #fefff7;
}
</style>
