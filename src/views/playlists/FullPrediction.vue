<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="prediction" class="prediction-details">
    <!-- prediction information -->
    <div class="prediction-info">
      <h2>{{ prediction.ppv }} predictions</h2>
      <h1 class="username">Picks by {{ prediction.userName }}</h1>
      <p class="description"></p>
    </div>
    <div class="song-list">
      <!-- <div v-if="!prediction.length">You have not picked your winners yet.</div> -->
      <div
        v-for="(match, matchName) in prediction.predictions"
        :key="matchName"
      >
        <div class="details">
          <h3 class="single-match">{{ matchName }}</h3>
          <p>My pick to win: {{ match }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useDocument from "@/composables/useDocument";
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import { useRouter } from "vue-router";
export default {
  props: ["id", "toUrl"], //singlePrediction.userName id: singlePred.id
  setup(props) {
    const { error, document: prediction } = getDocument(
      "predictions",
      props.id
    );
    console.log(prediction);
    const { user } = getUser();
    const { deleteDoc, updateDoc } = useDocument("predictions", props.id);

    const router = useRouter();

    return { error, prediction };
  },
};
</script>

<style>
.prediction-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
.single-match {
  margin-top: 0.4rem;
  padding: 0.2rem;
}
.prediction-info {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.prediction-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.prediction-info p {
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
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>