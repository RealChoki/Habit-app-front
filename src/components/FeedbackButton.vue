<template>
  <div>
    <div class="d-flex flex-column align-items-center m-0" v-for="option in options" :key="option.id">
      <div :class="['feedback-button', getButtonClass(option.name), { 'selected-button': selectedOption === option.id }]" @click="selectOption(option)">
        <h1 :class="['small-title', { 'selected-title': selectedOption === option.id }]">{{ option.name }}</h1>
      </div>
      <p class="desc">{{ option.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

interface EvaluateOption {
  id: number
  name: string
  description: string
}

const options = ref<EvaluateOption[]>([
  {
    id: 1,
    name: 'Easy',
    description: 'I found this habit manageable and feel I can do more',
  },
  {
    id: 2,
    name: 'Normal',
    description: 'This habit was about the right level of challenge for me',
  },
  {
    id: 3,
    name: 'Hard',
    description: 'I struggled with this habit and would prefer a lighter load',
  }
])

const selectedOption = ref<number | null>(null)
const emit = defineEmits(['optionSelected'])

function getButtonClass(name: string) {
  switch (name) {
    case 'Easy':
      return 'easy-button'
    case 'Normal':
      return 'normal-button'
    case 'Hard':
      return 'hard-button'
    default:
      return ''
  }
}

function selectOption(option: EvaluateOption) {
  selectedOption.value = option.id
  emit('optionSelected', selectedOption.value)
}
</script>

<style>
.feedback-button {
  width: 300px;
  height: 56px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.small-title {
  color: #b3b3b3 /* Darker shade of white */ !important;
  font-weight: 400;
  font-size: 24px;
  margin-bottom: 0px;
}

.selected-title {
  color: #ffffff/* Lighter shade of white */ !important;
}

.desc {
  font-size: 9px;
  color: #c5c5c5;
  margin-top: 8px;
  width: 230px;
  text-align: center;
  margin-bottom: 20px;
}

/* Styles for each button type */
.easy-button {
  background-color: #14532d; /* Darker green */
  box-shadow: 0px 6px 0px #0f3d22; /* Even darker green for shadow */
}

.normal-button {
  background-color: #8c4d0f; /* Darker orange */
  box-shadow: 0px 6px 0px #6a3a0b; /* Even darker orange for shadow */
}

.hard-button {
  background-color: #7a1c25; /* Darker red */
  box-shadow: 0px 6px 0px #5a141b; /* Even darker red for shadow */
}

/* Style for selected button */
.selected-button.easy-button {
  background-color: #28a745; /* Lighter green */
  box-shadow: 0px 6px 0px #1e7e34; /* Lighter green for shadow */
}

.selected-button.normal-button {
  background-color: #fd7e14; /* Lighter orange */
  box-shadow: 0px 6px 0px #d66e12; /* Lighter orange for shadow */
}

.selected-button.hard-button {
  background-color: #dc3545; /* Lighter red */
  box-shadow: 0px 6px 0px #b02a37; /* Lighter red for shadow */
}
</style>