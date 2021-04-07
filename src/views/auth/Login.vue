<template>
  <form @submit.prevent="handleSubmit" class="login">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" class="textbox" />
    <input
      type="password"
      placeholder="Password"
      v-model="password"
      class="textbox"
    />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending" class="button">Log in</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import useLogin from "@/composables/useLogin";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { error, login, isPending } = useLogin();
    const router = useRouter();

    const email = ref("");
    const password = ref("");
    const handleSubmit = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        router.push({ name: "UserPredictions", params: { toUrl: res.user } });
      }
    };
    return { email, password, handleSubmit, error, isPending };
  },
};
</script>

<style scoped>
.login {
  background-color: black;
  color: black;
}
.textbox {
  color: black;
}
</style>