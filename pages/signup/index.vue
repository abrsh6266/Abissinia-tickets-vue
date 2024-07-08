<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import logo from '~/public/images/logo.png'

const formData = ref({
  username: '',
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
  authStore.register(formData.value.username, formData.value.email, formData.value.password)
}
</script>

<template>
  <div class="min-h-screen flex justify-center">
    <div class="max-w-screen-xl m-0 sm:m-10 bg-gradient-to-t bg-opacity-40 shadow sm:rounded-lg flex justify-center flex-1 flex-col md:flex-row">
      <div class="md:w-1/2 md:h-1/2 lg:h-full p-6 sm:p-12 flex justify-center">
        <div class="text-center px-8 py-12">
          <a class="mb-6" href="#">
            <img
              :src="logo"
              alt="logo"
              style="width: auto; height: 100%;"
            />
          </a>
        </div>
      </div>
      <div class="md:w-1/2 p-6 md:p-12">
        <form
          method="post"
          @submit="handleSubmit"
          class="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
        >
          <h4 class="text-center text-3xl font-bold">Register</h4>
          <FormInput
            type="text"
            label="username"
            name="username"
            @change="handleChange"
          />
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
            <SubmitBtn text="register" />
          </div>
          <p class="text-center">
            Already a member?
            <router-link
              class="ml-2 link link-hover link-primary capitalize"
              to="/login"
            >
              login
            </router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
