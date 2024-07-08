<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import logo from '~/public/images/logo.png'

const formData = ref({
  email: '',
  password: '',
})

const authStore = useAuthStore()

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  formData.value = { ...formData.value, [target.name]: target.value }
}

const handleSubmit = (event: Event) => {
  event.preventDefault()
  authStore.login(formData.value.email, formData.value.password)
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
