<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create New Playlist</h4>
        <input type="text" placeholder="Title" v-model="title">
        <textarea placeholder="Playlist description..." v-model="description"></textarea>
        <label>Upload an image for playlist cover</label>
        <input type="file" @change="handleChange">
        <div class="error">{{ fileError }}</div>
        <div class="error"></div>
        <button>Submit</button>
    </form>
</template>

<script>
import { ref } from 'vue'
export default {
    setup () {
        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref('')
        
        const types = ['image/png', 'image/jpeg', 'image/jpg']

        const handleSubmit = () => {
            if (file.value){
                console.log(title.value, description.value);
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

        return { title, description, handleSubmit, handleChange, fileError }
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