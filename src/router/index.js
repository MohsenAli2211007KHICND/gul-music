import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import CreatePlayList from '../views/playlist/CreatePlaylist.vue'
import PlaylistDetails from '../views/playlist/PlaylistDetails.vue'
import UserPlaylist from '../views/playlist/UserPlaylist.vue'

// Gurd
import { projectAuth } from '@/firebase/config'

const requiredAuth = (to, from, next) => {
  const user = projectAuth.currentUser

  if (!user) {
    next({ name: 'Login'})
  }
  else 
  {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: requiredAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/playlist/create',
    name: 'CreatePlaylist',
    component: CreatePlayList,
    beforeEnter: requiredAuth
  },
  {
    path: '/playlist/:id',
    name: 'PlaylistDetails',
    component: PlaylistDetails,
    beforeEnter: requiredAuth,
    props: true
  },
  {
    path: '/playlist/user',
    name: 'UserPlaylist',
    component: UserPlaylist,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
