import { projectAuth } from "@/firebase/config"
import { ref } from "vue"

const error = ref(null)
const isLoading = ref(false)

const logout = async () => {
    error.value = null
    isLoading.value = true
    try 
    {
        await projectAuth.signOut()
        isLoading.value = false
    }
    catch(err)
    {
        error.value = err.message
        isLoading.value = false
    }
}

const useLogout = () => {
    return { logout, error, isLoading }
}

export default useLogout 