<script setup>
import { ref, onMounted } from 'vue'

import Banner from '../banner.vue'
import NewProduct from '../NewProduct.vue'
import { getAllProducts } from '@/services/productService'
import { handleApiError } from '@/utils/api/apiErrorHandler'

const newProducts = ref([])
const loading = ref(true)

const fetchProducts = async () => {
  loading.value = true
  try {
    const { products } = await getAllProducts({ page: 1, limit: 4 })
    newProducts.value = products
    loading.value = false
  } catch (error) {
    const { status, message } = handleApiError(error)
    console.error(`Error ${status}: ${message}`)
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <main class="">
    <Banner />

    <div class="p-container">
      <NewProduct :products="newProducts" />
      <div class="border-b w-full" />
    </div>
  </main>
</template>
