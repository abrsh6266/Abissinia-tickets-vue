import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { LOGIN_USER, REGISTER_USER } from '~/graphql/mutations'


interface User {
  id: string;
  email: string;
  username?: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const router = useRouter()
  const { mutate: loginMutation } = useMutation(LOGIN_USER)
  const { mutate: registerMutation } = useMutation(REGISTER_USER)

  const setUser = (userData: User) => {
    user.value = userData
  }

  const setToken = (jwt: string) => {
    token.value = jwt
    Cookies.set('token', jwt)
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await loginMutation({ email, password })
      const data = response?.data.login
      setToken(data.token)
      setUser(data.user)
      router.push('/')
      alert('Logged in')
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        'Please double check your credentials'
      alert(errorMessage)
    }
  }

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await registerMutation({ username, email, password })
      const data = response?.data.register
      setUser(data.user)
      alert('Account created successfully')
      router.push('/login')
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        'Please double check your credentials'
      alert(errorMessage)
    }
  }

  return { user, token, login, register }
})
