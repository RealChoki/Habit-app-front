<template>
  <div class="d-flex justify-content-center align-items-center flex-column">
    <h2 class="title pt-5 mb-4 text-center font-weight-bold">Define your habit</h2>
    <div class="d-flex justify-content-center flex-column">
      <CommonInput class="habit input-common" :id="'habit-input'" :label="'Habit'" v-model="habit" />
      <template>
        <v-container>
          <v-row>
            <v-col cols="12" md="4" sm="4">
              <h5>Default</h5>

              <v-number-input control-variant="default"></v-number-input>
            </v-col>

            <v-col cols="12" md="4" sm="4">
              <h5>Stacked</h5>

              <v-number-input control-variant="stacked"></v-number-input>
            </v-col>

            <v-col cols="12" md="4" sm="4">
              <h5>Split</h5>

              <v-number-input control-variant="split"></v-number-input>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <p class="text-center mt-2">eg., Drink 5 glasses of water per day.</p>
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

// Track the state of the inputs
const habit = ref('')
const goal = ref(0)

// Computed property to check if the next button should be disabled
const isNextDisabled = computed(() => !habit.value || !goal.value || goal.value <= 0)
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
}

label {
  font-size: 10px;
}

p {
  color: #c5c5c5;
  font-size: 10px;
}
</style>