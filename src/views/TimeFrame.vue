<template>
    <div class="d-flex justify-content-center align-items-center flex-column">
      <div class="width">
        <h2 class="title pt-5 mb-5 text-center font-weight-bold">
          What time frame do you want <br />
          for this habit?
        </h2>
        <div class="d-flex flex-column">
          <div class="d-flex align-items-center justify-content-between changethis bor-bot">
            <div class="d-flex align-items-center">
              <font-awesome-icon class="rounded-square" :icon="['fas', 'calendar-days']" style="color: #5b5b5b"/>
              <label class="mb-0 ms-2 text-white fs-6" for="start-input" >Start date</label>
            </div>
            <input type="text" class="input-common" id="start-input"/>
          </div>
          <div class="d-flex align-items-center justify-content-between changethis">
            <div class="d-flex align-items-center">
              <font-awesome-icon class="rounded-square" :icon="['fas', 'calendar-check']" style="color: #5b5b5b"/>
              <label class="mb-0 ms-2 text-white fs-6" for="end-input">End date</label>
            </div>
            <input type="text" class="input-common" id="end-input"/>
          </div>
        </div>
        <BackNextButton :filledCircle="4" />
     </div>
    </div>
</template>

<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendarCheck, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import BackNextButton from '../components/BackNextButton.vue'
import CommonInput from '@/common/CommonInput.vue'

import { defineComponent } from 'vue';

library.add(faCalendarCheck, faCalendarDays)

defineComponent({
  components: {
    FontAwesomeIcon,
    BackNextButton
  }
})
</script>

<style scoped>
.changethis{
  margin: 0 1em;
  padding: 16px 8px;
}

.width{
  width: 100%;
  max-width: 365px;
}

.bor-bot{
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
  width: 12px;
  height: 12px;
  background-color: #232323;
  color: #5b5b5b;
  padding: 10px;
}

.input-common {
  height: 29px;
  background: #131213;
  border: 1px solid #ffffff;
  border-radius: 5px;
  color: #ffffff;
  width: 5em;
}

.input-common:focus {
  outline: none;
  box-shadow: none;
  background-color: #131213;
  color: #ffffff;
  border-color: #ffffff;
}

</style>
