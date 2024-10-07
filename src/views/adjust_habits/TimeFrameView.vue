<template>
  <div>
    <div class="d-flex justify-content-center align-items-center flex-column">
      <div class="width">
        <h2 class="title pt-5 mb-5 text-center font-weight-bold">
          What time frame do you want <br />
          for this habit?
        </h2>
        <div class="d-flex flex-column">
          <div class="d-flex align-items-center justify-content-between changethis bor-bot">
            <div class="d-flex align-items-center cursor-pointer" @click="openStartDatePicker">
              <font-awesome-icon
                class="rounded-square"
                :icon="['fas', 'calendar-days']"
                style="color: #5b5b5b"
              />
              <p class="mb-0 ms-2 text-white fs-6">Start date</p>
            </div>
            <Datepicker
              v-model="startDate"
              dark
              :enable-time-picker="false"
              ref="startDatePicker"
              class="w-48"
            />
          </div>
          <div class="d-flex align-items-center justify-content-between changethis">
            <div class="d-flex align-items-center cursor-pointer" @click="openEndDatePicker">
              <font-awesome-icon
                class="rounded-square"
                :icon="['fas', 'calendar-check']"
                style="color: #5b5b5b"
              />
              <p class="mb-0 ms-2 text-white fs-6">End date</p>
            </div>
            <Datepicker
              v-model="endDate"
              dark
              :enable-time-picker="false"
              ref="endDatePicker"
              class="w-48"
            />
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
import { faCalendarCheck, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import BackNextButton from '@/common/BackNextButton.vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
library.add(faCalendarCheck, faCalendarDays)

const startDate = ref(new Date())
const endDate = ref(new Date(new Date().setFullYear(new Date().getFullYear() + 1)))

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

</script>

<style>
.changethis {
  margin: 0 1em;
  padding: 16px 8px;
}

.width {
  width: 100%;
  max-width: 365px;
}

.bor-bot {
  border-bottom: 1px solid #232323;
}

.title {
  color: #fefff7;
  font-size: 18px;
}

p {
  color: #c5c5c5;
  font-size: 10px;
}

label {
  font-size: 10px;
}

.rounded-square {
  border-radius: 5px;
  width: 13px;
  height: 13px;
  background-color: #232323;
  color: #5b5b5b;
  padding: 10px;
}

.w-48 {
  width: 48%;
}

.dp__theme_dark {
  --dp-background-color: #212121;
  --dp-text-color: #fff;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #fff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #42b883;
  --dp-primary-disabled-color: #61a8ea;
  --dp-primary-text-color: #fff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #2d2d2d;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-border-color-focus: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-disabled-color-text: #d0d0d0;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-marker-color: #e53935;
  --dp-tooltip-color: #3e3e3e;
  --dp-highlight-color: rgb(0 92 178 / 20%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
  --dp-range-between-border-color: var(--dp-hover-color, #fff);
}
</style>