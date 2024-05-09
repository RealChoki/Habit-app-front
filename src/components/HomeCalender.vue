<script setup lang="ts">
import { ref } from "vue";

const days = ref([
    { day: "Mon", date: 1 },
    { day: "Tue", date: 2 },
    { day: "Wed", date: 3 },
    { day: "Thu", date: 4 },
    { day: "Fr", date: 5 },
    { day: "Sat", date: 6 },
    { day: "Sun", date: 7 }
])

</script>

<template>
    <div class="calender">
        <div class="day" v-for="day in days" :key="day.date">
            <p>{{ day.day }}</p>
            <div class="day2">
                <p>{{ day.date }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .calender {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 4px;
    }
    
    .day {
        width: 40px;
        height: 50px;
        border-radius: 15px;
        background-color: #1A1A1B;
        padding: 0;
    }

    .day p {
        font-size: 10px;
        margin-top: 0;
        text-align: center;
        padding-top: 5px;
        color: #C5C5C5;
    }

    .day2 {
        width: 40px;
        height: 28.85px;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
        background-color: #232323;
        margin: 0;
        padding: 0;
    }

    .day2 p {
        font-size: 13px;
        font-weight: bold;
    }
</style>
