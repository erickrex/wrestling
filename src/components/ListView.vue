<template>
  <div v-for="singleprediction in predictions" :key="singleprediction.id">
    <router-link
      :to="{
        name: 'FullPrediction',
        params: { toUrl: singleprediction.userName, id: singleprediction.id },
      }"
    >
      <div class="single">
        <h3 class="prediction-title">
          {{ singleprediction.ppv }} picks by
          <span>{{ singleprediction.userName }}</span>
        </h3>
        <p>
          <span>{{
            singleprediction.predictions["WWE Championship Match"]
          }}</span>
          will win the WWE Championship Match
        </p>
        <p>
          <span>{{
            singleprediction.predictions[
              "Universal Championship Triple Threat Match"
            ]
          }}</span>
          will win the Universal Championship Match
        </p>
        <p>
          <span>{{
            singleprediction.predictions["Smackdown Women's Championship Match"]
          }}</span>
          will win the "Smackdown Women's Championship Match"
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: ["predictions"],
  setup(props) {},
};
</script>

<style scoped>
.single {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background: black;
  margin: 16px 0;
  transition: all ease 0.2s;
}
.single:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
}
.thumbnail {
  max-width: 100px;
  max-height: 100px;
  overflow: hidden;
  border-radius: 10px;
}
img {
  max-width: 150%;
  max-height: 150%;
  display: block;
}
span {
  font-weight: bold;
}
.song-number {
  margin-left: auto;
}
.prediction-title {
  margin-bottom: 0.7rem;
}
</style>