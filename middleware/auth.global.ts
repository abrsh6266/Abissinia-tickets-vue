import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const { user, token } = storeToRefs(useAuthStore())
  const tokenCookie = useCookie('token')

  if (tokenCookie.value) {
    token.value = tokenCookie.value
    user.value = JSON.parse(localStorage.getItem('user') || 'null')
  }

  if (!token.value && to.name !== 'login' && to.name !== 'signup') {
    return navigateTo('/login')
  }

  if (token.value && (to.name === 'login' || to.name === 'signup')) {
    return navigateTo('/')
  }
})
