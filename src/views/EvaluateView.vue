<script setup lang="ts">
    import EvaluateButton from '../components/EvaluateButton.vue';
    import BackNextButton from '../components/BackNextButton.vue';
</script>

<template>
    <h2 class="title">How do you want to evaluate your progress?</h2>
    <EvaluateButton/>
    <BackNextButton/>
</template>

<style scoped>
    .title {
        color: #FEFFF7;
        font-size: 18px;
        margin-top: 42px;
        margin-bottom: 90px;
        padding: 0;
        font-weight: bold;
        text-align: center;
    }
</style>
