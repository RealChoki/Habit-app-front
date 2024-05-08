<script setup lang="ts">

</script>

<template>
    <div class="day">
        <p>Mon</p>
        <div class="day2">
            <p>1</p>
        </div>
    </div>
</template>

<style scoped>
    .day {
        width: 40px;
        height: 50px;
        border-radius: 15px;
        background-color: #1A1A1B;
        margin-left: 1em;
        padding: 0;
        border: 1px solid white;
    }

    .day p {
        font-size: 10px;
        margin-top: 0;
        text-align: center;
        padding-top: 5px
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
        border: 1px solid white;
    }

    .day2 p {
        font-size: 13px;
        font-weight: bold;
    }
</style>
