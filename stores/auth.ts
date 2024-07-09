import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMutation, useQuery } from "@vue/apollo-composable";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { LOGIN_USER, REGISTER_USER } from "~/graphql/mutations";

interface User {
  id: string;
  email: string;
  username?: string;
  role?: string;
  avatar?: string;
  created_at?: string;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const router = useRouter();

  const { mutate: registerMutation } = useMutation(REGISTER_USER);

  const setUser = (userData: User) => {
    user.value = userData;
  };

  const setToken = (jwtToken: string) => {
    token.value = jwtToken;
    Cookies.set("token", jwtToken);
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await useQuery(LOGIN_USER, { email, password });
      const userData = response.result.value.users[0];
      if (userData) {
        const jwtToken = jwt.sign(
          { id: userData.id, email: userData.email },
          "your-secret-key"
        );
        setToken(jwtToken);
        setUser(userData);
        router.push("/");
        alert("Logged in");
      } else {
        alert("Invalid credentials");
      }
    } catch (error: any) {
      alert("An error occurred during login");
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await registerMutation({ username, email, password });
      if (response?.data.insert_users_one) {
        alert("Account created successfully");
        router.push("/login");
      } else {
        alert("Failed to create account");
      }
    } catch (error: any) {
      alert("An error occurred during registration");
    }
  };

  const logUserOut = () => {
    token.value = null;
    user.value = null;
    Cookies.remove("token");
  };

  return { user, token, login, register, logUserOut };
});
