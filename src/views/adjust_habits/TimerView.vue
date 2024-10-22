<template>
  <div class="d-flex justify-content-center align-items-center flex-column">
    <h2 class="title pt-5 mb-4 text-center font-weight-bold">Define your habit</h2>
    <div class="d-flex justify-content-center flex-column relative">
      <CommonInput
        class="habit input-common"
        :id="'habit-input'"
        :label="'Habit'"
        v-model="habit"
      />
      <p class="goal-title">Goal</p>
      <div class="d-flex align-items-center">
        <VueDatePicker
          class="goal mt-1"
          v-model="time"
          time-picker
          dark
          :enable-seconds="true"
          :format="'HH:mm:ss'"
          @open="loadTimePickerValue"
        >
          <template #clear-icon>
            <font-awesome-icon
              class="cursor-pointer btn-click"
              style="width: 12px; height: 12px; margin-end: 0.8em"
              :icon="['fas', 'redo']"
              @click.stop="clearTimePickerValue"
            />
          </template>
        </VueDatePicker>
        <p class="m-0 ms-2 mt-1">a day.</p>
      </div>

      <p class="text-center mt-2">eg., Play the piano for 1 hour per day.</p>
      <DescriptionField />
      <BackNextButton :filledCircle="2" :isNextDisabled="isNextDisabled" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import CommonInput from '@/common/CommonInput.vue'
import DescriptionField from '@/common/CommonDescription.vue'
import BackNextButton from '@/common/BackNextButton.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faRedo } from '@fortawesome/free-solid-svg-icons'

// Add the icons to the library
library.add(faRedo)

// Track the state of the inputs
const habit = ref('')
const time = ref(null)

const loadTimePickerValue = () => {
  if (!time.value) {
    time.value = { hours: 0, minutes: 0, seconds: 0 }
  }
}

const clearTimePickerValue = () => {
  time.value = { hours: 0, minutes: 0, seconds: 0 }
}

const isTimeValid = computed(() => {
  return time.value.hours !== 0 || time.value.minutes !== 0 || time.value.seconds !== 0
})

const isNextDisabled = computed(() => !habit.value || !isTimeValid.value)

watch(time, (newTime) => {
  console.log('Time changed:', newTime.hours, newTime.minutes, newTime.seconds)
  console.log('Is time valid:', isTimeValid)
})
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
  width: 135px;
  border-color: white;
}

label {
  font-size: 10px;
}

p {
  color: #c5c5c5;
  font-size: 10px;
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