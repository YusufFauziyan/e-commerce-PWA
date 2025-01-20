<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()

// initialize session
authStore.initializeSession()

const showHeaderFooter = computed(() => {
  return route.path !== '/login'
})
</script>

<template>
  <div v-if="showHeaderFooter">
    <nav>
      <Navbar />
    </nav>
  </div>

  <RouterView />

  <div v-if="showHeaderFooter">
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped></style>

<!-- <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink> -->
