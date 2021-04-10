<template>
  <div class="navbar">
    <nav>
      <div class="navbar-container">
        <img src="@/assets/logo.png" />
        <h1>
          <router-link :to="{ name: 'Home' }"
            >Wrestling Predictions</router-link
          >
        </h1>
      </div>
      <div class="links">
        <div class="links-container" v-if="user">
          <router-link :to="{ name: 'MakePredictions' }"
            ><div class="btn">Pick Winners!</div></router-link
          >

          <router-link :to="{ name: 'UserPredictions' }"
            ><div class="btn">My Predictions</div></router-link
          >

          <a @click="handleClick"><div class="btn">Logout</div></a>
        </div>

        <div v-else>
          <router-link :to="{ name: 'Signup' }"
            ><div class="btn">Signup</div></router-link
          >

          <router-link :to="{ name: 'Login' }"
            ><div class="btn">Login</div></router-link
          >
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
.navbar-container {
  display: flex;
  align-items: center;
  padding: 1rem 0;
}
.links {
  padding-right: 0;
  padding-left: auto;
}
nav {
  display: flex;
  align-items: center;
  margin: auto;
  justify-content: space-between;
  max-width: 1200px;
}
.links-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

nav img {
  max-height: 10vw;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  width: 100%;
  margin-bottom: 2rem;
}

nav .links a,
button {
  font-size: 1rem;
  font-weight: bold;
}
.btn {
  padding: 0.7rem;
  margin: 0 1rem;
  width: 10rem;
  text-align: center;
}

.btn a {
  color: black;
}

.hello {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
}

.hello .btn {
  width: 100%;
  max-width: 1240px;
  text-align: center;
  margin-bottom: 2rem;
}

@media (max-width: 728px) {
  nav {
    flex-direction: column;
  }
  .links-container {
    justify-content: center;
    align-items: center;
  }
  nav .links a,
  button {
    text-align: center;
    vertical-align: middle !important;
    font-size: 0.7rem;
  }
}
</style>