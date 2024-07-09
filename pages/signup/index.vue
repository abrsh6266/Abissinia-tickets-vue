<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import * as yup from 'yup'
import logo from '~/public/images/logo.png'

// Define your validation schema using Yup
const schema = yup.object({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
})

const authStore = useAuthStore()
const router = useRouter()

const { handleSubmit, errors } = useForm({
    validationSchema: schema
})

const { value: username, errorMessage: usernameError } = useField('username')
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

const onSubmit = handleSubmit(async (values: any) => {
    try {
        await authStore.register(values.username, values.email, values.password)
        router.push('/login')
    } catch (error: any) {
        alert(error.message)
    }
})
</script>

<template>
    <div class="min-h-screen flex justify-center">
        <div
            class="max-w-screen-xl m-0 sm:m-10 bg-gradient-to-t bg-opacity-40 shadow sm:rounded-lg flex justify-center flex-1 flex-col md:flex-row">
            <div class="md:w-1/2 md:h-1/2 lg:h-full p-6 sm:p-12 flex justify-center">
                <div class="text-center px-8 py-12">
                    <a class="mb-6" href="#">
                        <img :src="logo" alt="logo" style="width: auto; height: 100%;" />
                    </a>
                </div>
            </div>
            <div class="md:w-1/2 p-6 md:p-12">
                <form method="post" @submit="onSubmit"
                    class="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
                    <h4 class="text-center text-3xl font-bold">Register</h4>
                    <div>
                        <FormInput type="text" label="username" name="username" v-model="username" />
                        <span class="text-red-500">{{ usernameError }}</span>
                    </div>
                    <div>
                        <FormInput type="email" label="email" name="email" v-model="email" />
                        <span class="text-red-500">{{ emailError }}</span>
                    </div>
                    <div>
                        <FormInput type="password" label="password" name="password" v-model="password" />
                        <span class="text-red-500">{{ passwordError }}</span>
                    </div>
                    <div class="mt-4">
                        <SubmitBtn text="register" />
                    </div>
                    <p class="text-center">
                        Already a member?
                        <router-link to="/login" class="ml-2 link link-hover link-primary capitalize">
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
