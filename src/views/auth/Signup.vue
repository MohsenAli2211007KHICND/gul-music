<template>
   <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" v-model="displayName" placeholder="Display Name">
    <input type="email" v-model="email" placeholder="Email">
    <input type="password" placeholder="Password" v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isLoading">SignUp</button>
    <button v-if="isLoading" disabled>Loading</button>
  </form>
</template>

<script>
import useSignup from '@/composables/useSignup'
import { ref } from 'vue'
export default {
    setup () {
        const {error, signup, isLoading} = useSignup()

        const email = ref('')
        const password = ref('')
        const displayName = ref('')

        const handleSubmit = async () => {
            const res = await signup(email.value, password.value, displayName.value)
            if( !error.value) {
                console.log("User signup Successfully!");
            }
        }
        

        return { email, password, displayName, error, isLoading, handleSubmit}
    }

}
</script>

<style>

</style>