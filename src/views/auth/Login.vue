<template>
  <form @submit.prevent="handleSubmit">
    <h3>Log in</h3>
    <input type="email" v-model="email" placeholder="Email">
    <input type="password" placeholder="Password" v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isLoading">Login</button>
    <button v-if="isLoading" disabled>Loading</button>

  </form>
</template>

<script>
import useLogin from '@/composables/useLogin'
import { ref } from 'vue'
export default {
    setup () {
        const { error, login, isLoading} = useLogin()
        
        const email = ref('')
        const password = ref('')

        const handleSubmit = async () => {
            const res = await login(email.value, password.value)
            if (!error.value) {
                console.log('User login successfully!');
            }
        }

        return { email, password, handleSubmit, error, isLoading }
    }
}
</script>

<style>

</style>