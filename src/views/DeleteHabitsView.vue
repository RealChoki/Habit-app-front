<template>
  <div class="max-width-500">
    <h2 class="text-white font-weight-bold text-center pt-5 mb-3 pb-5 fs-5">
      Which habits do you want to <br />
      delete?
    </h2>
    <div class="container-fluid d-flex justify-content-center">
      <div class="border-bottom border-white w-100 d-flex justify-content-between align-items-center">
        <p class="text-white mb-0">{{ selectedTasks.length }} selected</p>
        <font-awesome-icon 
          :icon="['fas', 'trash']" 
          class="mb-1"
          style="color: #ffffff; width: 23px; height: 23px" 
          @click="deleteSelectedTasks"
        />
      </div>
    </div>
    <div class="container-fluid d-flex justify-content-center">
      <div>
        <TaskCheckboxElement
          v-for="(task, key) in filteredTasks"
          :key="key"
          :task="task"
          :openTaskModal="openTaskModal"
          :toggleTaskSelection="toggleTaskSelection"
          :isSelected="selectedTasks.includes(task)"
        />
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
import type { Task, DayData } from '../types/types'
import { useRouter } from 'vue-router'
import { weekData } from '../data/data.js'
import { getWeekData } from '../api/weekData'
import { getWeekRange } from '../services/weekService'
import TaskCheckboxElement from '../components/TaskCheckboxElement.vue'

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

const filteredTasks = ref<Task[]>([])
const selectedTasks = ref<Task[]>([])
const router = useRouter()
const showModal = ref<boolean>(false)
const selectedTask = ref<Task | null>(null)
const timestamp = ref<Date | null>(null)

const openTaskModal = (task: Task): void => {
  selectedTask.value = task
  showModal.value = true
}

const closeModal = (): void => {
  showModal.value = false
}

const navigateToHomeView = (): void => {
  router.push({ name: 'HomeView'})
}

const updateFilteredTasks = (): void => {
  const urlDate = router.currentRoute.value.params.date; // Ensure this is the correct date
  const filteredData = weekData.find((item: DayData) => {
    return (
      item.metadata &&
      item.metadata.timestamp &&
      item.metadata.timestamp.toISOString().split('T')[0] === urlDate
    )
  })

  if (filteredData) {
    filteredTasks.value = Object.values(filteredData.tasks)
    timestamp.value = filteredData.metadata.timestamp
  } else {
    filteredTasks.value = []
    timestamp.value = null
  }
}

const toggleTaskSelection = (task: Task): void => {
  const index = selectedTasks.value.indexOf(task)
  if (index === -1) {
    selectedTasks.value.push(task)
  } else {
    selectedTasks.value.splice(index, 1)
  }
}

const deleteSelectedTasks = (): void => {
  filteredTasks.value = filteredTasks.value.filter(task => !selectedTasks.value.includes(task))
  selectedTasks.value = []
}

onMounted(() => {
  updateFilteredTasks()
})

watch(router.currentRoute, () => {
  updateFilteredTasks()
})
</script>

<style scoped>
.max-width-500 {
  max-width: 380px;
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