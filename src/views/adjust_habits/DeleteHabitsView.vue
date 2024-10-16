<template>
  <div>
    <h2 class="text-white font-weight-bold text-center pt-5 mb-3 pb-5 fs-5">
      Which habits do you want to <br />
      delete?
    </h2>
    <div class="container-fluid d-flex justify-content-center">
      <div
        class="border-bottom border-white min-width-400 d-flex justify-content-between align-items-center px-2"
      >
        <p class="text-white mb-0 goodnamingconvention">{{ selectedHabits.length }} selected</p>
        <font-awesome-icon
          :icon="['fas', 'trash']"
          class="cursor-pointer mb-2"
          style="color: #ffffff; width: 20px; height: 20px"
          @click="deleteSelectedHabits"
        />
      </div>
    </div>
    <div class="container-fluid d-flex justify-content-center">
      <div>
        <div class="min-width-400">
          <HabitCheckboxElement
            v-for="(habit, key) in filteredHabits"
            :key="key"
            :habit="habit"
            :toggleHabitSelection="toggleHabitSelection"
            :isSelected="selectedHabits.includes(habit)"
          />
        </div>
      </div>
    </div>
    <div
      class="position-absolute plus-div d-flex justify-content-center align-items-center cursor-pointer"
      @click="navigateToHomeView"
    >
      <font-awesome-icon
        :icon="['fas', 'house']"
        style="color: #5b5b5b; width: 29px; height: 29px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineProps } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faTrash } from '@fortawesome/free-solid-svg-icons'
import type { Habit, DayData } from '../../types/types'
import { useRouter } from 'vue-router'
import { weekData } from '../../data/data.js'
import { getWeekData } from '../../api/weekData'
import { getWeekRange } from '../../services/weekService'
import HabitCheckboxElement from '../../components/HabitCheckboxElement.vue'

library.add(faHouse, faTrash)

const props = defineProps<{ date: string }>()

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
const selectedHabits = ref<Habit[]>([])
const router = useRouter()
const timestamp = ref<Date | null>(null)


const navigateToHomeView = (): void => {
  router.push({ name: 'HomeView' })
}

const updateFilteredHabits = (): void => {
  const urlDate = props.date
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

const toggleHabitSelection = (habit: Habit): void => {
  const index = selectedHabits.value.indexOf(habit)
  if (index === -1) {
    selectedHabits.value.push(habit)
  } else {
    selectedHabits.value.splice(index, 1)
  }
}

const deleteSelectedHabits = (): void => {
  filteredHabits.value = filteredHabits.value.filter((habit) => !selectedHabits.value.includes(habit))
  selectedHabits.value = []
}

onMounted(() => {
  updateFilteredHabits()
})

watch(router.currentRoute, () => {
  updateFilteredHabits()
})
</script>

<style scoped>
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

.min-width-400 {
  min-width: 345px;
}

.goodnamingconvention {
  margin-left: 2px;
}
</style>