<template>
  <div>
    <div class="habit-date-picker__container">
      <div class="habit-date-picker__wrapper">
        <h2 class="habit-date-picker__title">
          What time frame do you want <br />
          for this habit?
        </h2>
        <div class="habit-date-picker__fields">
          <div class="habit-date-picker__field habit-date-picker__field--with-border">
            <div class="habit-date-picker__field-label" @click="openStartDatePicker">
              <font-awesome-icon class="habit-date-picker__icon" :icon="['fas', 'calendar-days']" />
              <p class="habit-date-picker__text">Start date</p>
            </div>
            <Datepicker
              v-model="startDate"
              dark
              :enable-time-picker="false"
              ref="startDatePicker"
              class="habit-date-picker__input"
            />
          </div>
          <div class="habit-date-picker__field" v-if="showEndDate">
            <div class="habit-date-picker__field-label" @click="openEndDatePicker">
              <font-awesome-icon
              class="habit-date-picker__icon"
              :icon="['fas', 'calendar-check']"
              />
              <p class="habit-date-picker__text">End date</p>
            </div>
            <Datepicker
            v-model="endDate"
            dark
            :enable-time-picker="false"
            ref="endDatePicker"
            class="habit-date-picker__input"
            />
            <p class="delete-enddate" @click="deleteEndDate">Delete end date</p>
          </div>
          <div class="d-flex align-items-center addEndDatediv " v-else @click="addEndDate">
            <font-awesome-icon :icon="['fas', 'square-plus']" style="color: #42b883; font-size: 2.1em;" />
            <p class="add-enddate" >Add end date</p>
          </div>
        </div>
        <BackNextButton :filledCircle="4" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendarCheck, faCalendarDays, faSquarePlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import BackNextButton from '@/common/BackNextButton.vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

library.add(faCalendarCheck, faCalendarDays, faSquarePlus)

const startDate = ref(new Date())
const endDate = ref(new Date(new Date().setFullYear(new Date().getFullYear() + 1)))
const showEndDate = ref(true)

const endDatePicker = ref(null)
const startDatePicker = ref(null)

const openStartDatePicker = () => {
  const datePickerInput = startDatePicker.value?.$el.querySelector('input')
  if (datePickerInput) {
    datePickerInput.click()
  }
}

const openEndDatePicker = () => {
  const datePickerInput = endDatePicker.value?.$el.querySelector('input')
  if (datePickerInput) {
    datePickerInput.click()
  }
}

const deleteEndDate = () => {
  endDate.value = null
  showEndDate.value = false
}

const addEndDate = () => {
  endDate.value = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  showEndDate.value = true
}
</script>

<style>
.habit-date-picker__container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.habit-date-picker__wrapper {
  width: 100%;
  max-width: 365px;
}

.habit-date-picker__title {
  color: #fefff7;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  padding-top: 20px;
  margin-bottom: 20px;
}

.habit-date-picker__fields {
  display: flex;
  flex-direction: column;
}

.habit-date-picker__field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 1em;
  padding: 16px 8px;
  position: relative;
}

.habit-date-picker__field--with-border {
  border-bottom: 1px solid #232323;
}

.habit-date-picker__field-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.habit-date-picker__icon {
  border-radius: 5px;
  width: 13px;
  height: 13px;
  background-color: #232323;
  color: #5b5b5b;
  padding: 10px;
}

.habit-date-picker__text {
  margin-bottom: 0;
  margin-left: 10px;
  color: white;
  font-size: 16px;
}

.habit-date-picker__input {
  width: 48%;
}

/* Custom Date Picker Theme */
.dp__theme_dark {
  --dp-background-color: #212121;
  --dp-text-color: #fff;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #fff;
  --dp-primary-color: #42b883;
  --dp-border-color: #2d2d2d;
}

.delete-enddate{
  position: absolute;
  right: 8px;
  bottom: -16px;
  font-size: 11px;
  color: #b84242;
  font-style: italic;
  cursor: pointer;
}

.add-enddate{
  cursor: pointer;
  color: #42b883;
  width: 40%;
  font-size: 15px;
  margin: 0px;
}

.addEndDatediv{
  height: 3em;
  gap: 9px;
  margin-left: 1.6em;
  margin-top: 0.7em;
  cursor: pointer;
}
</style>