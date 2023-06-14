import { projectAuth } from "@/firebase/config"
import { ref } from "vue"

const error = ref(null)

const singup = async (email, password, displayName) => {
    error.value = null

    try 
    {
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)
        if (!res) 
        {
            throw new Error('Could not complete the signup')
        }
        await res.user.updateProfile({displayName})
        error.value = null

        return res
    }
    catch(err) 
    {
        error.value = err.message
        console.log(error.value);
    }
}

const useSignup = () => {

    return { error, singup }
}

export default useSignup