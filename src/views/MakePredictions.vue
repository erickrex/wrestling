<template>
  <div>
    <div class="selector-container">
      <h1>Pick your winners</h1>
      <h2>{{ currentMatch.match }}</h2>
      <form class="contender">
        <div
          class="option"
          v-for="(optionsAvailable, index) in state.meta[`step.${state.value}`]
            .optionsAvailable"
          :key="optionsAvailable.wrestler"
        >
          <h2>{{ optionsAvailable.wrestler }}</h2>
          <input
            type="radio"
            :value="optionsAvailable.wrestler"
            v-model="picked"
            :name="state.meta[`step.${state.value}`].match"
            validation="required"
            class="contenderSelect"
          />

          <img
            :src="
              require(`@/assets/${currentMatch.optionsAvailable[index].wrestler}.png`)
            "
            class="contenderPic"
          />
        </div>

        <div class="submitQuestion">
          <input
            v-if="state.value !== 'one'"
            class="btn"
            type="button"
            value="Back"
            @click.prevent="goBack"
          />
          <input
            v-if="state.value !== 'twelve'"
            class="btn"
            type="button"
            value="Next"
            @click.prevent="goForward"
          />
          <input
            v-if="state.value == 'twelve'"
            class="btn"
            type="button"
            value="Submit"
            @click.prevent="persistFirebase"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import useCollection from "@/composables/useCollection";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";
import getUser from "@/composables/getUser";
import Card from "@/composables/wrestlemaniaCard";
import { useMachine } from "@xstate/vue";

export default {
  name: "MakePredictions",
  setup() {
    const { user } = getUser();
    const router = useRouter();
    const isPending = ref(false);
    const { error, addDoc } = useCollection("predictions");
    const picked = ref("");
    const { state, send } = useMachine(Card);
    const option = ref("");
    let userPrediction = {};
    const currentMatch = ref({});
    const picture = ref("");

    //extracting each single match for better manipulation
    watchEffect(() => {
      currentMatch.value = {
        match: state.value.meta[`step.${state.value.value}`].match,
        optionsAvailable:
          state.value.meta[`step.${state.value.value}`].optionsAvailable,
      };
      console.log(currentMatch.value.optionsAvailable[0].wrestler);
    });
    //hold state of picked winner when going back and forth
    watchEffect(() => {
      if (userPrediction[`${currentMatch.value.match}`])
        picked.value = userPrediction[`${currentMatch.value.match}`];
      console.log(userPrediction);
    });

    const goForward = () => {
      send("NEXT");
      if (picked.value !== "" && picked.value !== undefined) {
        userPrediction = {
          ...userPrediction,
          [`${currentMatch.value.match}`]: `${picked.value}`,
        };
      }
      picked.value = "";
    };

    const goBack = () => {
      send("PREVIOUS");
      if (picked.value !== "" && picked.value !== undefined) {
        userPrediction = {
          ...userPrediction,
          [`${currentMatch.value.match}`]: `${picked.value}`,
        };
      }
      picked.value = "";
    };

    const persistFirebase = async () => {
      isPending.value = true;
      const res = await addDoc({
        ppv: "Wrestlemania",
        predictions: { ...userPrediction },
        userId: user.value.uid,
        userName: user.value.displayName,
        createdAt: timestamp(),
      });
      isPending.value = false;
      if (!error.value) {
        router.push({ name: "Home" });
      }

      console.log(res.id + res.userName);
    };

    return {
      state,
      send,
      option,
      picked,
      goBack,
      goForward,
      userPrediction,
      currentMatch,
      persistFirebase,
      isPending,
    };
  },
};
</script>

<style scoped>
.contender {
  background-color: #151515;
  width: 60vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.contenderPic {
  max-height: 12rem;
}
h1 {
  margin: 0;
}
input[type="file"] {
  border: 0;
  padding: 0;
}
.selector-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100%;
}
label {
  font-size: 3rem;
}
.option {
  width: 60vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
  padding: 0.5rem;
}
.btn {
  margin: 20px;
  padding: 1rem 4rem;
}
</style>