<template>
  <div class="d-flex justify-content-center align-items-center flex-column">
    <h2 class="title pt-5 mb-4 text-center font-weight-bold">Define your habit</h2>
    <div class="max-width-500 d-flex justify-content-center flex-column">
      <CommonInput class="habit input-common" :id="'habit-input'" :label="'Habit'" />
      <p class="text-center mt-2">eg., Go to the Gym.</p>
      <DescriptionField />
      <BackNextButton :filledCircle="2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CommonInput from '@/common/CommonInput.vue'
import DescriptionField from '@/common/CommonDescription.vue'
import BackNextButton from '../../common/BackNextButton.vue'
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
</style>
