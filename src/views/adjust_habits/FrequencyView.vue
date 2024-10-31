<template>
  <div class="d-flex justify-content-center align-items-center flex-column">
    <div class="habit-goal-form">
      <h2 class="title pt-5 mb-4 text-center font-weight-bold">
        What is your Future Goal regarding this Habit?
      </h2>

      <div class="mt-5 mb-3 cursor-pointer">
        <input type="radio" id="every-day" value="everyday" v-model="frequency" />
        <label class="d-flex align-items-center" for="every-day">Every day</label>
      </div>

      <div class="mb-3">
        <input type="radio" id="specific-days-week" value="specificDaysWeek" v-model="frequency" />
        <label class="d-flex align-items-center" for="specific-days-week"
          >Specific days of the week</label
        >
      </div>

      <div v-if="frequency === 'specificDaysWeek'" class="days-of-week">
        <div v-for="day in daysOfWeek" :key="day.value">
          <input
            class="weekly-checkbox"
            type="checkbox"
            :id="day.value"
            :value="day.value"
            v-model="selectedDaysOfWeek"
          />
          <label class="week-day-label d-flex align-items-center mb-3" :for="day.value">{{
            day.label
          }}</label>
        </div>
      </div>

      <div class="mb-3">
        <input
          type="radio"
          id="specific-days-month"
          value="specificDaysMonth"
          v-model="frequency"
        />
        <label class="d-flex align-items-center" for="specific-days-month"
          >Specific days of the month</label
        >
      </div>

      <div v-if="frequency === 'specificDaysMonth'" class="days-of-month">
        <div v-for="day in daysOfMonth" :key="day" class="day-button">
          <input type="checkbox" :id="'day-' + day" :value="day" v-model="selectedDaysOfMonth" />
          <label :for="'day-' + day">{{ day }}</label>
        </div>
      </div>

      <div v-if="warningMessage" class="warning-message text-warning">
        {{ warningMessage }}
      </div>

      <BackNextButton :filledCircle="3" :isNextDisabled="isNextDisabled" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import BackNextButton from '@/common/BackNextButton.vue'

interface DayOption {
  label: string
  value: string
}

const frequency = ref<string | null>(null)
const daysOfWeek: DayOption[] = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
  { label: 'Sunday', value: 'sunday' }
]
const selectedDaysOfWeek = ref<string[]>([])
const daysOfMonth: number[] = Array.from({ length: 31 }, (_, i) => i + 1)
const selectedDaysOfMonth = ref<number[]>([])
const warningMessage = ref<string | null>(null)

const isNextDisabled = computed(() => {
  if (frequency.value === 'everyday') {
    return false
  } else if (frequency.value === 'specificDaysWeek') {
    return selectedDaysOfWeek.value.length === 0
  } else if (frequency.value === 'specificDaysMonth') {
    return selectedDaysOfMonth.value.length === 0
  }
  return true
})

// Watch for changes in frequency and reset the selected days accordingly
watch(frequency, (newFrequency, oldFrequency) => {
  if (newFrequency === 'specificDaysWeek' && oldFrequency === 'specificDaysMonth') {
    selectedDaysOfMonth.value = []
  } else if (newFrequency === 'specificDaysMonth' && oldFrequency === 'specificDaysWeek') {
    selectedDaysOfWeek.value = []
  }
})

// Watch for changes in selectedDaysOfMonth and update warningMessage
watch(selectedDaysOfMonth, (newDays) => {
  if (newDays.includes(30) || newDays.includes(31)) {
    warningMessage.value = 'Note: Habits set for the 30th or 31st won’t appear in months without these dates.'
  } else {
    warningMessage.value = null
  }
})
</script>

<style scoped>
.habit-goal-form {
  color: white;
  padding: 0px 40px 0px 40px;
  max-width: 370px;
}

h2 {
  text-align: center;
}

.days-of-week {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-left: 1em;
}

.days-of-month {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-left: 1em;
}

.day-button input {
  display: none;
}

.day-button label {
  width: 28px;
  height: 28px;
  text-align: center;
  border: 2px solid #5b5b5b;
  border-radius: 10px;
  font-size: 12px;
  margin-bottom: 9px;
  padding-top: 3px;
}

.day-button input:checked + label {
  background-color: #5b5b5b;
}

.title {
  color: #fefff7;
  font-size: 18px;
}

.week-day-label {
  color: #c5c5c5;
  font-size: 10px;
}

/* Hide the default radio button */
input[type='radio'] {
  display: none;
}

/* Create a custom radio button */
input[type='radio'] + label:before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border-radius: 50%;
  border: 2px solid #5b5b5b;
  background-color: #131213;
}

/* Style the custom radio button when it's checked */
input[type='radio']:checked + label:before {
  background-color: #5b5b5b;
}

.weekly-checkbox {
  display: none;
}

.weekly-checkbox + label:before {
  content: '';
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 5px;
  border: 2px solid #5b5b5b;
  background-color: #131213;
  position: relative;
}

.weekly-checkbox:checked + label:before {
  background-color: #5b5b5b;
}

.weekly-checkbox:checked + label:after {
  content: '\2713';
  position: absolute;
  transform: translate(50%, 0%);
  color: white;
}

.warning-message {
  font-size: 10px;
  margin-top: 5px;
  margin-left: 16px;
}
</style>