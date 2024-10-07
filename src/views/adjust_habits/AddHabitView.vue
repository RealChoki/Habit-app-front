<template>
  <h2 class="text-white font-weight-bold text-center pt-5 mb-3 pb-5 fs-5">
    How do you want to evaluate your <br />
    progress?
  </h2>
  <EvaluateButton />
  <BackNextButton :showNext="false" :filledCircle="1" />
</template>

<script setup lang="ts">
import EvaluateButton from '@/components/EvaluateButton.vue'
import BackNextButton from '@/common/BackNextButton.vue'
</script>

<style scoped>
</style>
