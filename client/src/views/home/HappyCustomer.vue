<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'
import { faker } from '@faker-js/faker'

interface Testimonial {
  id: number
  name: string
  content: string
  verified: boolean
}

const testimonials: Testimonial[] = [...new Array(16)].map((_, index) => ({
  id: index,
  name: faker.person.firstName(),
  content: faker.lorem.paragraph(),
  verified: true,
}))

const currentIndex = ref(5)
const slideInterval = ref<number | null>(null)
const totalPages = 10 // 3 card in view, adjust pages accordingly

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % (totalPages + 1)
}

const prev = () => {
  currentIndex.value = currentIndex.value === 0 ? totalPages : currentIndex.value - 1
}

const startAutoSlide = () => {
  slideInterval.value = window.setInterval(next, 5000)
}

const stopAutoSlide = () => {
  if (slideInterval.value) {
    clearInterval(slideInterval.value)
  }
}

onMounted(() => {
  startAutoSlide()
})
</script>

<template>
  <div class="flex items-end justify-between gap-4 mt-12">
    <h1 class="font-extrabold text-center text-4xl text-common-black tracking-tight text-shadow">
      OUR HAPPY CUSTOMERS
    </h1>
    <div class="flex items-center gap-4" @mouseenter="stopAutoSlide" @mouseleave="startAutoSlide">
      <ChevronLeftIcon
        @click="prev"
        class="h-4 cursor-pointer hover:text-common-black hover:scale-110 duration-300"
      />
      <ChevronRightIcon
        @click="next"
        class="h-4 cursor-pointer hover:text-common-black hover:scale-110 duration-300"
      />
    </div>
  </div>

  <div class="relative mt-8" @mouseenter="stopAutoSlide" @mouseleave="startAutoSlide">
    <div class="overflow-hidden">
      <div
        class="flex transition-transform duration-500 ease-in-out gap-4"
        :style="{ transform: `translateX(-${currentIndex * 25}%)` }"
      >
        <div
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.id"
          class="w-[25%] flex-shrink-0 box-border bg-white p-8 rounded-lg shadow-lg border"
          :class="{
            'opacity-100': index >= currentIndex && index < currentIndex + 3,
            'opacity-50 blur-sm': index < currentIndex || index >= currentIndex + 3,
          }"
        >
          <div class=" ">
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400">
                <svg
                  v-for="n in 5"
                  :key="n"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
            </div>
            <div class="flex items-center mb-1">
              <span class="font-semibold dark:text-black">{{ testimonial.name }}</span>
              <span v-if="testimonial.verified" class="ml-2 text-green-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <p class="opacity-60 mb-4 line-clamp-3 dark:text-black">{{ testimonial.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex-shrink-0 {
  flex: 0 0 auto;
}
</style>
