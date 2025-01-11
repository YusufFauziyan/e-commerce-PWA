<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import Navbar from './components/Navbar.vue'
</script>

<template>
  <nav>
    <Navbar msg="You did it!" />
  </nav>

  <!-- <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink> -->

  <RouterView />
</template>

<style scoped></style>
