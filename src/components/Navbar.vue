<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/logo.png" />
      <h1>
        <router-link :to="{ name: 'Home' }">Wrestling Predictions</router-link>
      </h1>
      <div class="links">
        <div v-if="user">
          <router-link :to="{ name: 'MakePredictions' }" class="btn"
            >Pick Winners!</router-link
          >
          <router-link :to="{ name: 'UserPredictions' }" class="btn"
            >My Predictions</router-link
          >

          <button @click="handleClick">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
          <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
        </div>
      </div>
    </nav>
    <div class="hello">
      <span v-if="user" class="btn"
        >Welcome {{ user.displayName }}! See profile</span
      >
    </div>
  </div>
</template>

<script>
import getUser from "../composables/getUser";
import useLogout from "../composables/useLogout";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { user } = getUser();
    const { logout } = useLogout();
    const router = useRouter();
    //console.log(user.value.displayName)
    const handleClick = async () => {
      await logout();
      console.log("logged out");
      router.push({ name: "Login" });
    };
    return { handleClick, user };
  },
};
</script>

<style scoped>
.navbar {
  padding: 10px;
  margin-bottom: 20px;
  background: black;
}
.links {
  padding-right: 0;
  padding-left: auto;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
}
nav img {
  max-height: 10vw;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  width: 100%;
  margin-left: 8rem;
}

nav .links a,
button {
  margin: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
}

nav .links a:hover,
button:hover {
  color: red;
  font-size: 1.1rem;
}

.hello {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
}
</style>