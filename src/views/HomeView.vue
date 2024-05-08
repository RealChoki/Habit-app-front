<script setup lang="ts">
import HomeCalender from '@/components/HomeCalender.vue';
</script>

<template>
<header>
  <img class="menu-icon" alt="Menu Icon" src="../components/icons/Menu.png">
  <p>May 1, 2024</p>
</header>

<HomeCalender />

</template>

<style scoped>
  .menu-icon {
  }

  header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 24px;
    gap: 7px;
  }

  header p{
    font-size: 15px;
    font-weight: bold;
    color: white;
    margin: 0;
    padding: 0;
  }

</style>