import { projectAuth } from "@/firebase/config"
import { ref } from "vue"

const error = ref(null)
const isLoading = ref(false)

const signup = async (email, password, displayName) => {
    error.value = null
    isLoading.value = true
    try 
    {
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)
        if (!res) 
        {
            throw new Error('Could not complete the signup')
        }
        await res.user.updateProfile({displayName})
        error.value = null
        isLoading.value = false
        return res
    }
    catch(err) 
    {
        error.value = err.message
        console.log(error.value);
        isLoading.value = false
    }
}

const useSignup = () => {

    return { error, signup , isLoading }
}

export default useSignup