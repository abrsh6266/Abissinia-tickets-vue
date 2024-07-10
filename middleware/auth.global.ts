import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const { user, token } = storeToRefs(useAuthStore());
  console.log("user: ", user.value);
  const tokenCookie = useCookie("token");

  if (tokenCookie.value) {
    token.value = tokenCookie.value;
    user.value = JSON.parse(localStorage.getItem("user") || "null");
  }
});
