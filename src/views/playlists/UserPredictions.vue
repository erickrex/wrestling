<template>
  <div class="user-predictions">
    <h2>My predictions</h2>
    <div v-if="predictions">
      <ListView :predictions="predictions" />
    </div>
  </div>
</template>

<script>
import getUser from "@/composables/getUser";
import getCollection from "@/composables/getCollection";
import ListView from "@/components/ListView.vue";
export default {
  props: ["toUrl"],
  components: { ListView },
  setup() {
    const { user } = getUser();
    const { documents: predictions } = getCollection("predictions", [
      "userId",
      "==",
      user.value.uid,
    ]);
    console.log();
    return { predictions, user };
  },
};
</script>

<style scoped>
h2 {
  padding-bottom: 10px;
  margin-bottom: 30px;
  border-bottom: 1px solid var(--secondary);
}
.btn {
  margin-top: 20px;
}
</style>