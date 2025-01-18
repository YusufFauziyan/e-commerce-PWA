<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <nav>
    <Navbar msg="You did it!" />
  </nav>

  <!-- <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink> -->

  <RouterView />

  <!-- footer -->
  <footer>
    <Footer />
  </footer>
</template>

<style scoped></style>
