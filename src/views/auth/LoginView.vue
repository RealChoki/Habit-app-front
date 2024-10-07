<template>
  <div class="login-page d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4" style="width: 400px">
      <h2 class="text-center text-white">Login</h2>
      <form @submit.prevent="onLogin">
        <div class="form-group mb-3">
          <CommonInput
            class="input-common"
            :id="'username'"
            :label="'Username'"
            v-model="username"
            required
          />
        </div>

        <div class="form-group mb-3">
          <CommonInput 
            class="input-common" 
            :id="'password'" 
            :label="'Password'" 
            v-model="password" 
            :type="'password'"
            required
          />
        </div>

        <button type="submit" class="btn w-100" style="background-color: #42b883;" @click="goToHome()">Login</button>
      </form>

      <div class="mt-3 text-center text-white">
        <p>
          Don't have an account?
          <a href="#" @click="goToRegister" style="color: #42b883">Register here</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CommonInput from '@/common/CommonInput.vue'

const email = ref('')
const password = ref('')
const router = useRouter()

const onLogin = () => {
  if (email.value && password.value) {
    console.log('Login data:', { email: email.value, password: password.value })
    // Add actual login API call logic here
  } else {
    alert('Please fill out all fields')
  }
}

const goToRegister = () => {
  router.push('/register')
}

const goToHome = () => {
  router.push('/home')
}
</script>

<style scoped>
.card {
  background-color: #232323;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
