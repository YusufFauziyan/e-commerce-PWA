import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/view/HomeView.vue'
import LoginView from '@/views/login/view/LoginView.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/logout',
    name: 'Logout',
    redirect: () => {
      const authStore = useAuthStore()
      authStore.clearUser()
      return { name: 'Login' }
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
