import { ref } from "vue";
import getUser from "./getUser";
import { projectStorage } from "@/firebase/config";

const { user } = getUser() 


const useStorage = () => {
    const error = ref(null)
    const url = ref(null)
    const path = ref(null)

    const uploadImage = async (file) => {
        path.value = `covers/${user.value.uid}/${file.name}`
        const storageRef = projectStorage.ref(path.value)

        try {
           const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL()
        } catch (err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    return { error, url, path, uploadImage}
}

export default useStorage