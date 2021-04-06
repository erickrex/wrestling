import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";
import CreatePlaylist from "../views/playlists/CreatePlaylist.vue";
import PlaylistDetails from "../views/playlists/PlaylistDetails.vue";
import UserPredictions from "../views/playlists/UserPredictions.vue";
import MakePredictions from "../views/MakePredictions.vue";

// route guard
import { projectAuth } from "../firebase/config";

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (!user) {
    next({ name: "Login" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/playlists/create",
    name: "CreatePlaylist",
    component: CreatePlaylist,
    beforeEnter: requireAuth,
  },
  //path: '/wwe/:toUrl/wrestlemania',
  {
    path: "/wwe/:toUrl/wrestlemania",
    name: "PlaylistDetails",
    component: PlaylistDetails,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/predictions/user",
    name: "UserPredictions",
    component: UserPredictions,
    beforeEnter: requireAuth,
  },
  {
    path: "/predictions",
    name: "MakePredictions",
    component: MakePredictions,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
