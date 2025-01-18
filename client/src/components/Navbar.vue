<script setup lang="ts">
defineProps<{
  msg: string
}>()

import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { BuildingStorefrontIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div>
    <div class="bg-common-black p-container-x py-2">
      <div class="flex justify-between">
        <div />
        <div class="flex items-center gap-2">
          <p class="text-common-white text-xs">Sign up and get 20% off to your first order.</p>
          <a href="#" class="text-common-white underline text-xs">Sign Up Now</a>
        </div>
        <div class="cursor-pointer hover:opacity-50 duration-150">
          <XMarkIcon class="h-4 w-4 text-common-white" />
        </div>
      </div>
    </div>

    <div class="py-[1.5rem] flex items-center container">
      <div class="w-[150px]">
        <p class="font-bold">LOGO</p>
      </div>
      <div class="flex items-center justify-between gap-12 w-full">
        <div class="flex flex-nowrap items-center gap-6">
          <a href="#" class="font-medium text-xs whitespace-nowrap">Shop</a>
          <a href="#" class="font-medium text-xs whitespace-nowrap">On Sale</a>
          <a href="#" class="font-medium text-xs whitespace-nowrap">New Arrivals</a>
          <a href="#" class="font-medium text-xs whitespace-nowrap">Brands</a>
        </div>
        <div class="bg-primary w-full rounded-full flex items-center py-2 shadow px-4 gap-2">
          <MagnifyingGlassIcon class="h-4 w-4 text-black/60" />

          <input
            type="text"
            class="bg-transparent text-xs w-full focus:outline-none text-black/60"
            placeholder="Search for products..."
          />
        </div>
        <button
          class="bg-common-black border text-common-white hover:text-common-black hover:bg-common-white duration-500 px-4 py-2 rounded-full flex items-center text-xs font-medium whitespace-nowrap"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
