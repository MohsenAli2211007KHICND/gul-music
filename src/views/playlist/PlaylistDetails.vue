<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" >
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownerShip" @click="handleDelete">Delete Playlist</button>
    </div>

    <div class="songlists">
      <div v-if="!playlist.songs.length">No songs have been added to this playlist yet.</div>
      <div class="single-song" v-for="song in playlist.songs" :key="song.id">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button v-if="ownerShip" @click="deleteSong(song.id)">delete</button>
      </div>
      <AddSong v-if="ownerShip" :playlist="playlist" />
    </div>
  </div>
</template>

<script>
import AddSong from '@/components/AddSong.vue';
import getDocument from '@/composables/getDocument';
import getUser from '@/composables/getUser';
import useDocument from '@/composables/useDocument'
import { computed } from 'vue';
import useStorage from '@/composables/useStorage';
import { useRouter } from 'vue-router';
export default {
    props: ['id'],
    components: { AddSong },
    setup (probs) {
      const { error, document: playlist} = getDocument('playlists', probs.id)
      const { user } = getUser()
      const { deleteDoc, updateDoc } = useDocument('playlists', probs.id)
      const { deleteImage } = useStorage()
      const router = useRouter()

      const ownerShip = computed(() => {
        return user.value && playlist.value && playlist.value.userId === user.value.uid
      })

      const handleDelete = async () => {
        await deleteImage(playlist.value.path)
        await deleteDoc()
        router.push({name: 'home'})
      }

      const deleteSong = async (id) => {
        const newList = playlist.value.songs.filter(song => song.id != id )
        await updateDoc({songs: newList})
        console.log(newList);
      }

      return { error, playlist, ownerShip, handleDelete, deleteSong }
    }

}
</script>

<style>

.playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }
  .cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
  }
  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
  }
  .playlist-info {
    text-align: center;
  }
  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .playlist-info p {
    margin-bottom: 20px;
  }
  .username {
    color: #999;
  }
  .description {
    text-align: left;
  }
  .single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed rgb(115, 103, 103);
    margin-bottom: 20px;
  }

</style>