<template>
  <div>
    <h1>Pick your winners</h1>
    <div class="selector-container">
      <h2>{{ currentMatch.match }}</h2>
      <form class="contender">
        <div
          class="option"
          v-for="(optionsAvailable, index) in state.meta[`step.${state.value}`]
            .optionsAvailable"
          :key="optionsAvailable.wrestler"
        >
          <input
            type="radio"
            :value="optionsAvailable.wrestler"
            v-model="picked"
            :name="state.meta[`step.${state.value}`].match"
            validation="required"
            class="contenderSelect"
          />
          {{ optionsAvailable.wrestler }}
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
            class="submissionButton"
            type="button"
            value="Back"
            @click.prevent="goBack"
          />
          <input
            v-if="state.value !== 'twelve'"
            class="submissionButton"
            type="button"
            value="Next"
            @click.prevent="goForward"
          />
          <input
            v-if="state.value == 'twelve'"
            class="submissionButton"
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

<style>
form {
  background: black;
}
.contenderPic {
  height: 10rem;
}
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>