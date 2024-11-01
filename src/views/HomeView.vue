<template>
  <div>
    <HeaderNavbar />
    <div class="container-fluid d-flex justify-content-center">
      <div>
        <HomeCalender />
        <div class="max-width-500">
          <HabitElement v-for="(habit, key) in filteredHabits" :key="key" :habit="habit" />
          <HabitElement
            v-for="(habit, key) in Object.values(habitExample.dailyHabits)"
            :key="key"
            :habit="habit"
          />
          <div
            v-if="filteredHabits.length === 0 && habitExample.dailyHabits.length === 0"
            class="d-flex justify-content-center align-items-center text-white"
            style="height: 200px"
          >
            No habit for this day
          </div>
        </div>
      </div>

      <div
        class="position-absolute plus-div d-flex justify-content-center align-items-center cursor-pointer"
        @click="navigateToAddHabitView"
      >
        <font-awesome-icon
          :icon="['fas', 'plus']"
          style="color: #5b5b5b; width: 35px; height: 35px"
        />
      </div>
      <div
        class="position-absolute minus-div d-flex justify-content-center align-items-center cursor-pointer"
        @click="navigateToDeleteHabitsView"
      >
        <font-awesome-icon
          :icon="['fas', 'minus']"
          style="color: #5b5b5b; width: 35px; height: 35px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import HomeCalender from '../components/HomeCalender.vue'
import HeaderNavbar from '../components/HeaderNavbar.vue'
import HabitElement from '../components/HabitElement.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import type { DailyHabit, DayData } from '../types/types'
import { useRouter } from 'vue-router'
import { weekDataFrontend } from '../data/data.js'
import { getWeekData } from '../api/weekData'
import { getWeekRange } from '../services/weekService'

library.add(faMinus, faPlus)

const weekData = ref<DayData[]>([])

const habitExample = weekDataFrontend[0]
watch(
  getWeekRange,
  async (newRange) => {
    const { startDate, endDate } = newRange
    if (startDate && endDate) {
      try {
        const habits = await getWeekData(startDate, endDate)
        const sortedWeekData: DayData[] = sortHabitsByDay(habits)
        weekData.value = sortedWeekData
        console.log('Days fetched:', weekData.value)
      } catch (error) {
        console.error('Error fetching week data:', error)
      }
    }
  },
  { immediate: true }
)

const filteredHabits = ref<DailyHabit[]>([])
const router = useRouter()
const timestamp = ref<Date | null>(null)

const navigateToAddHabitView = (): void => {
  router.push({ name: 'AddHabitView' })
}

const navigateToDeleteHabitsView = (): void => {
  const date = timestamp.value ? timestamp.value.toISOString().split('T')[0] : null
  if (date) {
    router.push({ name: 'DeleteHabitsView', params: { date } })
  } else {
    console.error('Date parameter is missing')
  }
}

const updateFilteredHabits = (): void => {
  const urlDate = router.currentRoute.value.params.date

  if (!weekData.value || weekData.value.length === 0) {
    console.log('No habits fetched')
    filteredHabits.value = []
    timestamp.value = null
    return
  }

  const filteredData = weekData.value.find((item: DayData) => {
    const itemTimestamp =
      typeof item.timestamp === 'string' ? new Date(item.timestamp) : item.timestamp
    const itemDate = itemTimestamp.toISOString().split('T')[0]

    return itemDate === urlDate
  })

  if (filteredData) {
    filteredHabits.value = filteredData.dailyHabits
    timestamp.value = filteredData.timestamp
    console.log('Filtered habits:', filteredHabits.value)
  } else {
    filteredHabits.value = []
    timestamp.value = null
  }
}

function sortHabitsByDay(habits: DailyHabit[]): DayData[] {
  const groupedHabits: Record<string, DayData> = {}

  habits.forEach((habit) => {
    const date = new Date(habit.timestamp).toISOString().split('T')[0]
    const completed = habit.completed

    if (!groupedHabits[date]) {
      groupedHabits[date] = {
        timestamp: new Date(habit.timestamp),
        completed: completed,
        dailyHabits: []
      }
    }

    groupedHabits[date].dailyHabits.push(habit)
  })

  return Object.values(groupedHabits)
}

onMounted(() => {
  updateFilteredHabits()
})

watch(router.currentRoute, () => {
  updateFilteredHabits()
})
</script>

<style scoped>
.max-width-500 {
  max-width: 500px;
}

.plus-div {
  width: 50px;
  height: 50px;
  background-color: #232323;
  border-radius: 15px;
  right: 2.5em;
  bottom: 5em;
  padding: 30px;
}

.minus-div {
  width: 50px;
  height: 50px;
  background-color: #232323;
  border-radius: 15px;
  left: 2.5em;
  bottom: 5em;
  padding: 30px;
}
</style>
