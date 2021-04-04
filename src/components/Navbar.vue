<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/logo.png"/>
      <h1><router-link :to="{ name: 'Home' }">Wrestling Predictions</router-link></h1>
      <div class="links">
        <div v-if="user">
          
          <router-link :to="{ name: 'CreatePlaylist' }">Create Playlist</router-link>
          <router-link :to="{ name: 'UserPlaylists' }">My Playlists</router-link>
          <span v-if='user' class="hello">Hola {{ user.displayName }}, welcome!</span>
          <button @click="handleClick">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
          <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

import getUser from '../composables/getUser'
import useLogout from '../composables/useLogout'
import { useRouter } from 'vue-router'
export default {
  setup() {
      
    const { user } = getUser()
    const { logout } = useLogout()
    const router = useRouter()
    //console.log(user.value.displayName)
    const handleClick = async () => {
      await logout()
      console.log('logged out')
      router.push({ name: 'Login' })
    }
    return { handleClick, user }
  }
}
</script>

<style scoped>
  .navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
  }
  nav {
    display: flex;

    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  nav img {
    max-height: 60px;
  }
  nav h1 {
    margin-left: 20px;
  }
  nav .links {
    margin-left: auto;
  }

  nav .links a, button {
    margin: 1rem;
    font-size: 1.2rem;
  }

  nav .links a:hover, button:hover {
    color: red;
    font-size: 1.5rem;
  }

  .hello{
    font-size: 1.3rem;
  }
</style>