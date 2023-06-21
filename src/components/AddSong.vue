<template>
    <div class="add-song">
        <button v-if="!showForm" @click="showForm = true">Add Song</button>
        <form v-if="showForm" @submit.prevent="handleSubmit">
            <h4>Add a New Song</h4>
            <input type="text" placeholder="Song Title" required v-model="title">
            <input type="text" placeholder="Artist" required v-model="artist">
            <button>Add</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import useDocument from '@/composables/useDocument'
export default {
    props: ['playlist'],
    setup (probs) {
        const { updateDoc } = useDocument('playlists', probs.playlist.id)

        const title = ref('')
        const artist = ref('')
        const showForm = ref(false)

        const handleSubmit = async () => {
            const newSong = {
                title: title.value,
                artist: artist.value,
                id: Math.floor(Math.random() * 100000)
            }
            await updateDoc({
                songs: [...probs.playlist.songs, newSong]
            })
            showForm.value = false
            title.value = ''
            artist.value = ''
            console.log(newSong);
            
        }

        return { title, artist, showForm, handleSubmit }
    }

}
</script>

<style scoped>
    .add-song {
        text-align: center;
        margin-top: 40px;
    }
    form {
        max-width: 100%;
        text-align: left;
    }
</style>