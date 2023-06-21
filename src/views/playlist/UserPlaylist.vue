<template>
  <div class="user-playlists">
    <div v-if="playlists">
        <Playlists :playlists="playlists" />
        <router-link :to="{name: 'CreatePlaylist'}" class="btn">Create a New Playlist</router-link>
    </div>
  </div>
</template>

<script>
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import Playlists from '@/components/Playlists.vue'
export default {
    components: { Playlists },
    setup () {
        const { user } = getUser()
        const { documents: playlists } = getCollection(
            'playlists',
            ['userId', '==', user.value.uid]
        )

        return { playlists }
    }

}
</script>

<style>

</style>