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
  <div class="flex flex-col justify-center items-center my-12">
    <h1 class="font-extrabold text-2xl">NEW ARRIVALS</h1>

    <div class="grid grid-cols-4 gap-4 mt-12 w-full">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="flex flex-col items-start gap-2 cursor-pointer hover:scale-105 duration-300"
      >
        <div class="w-full bg-primary rounded-2xl overflow-hidden shadow">
          <img
            :src="product.images[0].url"
            alt="`${product.name}`"
            class="w-full object-contain h-[300px]"
            loading="lazy"
          />
        </div>
        <p class="font-bold line-clamp-1 capitalize">{{ product.name }}</p>
        <div class="flex gap-2 items-center">
          <div class="flex items-center gap-1">
            <StarIcon v-for="n in 5" :key="n" class="h-4 text-yellow-400" />
          </div>
          <p class="text-xs font-medium">5/<span class="opacity-60">5</span></p>
        </div>
        <div class="flex items-center gap-2">
          <p class="text-xs font-bold">
            {{ formatRupiah(Number(product.price) - Number(product.discount)) }}
          </p>
          <p v-if="Number(product.discount)" class="text-xs font-bold line-through opacity-50">
            {{ formatRupiah(Number(product.price)) }}
          </p>
        </div>
      </div>
    </div>

    <button
      class="mt-12 py-2 px-12 rounded-full text-xs font-bold border shadow-sm group duration-300 hover:shadow-md"
    >
      <span class="opacity-70 group-hover:opacity-100 duration-300:">View All</span>
    </button>
  </div>
</template>
