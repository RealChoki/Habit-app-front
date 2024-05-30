<template>
  <div>
    <div class="d-flex justify-content-between">
      <div></div>
      <div v-if="hoveredDay" class="month-paragraph m-0 me-4 mb-1 p-0 fst-italic text-white">{{ getFormattedDate(hoveredDay) }}</div>
      <p v-else class="month-paragraph m-0 me-4 mb-1 p-0 fst-italic text-white">{{ currentMonth }}</p>
    </div>
    <div class="calender d-flex align-items-center mb-2">
      <!-- Arrow icon to the left -->
      <font-awesome-icon
        :icon="['fas', 'chevron-left']"
        class="arrow-icon mt-0 me-2 cursor-pointer text-white btn-click no-select"
        @click="previousWeek"
      />

      <div
        class="day p-0 cursor-pointer d-flex flex-column justify-content-between align-items-center rounded-4 no-select"
        v-for="day in days"
        :key="day.date"
        :class="{ 'border border-white': isActiveDay(day) }"
        @click="selectDate(day)"
        @mouseover="showHoverDiv(day)"
        @mouseleave="hideHoverDiv(day)"
      >
        <p class="test">{{ day.day }}</p>
        <div class="date rounded-top-2 rounded-bottom-4 w-100 ">
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { selectedDate } from '@/stores/selectedDate'

// Add the arrow icons to the library
library.add(faChevronLeft, faChevronRight)

const days = ref([])
const weekOffset = ref(0)
const today = new Date()
today.setDate(today.getDate()) // temporary

const router = useRouter()

const currentMonth = computed(() => {
  const monday = new Date(today)
  const currentDay = today.getDay()

  // Calculate Monday of the current week with offset
  monday.setDate(today.getDate() - currentDay + 1 + weekOffset.value * 7)

  // The month would be the month of the Monday of the week
  return getMonthName(monday.getMonth())
})

const hoveredDay = ref('')

const isActiveDay = (day) => {
  const currentDate = new Date()
  const isToday = day.date === currentDate.getDate() && day.month === currentDate.getMonth() + 1
  const isSelected =
    selectedDate.value !== null &&
    day.date === selectedDate.value.date &&
    day.month === selectedDate.value.month &&
    day.year === selectedDate.value.year
  return isSelected || (!selectedDate.value && isToday)
}

const selectDate = (date) => {
  selectedDate.value = date
  updateRoute(date)
}

const updateRoute = (date) => {
  const formattedMonth = date.month < 10 ? `0${date.month}` : date.month
  const formattedDate = `${date.year}-${formattedMonth}-${date.date}`
  router.push({ name: 'home', params: { date: formattedDate } })
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
      date: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear()
    })
  }
}

const getDayName = (dayIndex) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return daysOfWeek[dayIndex]
}

const getMonthName = (monthIndex) => {
  const monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  return monthsOfYear[monthIndex]
}

const getFormattedDate = (day) => {
   const formattedDay = day.date < 10 ? `0${day.date}` : day.date
   const formattedMonth = day.month < 10 ? `0${day.month}` : day.month
   return `${formattedDay}/${formattedMonth}/${day.year}`
 }

const previousWeek = () => {
  weekOffset.value--
  days.value = []
  calculateDates(weekOffset.value)
}

const nextWeek = () => {
  weekOffset.value++
  days.value = []
  calculateDates(weekOffset.value)
}

const showHoverDiv = (day) => {
   hoveredDay.value = day // Set the hovered day
 }
 const hideHoverDiv = () => {
   hoveredDay.value = '' // Clear the hovered day
 }

// Initial call to calculate dates
calculateDates(weekOffset.value)
</script>

<style scoped>
.calender {
  gap: 4px;
}

.test{
  margin: 0;
  margin-top: 3px;
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

.month-paragraph {
  font-size: 12px;
}
</style>
