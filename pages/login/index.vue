<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import { useStore } from 'vuex'
import { customFetch } from '~/utils'
import logo from '~/public/images/logo.png'

const router = useRouter()
const store = useStore()

const formData = ref({
  email: '',
  password: '',
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  formData.value = { ...formData.value, [target.name]: target.value }
}

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  try {
    const response = await customFetch.post('/login', formData.value)
    const data = response.data
    Cookies.set('token', data.jwt)
    store.dispatch('loginUser', { user: data.user })
    router.push('/')
    alert('Logged in')
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.error?.message ||
      'please double check your credentials'

    alert(errorMessage)
  }
}
</script>

<template>
  <div class="h-screen grid place-items-center">
    <form
      @submit="handleSubmit"
      method="post"
      class="card w-96 gap-y-4 shadow-lg flex flex-col bg-base-100 p-4"
    >
      <img
        :src="logo"
        alt="logo"
        style="max-width: 100%; height: auto;"
      />
      <h4 class="text-center text-3xl font-bold">Login</h4>
      <FormInput
        type="email"
        label="email"
        name="email"
        @change="handleChange"
      />
      <FormInput
        type="password"
        label="password"
        name="password"
        @change="handleChange"
      />
      <div class="mt-4">
        <SubmitBtn text="login" />
      </div>
      <p class="text-center">
        Not a member yet?
        <router-link
          to="/signup"
          class="ml-2 link link-hover link-primary capitalize"
        >
          Register
        </router-link>
      </p>
    </form>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
