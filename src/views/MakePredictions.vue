<template>
  <div>
    <h1>Pick your winners</h1>
    <div class="selector-container">
      <h2>{{ state.meta[`step.${state.value}`].match }}</h2>
      <form className="selector">
        <div
          class="option"
          v-for="optionsAvailable in state.meta[`step.${state.value}`]
            .optionsAvailable"
          :key="optionsAvailable.wrestler"
        >
          <input
            type="radio"
            :value="optionsAvailable.wrestler"
            v-model="picked"
            :name="state.meta[`step.${state.value}`].match"
            validation="required"
          />
          {{ optionsAvailable.wrestler }}
        </div>

        <div class="submitQuestion">
          <input
            class="submissionButton"
            type="button"
            value="Back"
            @click.prevent="goBack"
          />
          <input
            v-if="!state.done"
            class="submissionButton"
            type="button"
            value="Next"
            @click.prevent="goForward"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watchEffect } from 'vue'
import useStorage from '@/composables/useStorage'
// import useCollection from '@/composables/useCollection'
// import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'

import Card from "@/composables/wrestlemaniaCard";
import { useMachine } from "@xstate/vue";

export default {
  name: 'MakePredictions',
  setup() {

    const picked = ref("");
    const { state, send } = useMachine(Card);
    const option = ref("");
    console.log(Card.states['two'])
    //const answersFromUser = Card.context.results;
    // {wwe:
    //       {winer: 'Roman', loser: 'Edge'}
    //     },
    //     {intercontinental: {winer: 'Big E', loser: 'Apollo'}
    //     }
    watchEffect(() => console.log(picked.value))
    let userPrediction = []
    console.log(userPrediction)
    let currentMatch;
    //const ref = ()
    watchEffect(() => {
      currentMatch = {match : state.value.meta[`step.${state.value.value}`].match, optionsAvailable: state.value.meta[`step.${state.value.value}`].optionsAvailable}
      
      currentMatch.optionsAvailable.forEach(element => {
        if (userPrediction.includes(element.wrestler))
        picked.value = element.wrestler
      })
    })
   //console.log(contenders)
 
    const goForward = () => {
      send("NEXT");
      userPrediction.push(
        
        picked.value
      )
      console.log(userPrediction)
      // console.log('PICKED' + picked.value)
      // console.log('METAMATCH' + state.value.meta[`step.${state.value.value}`].match);
      // console.log('AAMatch' + AAMatch)
    };

    
    // const res = await addDoc({
    //       match: match.value,
    //       description: description.value,
    //       userId: user.value.uid,
    //       userName: user.value.displayName,
    //       coverUrl: url.value,
    //       filePath: filePath.value,
    //       //all fire collections gotta have songs
    //       extraComments: [],
    //       createdAt: timestamp()
    //     })
    const goBack = () => {
      //prev button not holding state
      send("PREVIOUS");
    };

    // allowed file types
    
    return { state,
      send,
      option,
      picked,
      goBack,
      goForward,
      userPrediction}
  }
}
</script>

<style>
form {
  background: black;
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