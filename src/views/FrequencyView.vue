<script setup lang="ts">
  import { ref } from 'vue';  
  import BackNextButton from '../components/BackNextButton.vue';

  const frequency = ref(null);
  const daysOfWeek = [
    { label: 'Monday', value: 'monday' },
    { label: 'Tuesday', value: 'tuesday' },
    { label: 'Wednesday', value: 'wednesday' },
    { label: 'Thursday', value: 'thursday' },
    { label: 'Friday', value: 'friday' },
    { label: 'Saturday', value: 'saturday' },
    { label: 'Sunday', value: 'sunday' },
  ];
  const selectedDaysOfWeek = ref([]);
  const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const selectedDaysOfMonth = ref([]);
</script>

<template>
    <div class="habit-goal-form">
      <h2 class="title pt-5 mb-4 text-center font-weight-bold">What is your Future Goal regarding this Habit?</h2>
      
      <div class="mt-5 mb-3" >
        <input type="radio" id="every-day" value="everyday" v-model="frequency">
        <label class="d-flex align-items-center" for="every-day">Every day</label>
      </div>
      
      <div class="mb-3">
        <input type="radio" id="specific-days-week" value="specificDaysWeek" v-model="frequency">
        <label class="d-flex align-items-center" for="specific-days-week">Specific days of the week</label>
      </div>
      
      <div v-if="frequency === 'specificDaysWeek'" class="days-of-week">
        <div v-for="day in daysOfWeek" :key="day.value">
          <input type="checkbox" :id="day.value" :value="day.value" v-model="selectedDaysOfWeek">
          <label class="week-day-label d-flex align-items-center mb-3" :for="day.value">{{ day.label }}</label>
        </div>
      </div>
      
      <div>
        <input type="radio" id="specific-days-month" value="specificDaysMonth" v-model="frequency">
        <label class="d-flex align-items-center" for="specific-days-month">Specific days of the month</label>
      </div>
      
      <div v-if="frequency === 'specificDaysMonth'" class="days-of-month">
        <div v-for="day in daysOfMonth" :key="day" class="day-button">
          <input type="checkbox" :id="'day-' + day" :value="day" v-model="selectedDaysOfMonth">
          <label :for="'day-' + day">{{ day }}</label>
        </div>
      </div>
      
      <BackNextButton :filledCircle="3"/>
    </div>
  </template>
  
  
  <style scoped>
  .habit-goal-form {
    color: white;
    padding: 0px 40px 0px 40px;
    max-width: 400px;
  }
  
  h2 {
    text-align: center;
  }
  
  .days-of-week {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-left: 1em;
  }

  .days-of-month {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 10px;
  }
  
  .days-of-month .day-button {
    margin: 5px;
  }
  
  .day-button input {
    display: none;
  }
  
  .day-button label {
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
  }
  
  .day-button input:checked + label {
    background-color: #555;
    color: white;
  }
  
  .navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  button {
    background-color: #333;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #555;
  }

  .title {
      color: #fefff7;
      font-size: 18px;
  }

  .week-day-label {
    color: #C5C5C5;
    font-size: 10px;
  }

  /* Hide the default radio button */
  input[type="radio"] {
    display: none;
  }

  /* Create a custom radio button */
  input[type="radio"] + label:before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    border-radius: 50%;
    border: 2px solid #5B5B5B;
    background-color: #131213;
  }

  /* Style the custom radio button when it's checked */
  input[type="radio"]:checked + label:before {
    background-color: #5B5B5B;
  }

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"] + label:before {
    content: "";
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-right: 5px;
    border: 2px solid #5B5B5B;
    background-color: #131213;
    position: relative;
  }

  input[type="checkbox"]:checked + label:before {
    background-color: #5B5B5B;
  }
  
  input[type="checkbox"]:checked + label:after {
    content: "\2713";
    position: absolute;
    transform: translate(50%, 0%);
    color: white;
  }
  </style>
  