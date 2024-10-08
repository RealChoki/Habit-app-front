<template>
  <div class="task-checkbox-element d-flex align-items-center justify-content-between p-2">
    <div class="d-flex align-items-center">
      <font-awesome-icon class="tasktype-icon rounded-square" :icon="taskIcon" />
      <p class="mb-0 ms-2 text-white">{{ task.title }}</p>
    </div>
    <input
      type="checkbox"
      :id="'customCheckbox-' + task.id"
      class="custom-checkbox"
      v-model="isChecked"
      @change="onCheckboxChange"
    />
    <label :for="'customCheckbox-' + task.id" class="custom-checkbox-label"></label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faListCheck, faPlusMinus, faClock } from '@fortawesome/free-solid-svg-icons'
import type { Task } from '../types/types'
import type { PropType } from 'vue'

// Add the icons to the library
library.add(faListCheck, faPlusMinus, faClock)

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true
  },
  openTaskModal: {
    type: Function as PropType<(task: Task) => void>,
    required: true
  },
  toggleTaskSelection: {
    type: Function as PropType<(task: Task) => void>,
    required: true
  },
  isSelected: {
    type: Boolean,
    required: true
  }
})

const isChecked = ref(props.isSelected)

watch(
  () => props.isSelected,
  (newVal) => {
    isChecked.value = newVal
  }
)

const taskIcon = computed(() => {
  switch (props.task.type) {
    case 'yesno':
      return ['fas', 'list-check']
    case 'numeric':
      return ['fas', 'plus-minus']
    case 'timer':
      return ['fas', 'clock']
    default:
      return ['fas', 'question']
  }
})

const onCheckboxChange = () => {
  props.toggleTaskSelection(props.task)
  isChecked.value = !isChecked.value
}
</script>

<style scoped>
.task-checkbox-element {
  border-bottom: 1px solid #232323;
  height: 72.71px;
}
.cursor-pointer {
  cursor: pointer;
}
.text-white {
  color: white;
}
.rounded-square {
  border-radius: 5px;
  width: 12px;
  height: 12px;
  background-color: #232323;
  color: #5b5b5b;
  padding: 10px;
}
.custom-checkbox {
  display: none;
}

.custom-checkbox-label {
  width: 19px;
  height: 19px;
  cursor: pointer;
  display: inline-block;
  background-color: #131213;
  border: 2px solid #ccc;
  border-radius: 2px;
  position: relative;
  margin-right: 1px;
}

.custom-checkbox:checked + .custom-checkbox-label {
  background-color: #5b5b5b;
  border: 0px solid #5b5b5b;
}

.custom-checkbox:checked + .custom-checkbox-label::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 7px;
  width: 5px;
  height: 10px;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>