<template>
  <div class="d-flex flex-column ml-3">
    <h2 class="title pt-5 mb-4 text-center font-weight-bold">
      What time frame do you want <br />
      for this habit?
    </h2>
    <div class="d-flex flex-column align-items-start justify-content-start">
      <div class="d-flex align-items-center mb-3">
        <font-awesome-icon class="rounded-square" :icon="['fas', 'calendar-days']" style="color: #5b5b5b"/>
        <p class="mb-0 ms-2 text-white">Start date</p>
      </div>
      <div class="d-flex align-items-center mb-3">
        <font-awesome-icon class="rounded-square" :icon="['fas', 'calendar-check']" style="color: #5b5b5b"/>
        <p class="mb-0 ms-2 text-white">End date</p>
      </div>
    </div>
  </div>
  <BackNextButton :filledCircle="4" />
</template>

<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendarCheck, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import BackNextButton from '../components/BackNextButton.vue'
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

.rounded-square {
  border-radius: 5px;
  width: 12px;
  height: 12px;
  background-color: #232323;
  color: #5b5b5b;
  padding: 10px;
}
</style>
