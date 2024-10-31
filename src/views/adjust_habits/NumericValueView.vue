<template>
  <div class="d-flex justify-content-center align-items-center flex-column">
    <h2 class="title pt-5 mb-4 text-center font-weight-bold">Define your habit</h2>
    <div class="d-flex justify-content-center flex-column">
      <CommonInput class="habit input-common" :id="'habit-input'" :label="'Habit'" v-model="habit" />
      <!-- Goal input field -->
      <label for="goal" class="goal-title">Goal</label>
      <div class="cool-container">
        <button class="decrement" @click="decrement"> - </button>
        <input type="number" v-model="goal" max="99">
        <button class="increment" @click="increment"> + </button>
      </div>
      <p class="text-center mt-2">eg., Drink 5 glasses of water per day.</p>
      <DescriptionField />
      <BackNextButton :filledCircle="2" :isNextDisabled="isNextDisabled" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import CommonInput from '@/common/CommonInput.vue'
import DescriptionField from '@/common/CommonDescription.vue'
import BackNextButton from '@/common/BackNextButton.vue'

// Track the state of the inputs
const habit = ref('')
const goal = ref(0)

// Computed property to check if the next button should be disabled
const isNextDisabled = computed(() => !habit.value || goal.value <= 0)

// Methods to increment and decrement the goal value
const increment = () => {
  if (goal.value < 99) {
    goal.value += 1
  }
}

const decrement = () => {
  if (goal.value > 0) {
    goal.value -= 1
  }
}

// Watcher to enforce the max limit
watch(goal, (newValue) => {
  if (newValue > 99) {
    goal.value = 99
  }
})
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

.goal-title {
  font-size: 12px;
  color: #ffffff;
  margin-bottom: 2px;
  margin-top: 7px;
}

.cool-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #131213;
  border-radius: 5px;
  width: 135px;
  border: 1px solid #ffffff;
  height: 38px;
}

input[type="number"] {
  -moz-appearance: textfield;
  text-align: center;
  font-size: 17px;
  border: none;
  background-color: #131213;
  color: #ffffff;
  width: 28px;
  padding: 5px;
}

input[type="number"]:focus {
  outline: none; /* Remove default focus outline */
  background-color: #131213; /* Ensure background color stays the same */
  color: #ffffff; /* Ensure text color stays the same */
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

button {
  color: #5b5b5b;
  background-color: #131213;
  border: none;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  padding: 3px 20.8px;
}

button:hover {
  background-color: #5b5b5b;
  color: #ffffff;
}

.decrement {
  border-radius: 5px 0 0 5px;
}

.increment {
  border-radius: 0 5px 5px 0;
}
</style>