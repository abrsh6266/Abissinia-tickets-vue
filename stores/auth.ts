import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import { customFetch } from '~/utils'

interface User {
  id: string;
  email: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const router = useRouter()

  const setUser = (userData: User) => {
    user.value = userData
  }

  const setToken = (jwt: string) => {
    token.value = jwt
    Cookies.set('token', jwt)
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await customFetch.post('/login', { email, password })
      const data = response.data
      setToken(data.jwt)
      setUser(data.user)
      router.push('/')
      alert('Logged in')
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        'please double check your credentials'
      alert(errorMessage)
    }
  }

  return { user, token, login }
})
