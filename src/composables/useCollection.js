import { projectFirestore } from "@/firebase/config"
import { ref } from "vue"

const useCollection = (collection) => {
    const error = ref(null)
    const isLoading = ref(false)

    const addDoc = async (doc) => {
        error.value = null
        isLoading.value = true
        try 
        {
            const res = await projectFirestore.collection(collection).add(doc)
            isLoading.value = false
            return res
        }
        catch(err)
        {
            console.log(err.message);
            error.value = 'Could not send message'
            isLoading.value = false
        }
    }
    return { error, addDoc, isLoading}
}

export default useCollection