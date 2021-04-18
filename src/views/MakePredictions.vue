<template>
  <div v-if="!existingpredictions">
    <div class="selector-container">
      <h1>Pick your winners</h1>
      <h2>{{ currentMatch.match }}</h2>
      <form class="contender">
        <div
          class="selection-wrapper"
          v-for="(optionsAvailable, index) in state.meta[`step.${state.value}`]
            .optionsAvailable"
          :key="optionsAvailable.wrestler"
        >
          <label class="selected-label">
            <h2>{{ optionsAvailable.wrestler }}</h2>
            <input
              type="radio"
              :value="optionsAvailable.wrestler"
              v-model="picked"
              :name="currentMatch.match"
              validation="required"
              class="contenderSelect"
            />
            <span class="icon"></span>
            <div class="selected-content">
              <img
                :src="
                  require(`@/assets/${currentMatch.optionsAvailable[index].wrestler}.png`)
                "
                class="contenderPic"
              />
            </div>
          </label>
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
    <div v-for="docu in documents" :key="docu.id">
      <p>{{ docu.ppv }}</p>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect, computed, onMounted, toRefs } from "vue";
import useCollection from "@/composables/useCollection";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";
import getUser from "@/composables/getUser";
import Card from "@/composables/wrestlemaniaCard";
import { useMachine } from "@xstate/vue";
import getCollection from "../composables/getCollection";

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

    //FIX after wrestlemania
    // if (documents.value !== null && documents.value !== undefined) {
    //   alreadyHavePrediction.value = true;
    // } else {
    //   alreadyHavePrediction.value = false;
    // }
    //const { value } = documents;
    // console.log(alreadyHavePrediction.value);
    //extracting each single match for better manipulation
    watchEffect(() => {
      currentMatch.value = {
        match: state.value.meta[`step.${state.value.value}`].match,
        optionsAvailable:
          state.value.meta[`step.${state.value.value}`].optionsAvailable,
      };
    });
    //hold state of picked winner when going back and forth
    const { documents } = getCollection("predictions", [
      "userId",
      "==",
      user.value.uid,
    ]);

    //documents.value.json().then((converted) => console.log(converted));

    //documents.then((data) => console.log(data.json()));
    const existingPredictions = computed(() => {
      if (documents) {
        console.log("JA");
        return true;
      } else {
        console.log("NEIN");
        return false;
      }
    });
    console.log(existingPredictions.value);
    onMounted(() => {
      console.log(documents.value.value);
    });

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
      documents,
      existingPredictions,
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

h1 {
  margin: 0;
}

.selector-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100%;
}
label {
  font-size: 1.2rem;
}
.option {
  width: 100%;
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
.selected-content {
  text-align: center;
  border-radius: 3px;
  box-shadow: 0 2px 3px 0 rgba(219, 157, 21, 0.884);
  border: solid 4px transparent;
  transition: 0.3s ease-in-out all;
}

.selected-content img {
  height: 15rem;
  margin: 0 auto;
}

.selected-label {
  position: relative;
}
.selected-label input {
  display: none;
}
.selected-label input:checked {
  background: #5b5d61;
  border: solid 2px var(--pornyellow);
  transform: scale(1.2);
}
.selected-label input:checked {
  color: var(--pornyellow);
  opacity: 1;
  transform: scale(0.5);
}
.selected-label input:checked ~ .selected-content {
  box-shadow: 10px 10px 10px 0 rgba(233, 179, 33, 0.5);
  border: solid 4px var(--pornyellow);
}
</style>