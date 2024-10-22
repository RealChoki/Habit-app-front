<template>
  <div>
    <HeaderNavbar />
    <div class="container-fluid d-flex justify-content-center">
      <div>
        <HomeCalender />
        <div class="max-width-500">
          <HabitElement
            v-for="(habit, key) in filteredHabits"
            :key="key"
            :habit="habit"
            :timestamp="timestamp"
          />
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
import type { Habit, DayData } from '../types/types'
import { useRouter } from 'vue-router'
import { weekData } from '../data/data.js'
import { getWeekData } from '../api/weekData'
import { getWeekRange } from '../services/weekService'

library.add(faMinus, faPlus)

const habitsFetched = ref<DayData>()

watch(
  getWeekRange,
  async (newRange) => {
    const { startDate, endDate } = newRange
    if (startDate && endDate) {
      try {
        const habits = await getWeekData(startDate, endDate)
        habitsFetched.value = habits
        console.log('Days:', habits)
        console.log('Days fetched:', habitsFetched.value)
      } catch (error) {
        console.error('Error fetching week data:', error)
      }
    }
  },
  { immediate: true }
)

const filteredHabits = ref<Habit[]>([])
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
  const filteredData = weekData.find((item: DayData) => {
    return (
      // item.metadata &&
      item.timestamp &&
      item.timestamp.toISOString().split('T')[0] === urlDate
    )
  })

  if (filteredData) {
    filteredHabits.value = Object.values(filteredData.habits)
    timestamp.value = filteredData.timestamp
  } else {
    filteredHabits.value = []
    timestamp.value = null
  }
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
