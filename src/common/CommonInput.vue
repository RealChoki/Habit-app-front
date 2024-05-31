<template>
  <div class="form-group">
    <label class="text-white" :for="id">{{ label }}</label>
    <input type="text" class="form-control" :id="id" required />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

// Define props
const props = defineProps({
  id: String,
  label: String
})
</script>


<style scoped>
label {
  font-size: 10px;
}
</style>
