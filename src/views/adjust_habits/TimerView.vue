<template>
  <div class="d-flex justify-content-center align-items-center flex-column">
    <h2 class="title pt-5 mb-4 text-center font-weight-bold">Define your habit</h2>
    <div class="d-flex justify-content-center flex-column relative">
      <CommonInput class="habit input-common" :id="'habit-input'" :label="'Habit'" v-model="habit" />
      <p class="goal-title">Goal</p>
      <VueDatePicker class="goal mt-1" v-model="time" time-picker dark />
      <p class="a-day">a day.</p>
      <p class="text-center mt-2">eg., Play the piano for 1 hour per day.</p>
      <DescriptionField />
      <BackNextButton :filledCircle="2" :isNextDisabled="isNextDisabled" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CommonInput from '@/common/CommonInput.vue'
import DescriptionField from '@/common/CommonDescription.vue'
import BackNextButton from '@/common/BackNextButton.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// Track the state of the inputs
const habit = ref('')
const time = ref(null)

// Computed property to check if both habit and time are set
const isNextDisabled = computed(() => !habit.value || !time.value)
</script>

<style scoped>
.title {
  color: #fefff7;
  font-size: 18px;
}

.habit {
  width: 300px;
}

.goal {
  width: 150px;
  border-color: white;
}

label {
  font-size: 10px;
}

p {
  color: #c5c5c5;
  font-size: 10px;
}

.a-day {
  position: absolute;
  margin: 0 0 -23px 16em;
}

.goal-title {
  font-size: 12px;
  color: #ffffff;
  margin-bottom: 0px;
  margin-top: 7px;
}

.dp__theme_dark {
    --dp-background-color: #131213;
    --dp-border-color: #ffffff;
    --dp-border-color-hover: #fff;
    --dp-border-color-focus: #fff;
}
</style>