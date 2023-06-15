import { projectAuth } from "@/firebase/config"
import { ref } from "vue"

const error = ref(null)
const isLoading = ref(false)

const login = async (email, password) => {
    isLoading.value = true
    error.value = null 
    try
    {
        const res = await projectAuth.signInWithEmailAndPassword(email, password)
        error.value = null 
        console.log(res);
        isLoading.value = false
        return res
    }
    catch (err)
    {
        console.log(err.message);
        error.value = 'Incorrect login credentials'
        isLoading.value = false
    }

}

const useLogin = () => {
    return { error, login, isLoading }
}

export default useLogin