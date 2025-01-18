<script setup>
import apple from '@/assets/brands/apple.png'
import ck from '@/assets/brands/ck.png'
import gucci from '@/assets/brands/gucci.png'
import prada from '@/assets/brands/prada.png'
import samsung from '@/assets/brands/samsung.png'
import vercase from '@/assets/brands/vercase.png'
import zara from '@/assets/brands/zara.png'
import uniqlo from '@/assets/brands/uniqlo.png'
import hnm from '@/assets/brands/hnm.png'
import xiaomi from '@/assets/brands/xiaomi.png'

const avatarArray = [apple, ck, gucci, prada, samsung, vercase, zara, uniqlo, hnm, xiaomi]
</script>

<template>
  <div class="bg-primary">
    <!-- Added a single parent div -->
    <div class="flex justify-between gap-20 container">
      <div class="flex-1 flex flex-col justify-center gap-6">
        <h1 class="text-black text-4xl font-bold text-shadow">
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h1>
        <p class="text-xs text-black">
          Browse through our diverse range of meticulously crafted garments, designed to bring out
          your individuality and cater to your sense of style.
        </p>
        <button
          class="px-12 py-3 bg-black w-fit text-xs text-white rounded-full hover:bg-white hover:text-black duration-500 shadow-md border-2"
        >
          Shop Now
        </button>
        <div class="grid grid-cols-3 mt-4 gap-4">
          <div class="border-r-2">
            <p class="font-extrabold text-2xl text-black">200+</p>
            <p class="text-xs opacity-60 mt-0.5 text-black">International Brands</p>
          </div>
          <div class="border-r-2">
            <p class="font-extrabold text-2xl text-black">2,000_+</p>
            <p class="text-xs opacity-60 mt-0.5 text-black">High-Quality Products</p>
          </div>
          <div class="">
            <p class="font-extrabold text-2xl text-black">30,000+</p>
            <p class="text-xs opacity-60 mt-0.5 text-black">Happy Customers</p>
          </div>
        </div>
      </div>

      <div class="flex-1 relative flex justify-center">
        <div class="absolute top-10 right-0">
          <img src="@/assets/home/diamond-light.png" alt="diamond" width="50px" />
        </div>
        <div class="absolute top-[50%] left-0">
          <img src="@/assets/home/diamond-light.png" alt="diamond" width="35px" />
        </div>
        <img src="@/assets/home/style-cover.png" alt="style-product" />
      </div>
    </div>

    <div class="bg-black py-6">
      <Vue3Marquee :pause-on-click="true" :duration="20">
        <img
          v-for="img in avatarArray"
          :key="img"
          :src="img"
          class="mx-10 max-w-[120px] max-h-[80px] object-cover"
        />
      </Vue3Marquee>
    </div>
  </div>
  <!-- Closing the single parent div -->
</template>
