<template>
  <div class="calender d-flex align-items-center mb-2">
    <!-- Arrow icon to the left -->
    <font-awesome-icon
      :icon="['fas', 'chevron-left']"
      class="arrow-icon mt-0 me-2 cursor-pointer text-white"
      @click="previousWeek"
    />

    <div class="day cursor-pointer" v-for="day in days" :key="day.date">
      <p>{{ day.day }}</p>
      <div class="date">
        <p>{{ day.date }}</p>
      </div>
    </div>

    <!-- Arrow icon to the right -->
    <font-awesome-icon
      :icon="['fas', 'chevron-right']"
      class="arrow-icon mt-0 ms-2 cursor-pointer text-white"
      @click="nextWeek"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

// Add the arrow icons to the library
library.add(faChevronLeft, faChevronRight)

const days = ref([
  { day: 'Mon', date: 1 },
  { day: 'Tue', date: 2 },
  { day: 'Wed', date: 3 },
  { day: 'Thu', date: 4 },
  { day: 'Fr', date: 5 },
  { day: 'Sat', date: 6 },
  { day: 'Sun', date: 7 }
])
</script>

<style scoped>
.calender {
  gap: 4px;
}

.day {
  width: 40px;
  height: 50px;
  border-radius: 15px;
  background-color: #1a1a1b;
  padding: 0;
  position: relative;
}

.day p {
  font-size: 10px;
  margin: 0;
  text-align: center;
  padding-top: 5px;
  color: #c5c5c5;
}

.date {
  width: 40px;
  height: 28.85px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  background-color: #232323;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 0;
}

.date p {
  font-size: 13px;
  font-weight: bold;
  color: #FEFFF7;
}
</style>
