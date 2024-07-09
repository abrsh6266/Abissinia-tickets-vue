<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import * as yup from 'yup'
import logo from '~/public/images/logo.png'

// Define your validation schema using Yup
const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
})

const authStore = useAuthStore()
const router = useRouter()

const { handleSubmit, errors } = useForm({
  validationSchema: schema
})

const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

const onSubmit = handleSubmit(async (values) => {
  await authStore.login(values.email, values.password)
})
</script>

<template>
  <div class="h-screen grid place-items-center">
    <form @submit="onSubmit" method="post" class="card w-96 gap-y-4 shadow-lg flex flex-col bg-base-100 p-4">
      <img :src="logo" alt="logo" style="max-width: 100%; height: auto;" />
      <h4 class="text-center text-3xl font-bold">Login</h4>
      <div>
        <FormInput type="email" label="email" name="email" v-model="email" />
        <span class="text-red-500">{{ emailError }}</span>
      </div>
      <div>
        <FormInput type="password" label="password" name="password" v-model="password" />
        <span class="text-red-500">{{ passwordError }}</span>
      </div>
      <div class="mt-4">
        <SubmitBtn text="login" />
      </div>
      <p class="text-center">
        Not a member yet?
        <router-link to="/signup" class="ml-2 link link-hover link-primary capitalize">Register</router-link>
      </p>
    </form>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
