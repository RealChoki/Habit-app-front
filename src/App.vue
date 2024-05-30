<script setup lang="ts"></script>

<template>
  <div class="container-fluid vh-100 p-0 m-0" style="background-color: #131213">
    <RouterView />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

.cursor-pointer {
  cursor: pointer;
}

.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
}

.btn-click:active {
  transform: scale(0.9);
}

.input-common input {
  height: 29px;
  background: #131213;
  border: 1px solid #ffffff;
  border-radius: 5px;
  color: #ffffff;
}

.input-common input:focus {
  outline: none;
  box-shadow: none;
  background-color: #131213;
  color: #ffffff;
  border-color: #ffffff;
}
</style>
