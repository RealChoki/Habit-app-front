<template>
  <div class="form-group">
    <textarea
      class="rounded-0 border-0 border-bottom w-100 pb-2"
      id="description-input"
      placeholder="Description (optional)"
      rows="1"
      :value="modelValue"
      @input="onInput"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  target.style.height = 'auto'
  target.style.height = `${target.scrollHeight}px`
}
</script>

<style scoped>
#description-input {
  background: #131213;
  color: #ffffff;
  font-size: 12px;
}

#description-input::placeholder {
  color: #c5c5c5;
  font-size: 12px;
  margin-left: 0px;
}

label {
  font-size: 10px;
}

input:focus {
  outline: none;
  box-shadow: none;
  background-color: #131213;
  color: #c5c5c5;
}

textarea:focus {
  outline: none;
  box-shadow: none;
  background-color: #131213;
  color: #c5c5c5;
  border: none;
  /* border-color: #ffffff; */
}

textarea {
  border: none;
  background-color: transparent;
  resize: none;
  outline: none;
  overflow: hidden;
}
</style>
