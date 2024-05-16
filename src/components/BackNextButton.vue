<script setup lang="ts">
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'

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

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
    <div class="back-next" :class="{ 'no-next': !showNext }">
        <a class="back text-decoration-none fw-bold fs-6" @click.prevent="goBack">BACK</a>
        <div class="d-flex justify-content-center align-items-center gap-1">
            <div class="circle" :class="{ 'filled': filledCircle >= 1 }"></div>
            <div class="circle" :class="{ 'filled': filledCircle >= 2 }"></div>
            <div class="circle" :class="{ 'filled': filledCircle >= 3 }"></div>
            <div class="circle" :class="{ 'filled': filledCircle >= 4 }"></div>
        </div>
        <RouterLink v-if="showNext" class="next back text-decoration-none fw-bold fs-6" to="FrequencyView">NEXT</RouterLink>
    </div>
</template>

<style scoped>
    .back {
        color: #5B5B5B;
    }

    .next {
        color: #FEFFF7;
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
        border: 1px solid #5B5B5B; /* change to the color you want */
    }

    .circle.filled {
        background-color: #5B5B5B; /* change to the color you want */
    }

    .back-next.no-next {
        width: 72%;
        justify-content: center;
    }
</style>