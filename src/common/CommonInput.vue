<template>
  <div class="form-group">
    <label class="text-white" :for="id">{{ label }}</label>
    <input :type="type" class="form-control" :id="id" v-model="inputValue" @input="onInput" required />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'

// Define props
const props = defineProps({
  id: String,
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  modelValue: String
})

// Define emits
const emits = defineEmits(['update:modelValue'])

// Define a ref for the input value
const inputValue = ref(props.modelValue)

// Emit the input value when it changes
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emits('update:modelValue', target.value)
}
</script>

<style scoped>
label {
  font-size: 12px;
}

.input-common input {
  background: #131213;
  border-radius: 5px;
  color: #ffffff;
}

.input-common:focus {
  outline: none;
  box-shadow: none;
  background-color: #131213;
  color: #ffffff;
}

.form-control:focus {
  box-shadow: none;
  border: 1px solid #ffffff;
  color: #ffffff;
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  border: 1px solid #ffffff;
  -webkit-text-fill-color: #ffffff;
  -webkit-box-shadow: 0 0 0px 1000px #131213 inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>