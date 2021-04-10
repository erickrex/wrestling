<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <img src="@/assets/wrestlingpredictions.jpg" class="hero" />
    <div v-if="documents">
      <ListView :predictions="documents" />
    </div>
  </div>
</template>

<script>
import ListView from "../components/ListView.vue";
import getCollection from "../composables/getCollection";
import getUser from "@/composables/getUser";

export default {
  name: "Home",
  components: { ListView },
  setup() {
    const { error, documents } = getCollection("predictions");

    return { error, documents };
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.hero {
  width: 100%;
}
</style>