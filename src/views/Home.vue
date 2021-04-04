<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="documents">
      <ListView :predictions="documents" />
    </div>
  </div>
</template>

<script>
import ListView from '../components/ListView.vue'
import getCollection from '../composables/getCollection'

export default {
  name: 'Home',
  components: { ListView },
  setup() {
    const { error, documents } = getCollection('predictions', 'g601rrraCBPkurhL0N02')
    console.log(documents)
    return { error, documents }
  }
}
</script>