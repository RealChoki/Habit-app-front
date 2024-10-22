<template>
  <div class="login-page d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4" style="width: 400px">
      <h2 class="text-center text-white">Login</h2>
      <form @submit.prevent="onLogin">
        <div class="form-group input-common mb-3">
          <label for="username" class="text-white">Username</label>
          <input
            type="text"
            id="username"
            class="form-control"
            v-model="username"
            :class="{ 'is-invalid': loginError }"
            required
          />
        </div>

        <div class="form-group input-common mb-3">
          <label for="password" class="text-white">Password</label>
          <input
            type="password"
            id="password"
            class="form-control"
            v-model="password"
            :class="{ 'is-invalid': loginError }"
            required
          />
          <div v-if="loginError" class="invalid-feedback">
            {{ errorMessage }}
          </div>
        </div>

        <button type="submit" class="btn w-100" style="background-color: #42b883">Login</button>
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
import authService from '@/api/authService'

const router = useRouter()

const username = ref('')
const password = ref('')
const loginError = ref(false)
const errorMessage = ref('')

const onLogin = async () => {
  if (username.value && password.value) {
    try {
      const result = await authService.login(username.value, password.value)

      console.log('result', result)

      if (result.success) {
        console.log('Login successful:', result.user)
        router.push('/home')
      } else {
        loginError.value = true
        errorMessage.value = 'Invalid username or password'
      }
    } catch (error) {
      console.error('Error logging in:', error)
      loginError.value = true
      errorMessage.value = 'Invalid username or password'
    }
  } else {
    // Handle empty fields
    loginError.value = true
    errorMessage.value = 'Username and password are required'
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
.card {
  background-color: #232323;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

label {
  font-size: 12px;
}

.input-common input {
  background: #131213;
  border-radius: 5px;
  color: #ffffff;
}

.input-common:focus {
  outline: none;
  box-shadow: none;
  background-color: #131213;
  color: #ffffff;
}
</style>
