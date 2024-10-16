<template>
  <div class="register-page d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4" style="width: 400px">
      <h2 class="text-center text-white">Register</h2>
      <form @submit.prevent="onRegister">
        <div class="form-group mb-3">
          <CommonInput class="input-common" :id="'name'" :label="'Name'" v-model="name" required />
        </div>

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
            :id="'email'"
            :label="'Email'"
            v-model="email"
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

        <div class="form-group mb-3">
          <CommonInput
            class="input-common"
            :id="'confirmPassword'"
            :label="'Confirm Password'"
            v-model="confirmPassword"
            :type="'password'"
            required
          />
        </div>

        <button type="submit" class="btn w-100" style="background-color: #42b883">Register</button>
      </form>

      <div class="mt-3 text-center text-white">
        <p>
          Already have an account?
          <a href="#" @click="goToLogin" style="color: #42b883">Login here</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CommonInput from '@/common/CommonInput.vue'

const name = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const router = useRouter()

const onRegister = () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }

  if (name.value && username.value && email.value && password.value) {
    console.log('Register data:', {
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value
    })
    // Add actual registration API call logic here
  } else {
    alert('Please fill out all fields')
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.card {
  background-color: #232323;
  border-radius: 8px;
  box-shadow: 0px 6px 0px #1a1a1b;
}
</style>