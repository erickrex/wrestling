<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Comments and interference</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Which match are you most looking forward too?</h4>
      <input type="text" placeholder="Match" required v-model="matchComments">
      <h4>Do you predict any surprise appearances, returns?</h4>
      <input type="text" placeholder="Who will return?" required v-model="surprise">
      <h4>Do you predict any sheananigans in the main event?</h4>
      <input type="text" placeholder="Interference by Jay Uso?" v-model="interference">
      <button>Add</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useDocument from '../composables/useDocument'

export default {
  props: ['playlist'],
  setup(props) {
    const matchComments = ref('')
    const surprise = ref('')
    const interference = ref('')
    const showForm = ref(false)
    const { updateDoc } = useDocument('playlists', props.playlist.id)
    const handleSubmit = async () => {
      const newComment = {
        matchComments: matchComments.value,
        surprise: surprise.value,
        interference: interference.value,
        id: Math.floor(Math.random() * 1000000)
      }
      const res = await updateDoc({
        extraComments: [...props.playlist.extraComments, newComment]
      })
      matchComments.value = ''
      surprise.value = ''
      interference.value= ''
    }
    return { matchComments, surprise, showForm, handleSubmit, interference }
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