<template>
    <h2 class="title pt-5 mb-5 text-center font-weight-bold">
          Which Habits do you want <br />
          to delete?
    </h2>
    <div class="container-fluid d-flex justify-content-center">
      <div>
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
        class="position-absolute plus-div d-flex justify-content-center align-items-center cursor-pointer"
        @click="navigateToEvaluateView"
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
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import TaskModal from '@/components/TaskModal.vue'
  import TaskElement from '@/components/TaskElement.vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faPlus } from '@fortawesome/free-solid-svg-icons'
  import { faMinus } from '@fortawesome/free-solid-svg-icons'
  import { useRouter } from 'vue-router'
  
  library.add(faPlus)
  library.add(faMinus)
  
  import { weekData } from '@/data/data.js'
  import type { Task } from '@/types/types.d.ts'
    
  const filteredTasks = ref([])
  const router = useRouter()
  const showModal = ref(false)
  const selectedTask = ref(null)
  const metadata = ref(null)
  
  const openTaskModal = (task: Task) => {
    selectedTask.value = task
    showModal.value = true
  }
  
  const closeModal = () => {
    showModal.value = false
  }
  
  const navigateToEvaluateView = () => {
    router.push({ name: 'EvaluateView' })
  }
  
  const navigateToDeleteHabitsView = () => {
    router.push({ name: 'DeleteHabitsView' })
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
  
    .title {
    color: #fefff7;
    font-size: 18px; 
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
  