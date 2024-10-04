<template>
  <div>
    <div class="d-flex justify-content-between">
      <div></div>
      <div :class="['d-flex', 'align-items-center', isToday ? 'me-4' : 'me-2']">
        <div v-if="hoveredDay" class="month-paragraph m-0 mb-1 p-0 fst-italic text-white">
          {{ getFormattedDate(hoveredDay) }}
        </div>
        <p v-else class="month-paragraph m-0 mb-1 p-0 fst-italic text-white">
          {{ currentMonth }}
        </p>
        <font-awesome-icon
          v-if="!isToday"
          :icon="['fas', 'fa-rotate-right']"
          class="ms-1 mb-1 cursor-pointer text-white btn-click no-select month-paragraph"
          @click="resetToToday"
        />
      </div>
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
        @mouseleave="hideHoverDiv()"
      >
        <p class="test">{{ day.day }}</p>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faChevronRight, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { selectedDate } from '../services/selectedDate'
import { setWeekOffset, getWeekOffset, setWeekRange } from '../services/weekService'
import type { DateInfo } from '../types/types'

// Add the arrow icons to the library
library.add(faChevronLeft, faChevronRight, faChevronLeft, faRotateRight)

const days = ref<DateInfo[]>([])
const weekOffset = ref<number>(0)
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

const hoveredDay = ref<string>('')

const isActiveDay = (date: DateInfo): boolean => {
  const currentDate = new Date()
  const isToday = date.date === currentDate.getDate() && date.month === currentDate.getMonth() + 1
  const isSelected =
    selectedDate.value !== null &&
    date.date === selectedDate.value.date &&
    date.month === selectedDate.value.month &&
    date.year === selectedDate.value.year
  return isSelected || (!selectedDate.value && isToday)
}

const selectDate = (date: DateInfo): void => {
  selectedDate.value = date
  updateRoute(date)
}

const updateRoute = (date: DateInfo): void => {
  const formattedMonth = date.month < 10 ? `0${date.month}` : date.month
  const formattedDay = date.date < 10 ? `0${date.date}` : date.date
  const formattedDate = `${date.year}-${formattedMonth}-${formattedDay}`
  router.push({ name: 'HomeView', params: { date: formattedDate } })
}

const calculateDates = (offset: number): void => {
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

  // Update week range in service
  const startDate = monday.toISOString().split('T')[0]
  const endDate = new Date(monday)
  endDate.setDate(monday.getDate() + 6)
  const endDateStr = endDate.toISOString().split('T')[0]
  setWeekRange(startDate, endDateStr)
}

const getDayName = (dayIndex: number): string => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return daysOfWeek[dayIndex]
}

const getMonthName = (monthIndex: number): string => {
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

const resetToToday = () => {
  const today = new Date()
  selectedDate.value = {
    day: today.toLocaleString('en-us', { weekday: 'long' }),
    date: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear()
  }
  updateRoute(selectedDate.value)
  days.value = []
  weekOffset.value = 0
  calculateDates(weekOffset.value)
}

const isToday = computed(() => {
  if (!selectedDate.value) return false

  const today = new Date()
  return (
    selectedDate.value.date === today.getDate() &&
    selectedDate.value.month === today.getMonth() + 1 &&
    selectedDate.value.year === today.getFullYear()
  )
})

const getFormattedDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  const formattedDay = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const formattedMonth = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  return `${formattedDay}/${formattedMonth}/${date.getFullYear()}`
}

const previousWeek = () => {
  const currentOffset = getWeekOffset()
  days.value = []
  setWeekOffset(currentOffset - 1)
  weekOffset.value--
  calculateDates(weekOffset.value)
}

const nextWeek = () => {
  const currentOffset = getWeekOffset()
  days.value = []
  setWeekOffset(currentOffset + 1)
  weekOffset.value++
  calculateDates(weekOffset.value)
}

const showHoverDiv = (day: DateInfo): void => {
  const dateString = `${day.year}-${day.month}-${day.date}`
  hoveredDay.value = dateString
}

const hideHoverDiv = (): void => {
  hoveredDay.value = ''
}

// Initial call to calculate dates
calculateDates(weekOffset.value)
</script>

<style scoped>
.calender {
  gap: 4px;
}

.test {
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
