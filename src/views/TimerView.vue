<template>
    <div class="d-flex justify-content-center align-items-center flex-column">
      <h2 class="title pt-5 mb-4 text-center font-weight-bold">Define your habit</h2>
      <div class="d-flex justify-content-center flex-column relative">
        <label class="text-white" for="habitInput">Habit</label>
        <HabitField class="habit"/>
        <label class="text-white mt-2" for="habitInput">Time</label>
        <HabitField class="goal"/>
        <p class="a-day">a day.</p>
        <p class="text-center mt-2">eg., Play the piano for 1 hour per day.</p>
        <DescriptionField />
        <BackNextButton :filledCircle="2"/>
      </div>
      </div>
    </template>
    
    <script setup lang="ts">
    import HabitField from '@/components/HabitField.vue'
    import DescriptionField from '@/components/DescriptionField.vue'
    import BackNextButton from '../components/BackNextButton.vue'
    </script>
    
    <style scoped>
    .title {
      color: #fefff7;
      font-size: 18px;
    }
    
    .habit{
        width: 300px;
    }
    .goal{
        width: 150px;
    }

    label {
        font-size: 10px;
    }

    p {
        color: #c5c5c5;
        font-size: 10px;
    }

    .a-day {
        position: absolute;
        margin: 0 0 2px 16em;

    }
    
   </style>
    