<script setup lang="ts">
import { ref } from "vue";

const options = ref([
    { id: 1, name: "With a Yes or No", description: "If you just want to record wether you succeed with a activity or not" },
    { id: 2, name: "With a numeric value", description: "If you want to establish a value as a daily goal or limit for the habit" },
    { id: 3, name: "With a timer", description: "If you want to establish a time value as a daily goal or limit for the habit" },
]);
</script>

<template>
    <div class="contain" v-for="option in options" :key="option.id">
        <div class="Evaluate-button">
            <h1 class="small-title">{{ option.name }}</h1>
        </div>
        <p>{{ option.description }}</p>
    </div>
</template>

<style>
    .Evaluate-button {
        width: 300px;
        height: 56px;
        background-color: #232323;
        border-radius: 6px;
        box-shadow: 0px 6px 0px #1A1A1B;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .small-title{
        color: #FEFFF7;
        font-weight: 400;
        font-size: 24px;
    }
    
    .contain p{
        font-size: 9px;
        color: #C5C5C5;
        margin-top: 8px;
        width: 230px;
        text-align: center;
        margin-bottom: 20px;
    }

    .contain {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin:0;
    }
</style>
