<template>
  <div class="user-playlists">
    <h2>My predictions</h2>
    <div v-if="predictions">
      <h2>KO</h2>
      <ListView :predictions="predictions" />
    </div>
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn">Create a New Playlist</router-link>
  </div>
</template>

<script>
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import ListView from '@/components/ListView.vue'
export default {
  components: { ListView },
  setup() {
    const { user } = getUser()
    const { documents: predictions } = getCollection(
      'predictions', ['userId', '==', user.value.uid])
    console.log(user.value.uuid)
  // const { error, documents : predictions } = getCollection('predictions')
    
    return { predictions, user }
  }
}
</script>

<style scoped>
  h2 {
    padding-bottom: 10px;
    margin-bottom: 30px;
    border-bottom: 1px solid var(--secondary)
  }
  .btn {
    margin-top: 20px;
  }
</style>