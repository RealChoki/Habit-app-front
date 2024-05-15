<template>
  <HeaderNavbar />
  <div class="container-fluid d-flex justify-content-center">
    <div>
      <HomeCalender />
      <div class="max-width-500">
        <TaskElement
          v-for="(task, key) in filteredTasks"
          :key="key"
          :task="task"
          :openTaskModal="openTaskModal"
          :metadata="metadata"
        />
      </div>
    </div>
    <TaskModal
      :showModal="showModal"
      :closeModal="closeModal"
      :metadata="metadata"
      :task="selectedTask"
    />
    <div
      class="position-absolute custom-div d-flex justify-content-center align-items-center cursor-pointer"
      @click="navigateToEvaluateView"
    >
      <font-awesome-icon
        :icon="['fas', 'plus']"
        style="color: #5b5b5b; width: 35px; height: 35px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import HomeCalender from '@/components/HomeCalender.vue'
import TaskModal from '@/components/TaskModal.vue'
import HeaderNavbar from '@/components/HeaderNavbar.vue'
import TaskElement from '@/components/TaskElement.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'vue-router'

library.add(faPlus)

import { weekData } from '@/data/data.js'

const filteredTasks = ref([])
const router = useRouter()
const showModal = ref(false)
const selectedTask = ref(null)
const metadata = ref(null)

const openTaskModal = (task) => {
  selectedTask.value = task
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const navigateToEvaluateView = () => {
  router.push({ name: 'EvaluateView' })
}

const updateFilteredTasks = () => {
  console.log(weekData)
  const urlDate = router.currentRoute.value.params.date
  const filteredData = weekData.find((item) => {
    return item.metadata.timestamp.toISOString().split('T')[0] === urlDate
  })

  if (filteredData) {
    filteredTasks.value = Object.values(filteredData.tasks)
    metadata.value = filteredData.metadata
  } else {
    filteredTasks.value = []
    metadata.value = null
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

.custom-div {
  width: 50px;
  height: 50px;
  background-color: #232323;
  border-radius: 15px;
  right: 2.5em;
  bottom: 5em;
  padding: 30px;
}
</style>
