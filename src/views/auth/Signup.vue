<template>
  <div class="signup-container">
    <h1>
      Sign up and make your predictions for Wrestlemania! First leaderboard
      coming on Sunday!
    </h1>
    <form @submit.prevent="handleSubmit" class="signup">
      <h3>Sign up</h3>
      <input
        type="text"
        placeholder="Display name"
        v-model="displayName"
        class="textbox"
      />
      <input type="email" placeholder="Email" v-model="email" class="textbox" />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        class="textbox"
      />
      <div v-if="error" class="error">{{ error }}</div>
      <button v-if="!isPending">Sign up</button>
      <button v-if="isPending" disabled>Loading</button>
    </form>
    <img src="@/assets/signup.jpg" height="400" class="hero" />
  </div>
</template>

<script>
import useSignup from "@/composables/useSignup";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { error, signup, isPending } = useSignup();
    const router = useRouter();

    const email = ref("");
    const password = ref("");
    const displayName = ref("");
    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        router.push({ name: "UserPredictions" });
      }
    };
    return { email, password, displayName, handleSubmit, error, isPending };
  },
};
</script>

<style scoped>
.signup-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.hero {
  margin-top: 3rem;
  margin-bottom: 3rem;
}
.signup {
  background-color: black;
  color: black;
  width: 100%;
}
.textbox {
  color: black;
}
</style>