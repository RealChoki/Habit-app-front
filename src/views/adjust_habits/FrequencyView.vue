<template>
  <div class="d-flex justify-content-center align-items-center flex-column">
    <div class="habit-goal-form">
      <h2 class="title pt-5 mb-4 text-center font-weight-bold">
        What is your Future Goal regarding this Habit?
      </h2>

      <div style="user-select: none">
        <div class="mt-5 mb-3">
          <input
            type="radio"
            id="every-day"
            value="everyday"
            v-model="frequency"
            @change="updateHabitFrequency"
          />
          <label class="d-flex align-items-center cursor-pointer" for="every-day">Every day</label>
        </div>

        <div class="mb-3">
          <input
            type="radio"
            id="specific-days-week"
            value="specificDaysWeek"
            v-model="frequency"
            @change="updateHabitFrequency"
          />
          <label class="d-flex align-items-center cursor-pointer" for="specific-days-week"
            >Specific days of the week
          </label>
        </div>

        <div v-if="frequency === 'specificDaysWeek'" class="days-of-week">
          <div class="checkbox-container" v-for="day in daysOfWeek" :key="day.value">
            <input
              class="weekly-checkbox"
              type="checkbox"
              :id="day.value"
              :value="day.value"
              v-model="selectedDaysOfWeek"
              @change="updateHabitFrequency"
            />
            <label
              class="week-day-label d-flex align-items-center mb-3 cursor-pointer"
              :for="day.value"
            >
              {{ day.label }}
            </label>
            <font-awesome-icon
              v-if="selectedDaysOfWeek.includes(day.value)"
              :icon="['fas', 'check']"
              style="color: #ffffff; pointer-events: none"
              class="checkmark"
            />
          </div>
        </div>

        <div class="mb-3"></div>
        <input
          type="radio"
          id="specific-days-month"
          value="specificDaysMonth"
          v-model="frequency"
          @change="updateHabitFrequency"
        />
        <label class="d-flex align-items-center cursor-pointer" for="specific-days-month"
          >Specific days of the month</label
        >

        <div v-if="frequency === 'specificDaysMonth'" class="days-of-month mt-3">
          <div v-for="day in daysOfMonth" :key="day" class="day-button">
            <input
              type="checkbox"
              :id="'day-' + day"
              :value="day"
              v-model="selectedDaysOfMonth"
              @change="updateHabitFrequency"
            />
            <label class="cursor-pointer" :for="'day-' + day">{{ day }}</label>
          </div>
        </div>

        <div v-if="warningMessage" class="warning-message text-warning">
          {{ warningMessage }}
        </div>
      </div>

      <BackNextButton :filledCircle="3" :isNextDisabled="isNextDisabled" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import BackNextButton from '@/common/BackNextButton.vue'
import habitService from '../../api/newHabitService'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

library.add(faCheck)
const router = useRouter()

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

// Watch for changes in frequency and update habit frequency
watch(frequency, (newFrequency, oldFrequency) => {
  if (newFrequency !== oldFrequency) {
    // Reset the days based on the frequency
    if (newFrequency === 'specificDaysWeek') {
      selectedDaysOfMonth.value = [] // Reset days of the month
    } else if (newFrequency === 'specificDaysMonth') {
      selectedDaysOfWeek.value = [] // Reset days of the week
    } else {
      selectedDaysOfWeek.value = []
      selectedDaysOfMonth.value = []
    }
    console.log('Frequency changed:', newFrequency)
    updateHabitFrequency() // Only called here for frequency change
  }
})

// Watch for changes in selectedDaysOfWeek
watch(selectedDaysOfWeek, (newDays, oldDays) => {
  if (frequency.value === 'specificDaysWeek' && newDays !== oldDays) {
    console.log('Days of the week changed:', newDays)
    updateHabitFrequency()
  }
})

// Watch for changes in selectedDaysOfMonth and update warningMessage
watch(selectedDaysOfMonth, (newDays, oldDays) => {
  if (frequency.value === 'specificDaysMonth' && newDays !== oldDays) {
    console.log('Days of the month changed:', newDays)
    updateHabitFrequency()
    if (newDays.includes(30) || newDays.includes(31)) {
      warningMessage.value =
        'Note: Habits set for the 30th or 31st won’t appear in months without these dates.'
    } else {
      warningMessage.value = null
    }
  }
})

const updateHabitFrequency = () => {
  if (frequency.value === 'everyday') {
    habitService.setHabit({ frequency: 'daily' })
  } else if (frequency.value === 'specificDaysWeek') {
    habitService.setHabit({ frequency: { week: selectedDaysOfWeek.value.slice() } })
  } else if (frequency.value === 'specificDaysMonth') {
    habitService.setHabit({ frequency: { month: selectedDaysOfMonth.value.slice() } })
  }
}

onMounted(() => {
  const habit = habitService.getHabit()

  if (!habit.title) {
    router.push('/home')
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

.warning-message {
  font-size: 10px;
  margin-top: 5px;
  margin-left: 16px;
}

.custom-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkmark {
  position: absolute;
  top: 3.5px;
  left: 4px;
  font-size: 0.5rem;
}

.checkbox-container {
  position: relative;
}

.cursor-pointer {
  cursor: pointer;
}

.disable-user-select {
  user-select: none;
}
</style>
