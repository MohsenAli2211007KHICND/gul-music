<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch data</div>
    <div class="" v-if="documents">
      <!-- <div v-for="doc in documents" :key="doc.userId">
        <h3>{{ doc.title }}</h3>
      </div> -->
      <Playlists :playlists="documents" />

    </div>

</div>
</template>

<script>
import getCollection from '@/composables/getCollection'
import Playlists from '../components/Playlists.vue'

export default {
  name: 'HomeView',
  components: { Playlists },
  setup () {
    const { error, documents } = getCollection("playlists")

    return { error, documents }
  }
  
}
</script>
