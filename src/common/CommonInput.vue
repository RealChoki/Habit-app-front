<template>
  <div class="form-group">
    <label class="text-white" :for="id">{{ label }}</label>
    <input :type="type" class="form-control" :id="id" required />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

// Define props
const props = defineProps({
  id: String,
  label: String,
  type: {
    type: String,
    default: 'text'
  }
})
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

.input-common input:focus {
  outline: none;
  box-shadow: none;
  background-color: #131213;
  color: #ffffff;
}
</style>
