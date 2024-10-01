<template>
  <div class="task-checkbox-element d-flex align-items-center justify-content-between p-2 py-3">
    <div class="d-flex align-items-center cursor-pointer" @click="openTaskModal(task)">
      <font-awesome-icon
        class="tasktype-icon rounded-square"
        :icon="taskIcon"
      />
      <p class="mb-0 ms-2 text-white">{{ task.title }}</p>
    </div>
    <input type="checkbox" :checked="isSelected" @change="onCheckboxChange" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faListCheck, faPlusMinus, faClock } from '@fortawesome/free-solid-svg-icons'
import type { Task } from '@/types/types'
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

const emits = defineEmits(['update:isSelected'])

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

const onCheckboxChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emits('update:isSelected', target.checked)
  props.toggleTaskSelection(props.task)
}
</script>

<style scoped>
.task-checkbox-element {
  border-bottom: 1px solid #232323;
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
</style>