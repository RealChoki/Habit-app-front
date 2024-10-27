<template>
    <div class="feedback-container">
      <h2 class="text-white font-weight-bold text-center pt-5 mb-3 pb-5 fs-5">
        How would you rate the difficulty of <br>
        your habit, [Habit Name], this week? <br> Your feedback will adjust next week's <br>
        goal.
      </h2>
      <FeedbackButton @optionSelected="handleOptionSelected" />
      <BackNextButton :filledCircle="1" :isNextDisabled="isNextDisabled" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import FeedbackButton from '@/components/FeedbackButton.vue'
  import BackNextButton from '@/common/BackNextButton.vue'
  
  const isNextDisabled = ref(true)
  
  const handleOptionSelected = (selectedOption: number) => {
    isNextDisabled.value = selectedOption === null
  }
  </script>
  
  <style scoped>
  </style>
  