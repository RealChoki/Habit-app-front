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
        />
      </div>
    </div>
    <TaskModal
      :showModal="showModal"
      :closeModal="closeModal"
      :metadata="data.metadata"
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

// Define tasks
const data = {
  metadata: {
    timestamp: new Date()
  },
  tasks: {
    gymTask: {
      id: 1,
      type: 'yesno',
      frequency: 'daily',
      title: 'Go to gym',
      description: 'Go to the gym and workout for at least 1 hour',
      value: null
    },
    waterTask: {
      id: 2,
      type: 'numeric',
      frequency: 'daily',
      title: 'Drink 5 Glasses of Water',
      description: 'Drink at least 5 glasses of water today',
      subtype: 'increment',
      count: 0,
      goal: 5,
      value: null
    },
    pianoTask: {
      id: 3,
      type: 'timer',
      frequency: 'daily',
      title: 'Play 1 hour of Piano',
      description: 'Play the piano for at least 1 hour today',
      default: 3,
      timer: 3,
      value: null
    }
  }
}

const showModal = ref(false)
const selectedTask = ref(null)

const openTaskModal = (task) => {
  selectedTask.value = task
  showModal.value = true
}
const closeModal = () => {
  showModal.value = false
}

const router = useRouter()

const navigateToEvaluateView = () => {
  router.push({ name: 'EvaluateView' })
}
const filteredTasks = ref([])

const updateFilteredTasks = () => {
  const urlDate = router.currentRoute.value.params.date
  const metadataDate = data.metadata.timestamp.toISOString().split('T')[0]

  if (urlDate === metadataDate) {
    filteredTasks.value = Object.values(data.tasks)
  } else {
    filteredTasks.value = []
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
