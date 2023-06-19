<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create New Playlist</h4>
        <input type="text" placeholder="Title" v-model="title">
        <textarea placeholder="Playlist description..." v-model="description"></textarea>
        <label>Upload an image for playlist cover</label>
        <input type="file" @change="handleChange">
        <div class="error">{{ fileError }}</div>
        <div class="error"></div>
        <button v-if="!isPandding">Create</button>
        <button v-else disabled>Saving...</button>
    </form>
</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timeStamp } from '@/firebase/config'
import { RouterLink, useRouter } from 'vue-router'
export default {
    setup () {
        const { path, url, uploadImage} = useStorage()
        const { error, addDoc } = useCollection("playlists")
        const { user } = getUser()

        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref('')
        const isPandding = ref(false)
        const router = useRouter()
        
        const types = ['image/png', 'image/jpeg', 'image/jpg']

        const handleSubmit = async () => {
            if (file.value){
                isPandding.value = true
                await uploadImage(file.value)
                const res = await addDoc({
                    title: title.value,
                    description: description.value,
                    userId: user.value.uid,
                    userName: user.value.displayName,
                    coverUrl: url.value,
                    filePath: path.value,
                    songs: [],
                    createdAt: timeStamp()
                })
                isPandding.value = false
                if(!error.value) {
                    router.push({name: 'PlaylistDetails', params: {id: res.id}})
                    title.value = ''
                    description.value = ''
                    file.value = null
                }

            }
        }

        const handleChange = (e) => {
            const selectdFile = e.target.files[0]
            console.log(selectdFile)

            if(selectdFile && types.includes(selectdFile.type)) {
                file.value = selectdFile
                fileError.value = null
            }
            else {
                file.value = null
                fileError.value = "Please Select A File (png, jpeg)"
            }
        }

        return { title, description, handleSubmit, handleChange, fileError, isPandding }
    }
}
</script>

<style>
    input[type='file'] {
        border: 0;
        padding: 0;
    }
    label {
        font-size: 12px;
        display: block;
        margin-top: 30px;
    }
    button {
        margin-top: 20px;
    }
</style>