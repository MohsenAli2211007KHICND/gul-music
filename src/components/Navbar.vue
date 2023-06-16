<template>
  <div class="navbar">
    <nav>
      <img src="../assets/gul.png" />
      <h1><router-link :to="{ name: 'home' }">Gul Music</router-link></h1>
      <div class="links">
        <div v-if="user">
          <button @click="handleLogout">Logout</button>
        </div>
        <div v-else>
          <router-link :to="{ name: 'Login' }" class="btn">Login</router-link>
          <router-link :to="{ name: 'Signup' }" class="btn">SignUp</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "@/composables/useLogout";
import { useRouter } from "vue-router";
import getUser from "@/composables/getUser";
export default {
  setup() {
    const { error, logout, isLoading } = useLogout();
    const { user } = getUser();
    const router = useRouter();

    const handleLogout = async () => {
      await logout();
      router.push({ name: "Login" });
      if (!error.value) {
        console.log("User Logout successfully!");
      }
    };

    return { error, logout, isLoading, handleLogout, user };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}
nav img {
  height: 50px;
}
</style>