<template>
  <div>
    <h2 class="text-white font-weight-bold text-center pt-5 mb-3 pb-5 fs-5">
    Which habits do you want to  <br />
    delete?
    </h2>
    <div class="container-fluid d-flex justify-content-center">
      <div>
        <div class="border-bottom border-white">
          <p class="text-white text-left">1 selected</p>
          <font-awesome-icon 
            :icon="['fas', 'trash']" 
            style="color: #ffffff;" />
        </div>
        <div class="max-width-500">
          <TaskElement
            v-for="(task, key) in filteredTasks"
            :key="key"
            :task="task"
            :openTaskModal="openTaskModal"
            :timestamp="timestamp"
          />
        </div>
      </div>
      <TaskModal
        v-if="selectedTask !== null"
        :showModal="showModal"
        :closeModal="closeModal"
        :timestamp="timestamp"
        :task="selectedTask"
      />

      <div
        class="position-absolute plus-div d-flex justify-content-center align-items-center cursor-pointer"
        @click="navigateToEvaluateView"
      >
        <font-awesome-icon
          :icon="['fas', 'plus']"
          style="color: #5b5b5b; width: 35px; height: 35px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import HomeCalender from '../components/HomeCalender.vue'
import TaskModal from '../components/TaskModal.vue'
import HeaderNavbar from '../components/HeaderNavbar.vue'
import TaskElement from '../components/TaskElement.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import type { Task, DayData } from '../types/types'
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

const filteredTasks = ref<Task[]>([])
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

const navigateToEvaluateView = (): void => {
  router.push({ name: 'EvaluateView' })
}

const navigateToDeleteHabitsView = (): void => {
  router.push({ name: 'DeleteHabitsView' })
}

const updateFilteredTasks = (): void => {
  const urlDate = router.currentRoute.value.params.date
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

onMounted(() => {
  updateFilteredTasks()
})

watch(router.currentRoute, () => {
  updateFilteredTasks()
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
