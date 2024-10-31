<template>
    <div class="feedback-container">
      <h2 class="font-weight-bold text-center pt-5 pb-5">
        How would you rate the difficulty of <br>
        your habit, [Habit Name], this <br> 
        [Frequency]? Your feedback will<br>
        adjust next [Frequency]'s goal.
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
  .feedback-container h2 {
    color: #fefff7;
    font-size: 1.1rem;
    max-width: 350px;
  }

  .feedback-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  </style>
  