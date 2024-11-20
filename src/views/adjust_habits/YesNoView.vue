<template>
  <div class="d-flex justify-content-center align-items-center flex-column">
    <h2 class="title pt-5 mb-4 text-center font-weight-bold">Define your habit</h2>
    <div class="max-width-500 d-flex justify-content-center flex-column">
      <CommonInput
        class="habit input-common"
        :id="'habit-input'"
        :label="'Habit'"
        v-model="habitTitle"
      />
      <p class="text-center mt-2">eg., Go to the Gym.</p>
      <DescriptionField v-model="habitDescription" />
      <BackNextButton :filledCircle="2" :isNextDisabled="!habitTitle" @click="updateHabit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import CommonInput from '@/common/CommonInput.vue'
import DescriptionField from '@/common/CommonDescription.vue'
import BackNextButton from '../../common/BackNextButton.vue'
import habitService from '../../api/newHabitService'

// Track the state of the input
const habitTitle = ref('')
const habitDescription = ref('')

// Watch habitTitle and habitDescription to update the service
watch(habitTitle, (newTitle) => {
  habitService.setHabit({ title: newTitle })
})

watch(habitDescription, (newDescription) => {
  habitService.setHabit({ description: newDescription })
})

// Alternatively, update habit title and description when navigating
const updateHabit = () => {
  habitService.setHabit({ title: habitTitle.value, description: habitDescription.value })
}

onMounted(() => {
  habitService.resetHabit('yesno')
})
</script>

<style scoped>
.title {
  color: #fefff7;
  font-size: 18px;
}

.max-width-500 {
  max-width: 500px;
  width: 300px;
}

p {
  color: #c5c5c5;
  font-size: 10px;
}

label {
  font-size: 10px;
}
</style>
