<script setup lang="ts">
import { StarIcon } from '@heroicons/vue/24/solid'
import { formatRupiah } from '../../utils/format-number'

interface Product {
  id: string
  name: string
  price: number
  discount: number
  rating: number
  images: {
    url: string
    alt: string
  }[]
}

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <div class="bg-primary px-12 py-20 rounded-lg container">
    <h1 class="font-extrabold text-center text-4xl dark:text-black tracking-tight text-shadowk">
      BROWSE BY DRESS STYLE
    </h1>

    <div class="grid grid-cols-3 mt-12 gap-4">
      <div class="bg-white rounded-xl relative flex h-[290px] overflow-hidden shadow-md">
        <p class="p-4 font-bold text-2xl text-black">Casual</p>
        <img src="@/assets/home/casual.png" alt="casual" class="w-full h-full object-cover" />
      </div>
      <div class="bg-white rounded-xl relative flex h-[290px] overflow-hidden shadow-md col-span-2">
        <p class="p-4 font-bold text-2xl text-black">Formal</p>
        <img src="@/assets/home/formal.png" alt="formal" class="w-full h-full object-cover" />
      </div>
      <div class="bg-white rounded-xl relative flex h-[290px] overflow-hidden shadow-md col-span-2">
        <p class="p-4 font-bold text-2xl text-black">Party</p>
        <img src="@/assets/home/party.png" alt="party" class="w-full h-full object-cover" />
      </div>
      <div class="bg-white rounded-xl relative flex h-[290px] overflow-hidden shadow-md">
        <p class="p-4 font-bold text-2xl text-black">Gym</p>
        <img src="@/assets/home/gym.png" alt="gym" class="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</template>
