<template>
  <div class="back-next" :class="{ 'no-next': !showNext }">
    <a class="back text-decoration-none fw-bold fs-6" @click.prevent="goBack">BACK</a>
    <div class="d-flex justify-content-center align-items-center gap-1">
      <div class="circle" :class="{ filled: filledCircle >= 1 }"></div>
      <div class="circle" :class="{ filled: filledCircle >= 2 }"></div>
      <div class="circle" :class="{ filled: filledCircle >= 3 }"></div>
      <div class="circle" :class="{ filled: filledCircle >= 4 }"></div>
    </div>
    <RouterLink
      v-if="showNext"
      class="next back text-decoration-none fw-bold fs-6"
      :to="nextRoute"
      :class="{ 'move-left': nextButtonText === 'CREATE' }"
    >
      {{ nextButtonText }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useRouter, type Router } from 'vue-router'
import { defineProps, type ComputedRef, computed } from 'vue'

defineProps({
  showNext: {
    type: Boolean,
    default: true
  },
  filledCircle: {
    type: Number,
    default: 0
  }
})

const router: Router = useRouter()

const nextRoute: ComputedRef<string> = computed(() => {
  const currentRouteName = router.currentRoute.value.name
  console.log('Current Route Name:', currentRouteName) // Debugging line

  switch (currentRouteName) {
    case 'YesNoView':
      return '/addhabit/yesno/frequency'
    case 'TimerView':
      return '/addhabit/timer/frequency'
    case 'NumericValueView':
      return '/addhabit/numericvalue/frequency'
    case 'YesNoFrequencyView':
      return '/addhabit/yesno/frequency/timeframe'
    case 'NumericValueFrequencyView':
      return '/addhabit/numericvalue/frequency/timeframe'
    case 'TimerFrequencyView':
      return '/addhabit/timer/frequency/timeframe'
    case 'YesNoTimeFrameView':
      return '/home/:date'
    case 'NumericValueTimeFrameView':
      return '/home/:date'
    case 'TimerTimeFrameView':
      return '/home/:date'
    default:
      return ''
  }
})

const nextButtonText: ComputedRef<string> = computed(() => {
  const currentRouteName = router.currentRoute.value.name
  return typeof currentRouteName === 'string' && currentRouteName.includes('TimeFrameView') ? 'CREATE' : 'NEXT'
})

const goBack = (): void => {
  router.back()
}
</script>

<style scoped>
.back {
  color: #5b5b5b;
  cursor: pointer;
}

.next {
  color: #fefff7;
  cursor: pointer;
}

.back-next {
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  display: flex;
  gap: 67px;
  justify-content: center;
}

.circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #131213;
  border: 1px solid #5b5b5b; /* change to the color you want */
}

.circle.filled {
  background-color: #5b5b5b; /* change to the color you want */
}

.back-next.no-next {
  justify-content: end;
  width: 50vw;
  margin-left: 1.4em;
}

.move-left {
  margin-left: -15px; /* Adjust this value as needed */
}
</style>