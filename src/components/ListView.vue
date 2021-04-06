<template>
  <div v-for="singleprediction in predictions" :key="singleprediction.id">
    <router-link
      :to="{
        name: 'PlaylistDetails',
        params: { toUrl: singleprediction.userName, id: singleprediction.id },
      }"
    >
      <div class="single">
        <p>
          {{ singleprediction.ppv }} picks by
          <span>{{ singleprediction.userName }}</span>
        </p>
        <h2>{{ singleprediction.userName }}</h2>
        <h2>{{ singleprediction.predictions["WWE Championship Match"] }}</h2>
        <!-- <p>created by {{ singleprediction.userName }}</p> -->
        <div
          v-for="(matchWinner, matchName) in singleprediction.predictions[
            'WWE Championship Match'
          ]"
          :key="matchName"
        >
          <p>{{ matchWinner }} will win the {{ matchName }}</p>
        </div>
        <div
          v-for="(matchWinner, matchName) in singleprediction.predictions[
            'Universal Championship Triple Threat Match'
          ]"
          :key="matchName"
        >
          <p>{{ matchWinner }} will win the {{ matchName }}</p>
        </div>

        <div class="song-number"></div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: ["predictions"],
  setup(props) {
    const displayOrder = [
      "WWE Championship match",
      "Universal Championship Triple Threat Match",
      "Celebrity Match",
    ];
    const partialPredictions = computed(() => {
      props.predictions.map((element) => {
        let partial = [
          element.predictions["WWE Championship Match"],
          element.predictions["Universal Championship Triple Threat Match"],
          element.predictions["Smackdown Women's Championship Match"],
          element.predictions["Smackdown Women's Championship Match"],
        ];
        return partial;
      });
    });

    console.log(partialPredictions);
    return { partialPredictions, displayOrder };
  },
};
</script>

<style scoped>
.single {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background: white;
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
</style>