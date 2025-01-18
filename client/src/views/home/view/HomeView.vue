<script setup>
import { ref, onMounted } from 'vue'

import Banner from '../banner.vue'
import NewProduct from '../NewProduct.vue'
import TopSelling from '../TopSelling.vue'
import DressStyle from '../DressStyle.vue'
import HappyCustomer from '../HappyCustomer.vue'
import { getAllProducts } from '@/services/productService'
import { handleApiError } from '@/utils/api/apiErrorHandler'

const newProducts = ref([])
const soldProducts = ref([])
const loading = ref(true)

const fetchNewestProducts = async () => {
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

const fetchSoldestProducts = async () => {
  loading.value = true
  try {
    const { products } = await getAllProducts({ page: 1, limit: 4, orderBy: 'sold_quantity' })
    soldProducts.value = products
    loading.value = false
  } catch (error) {
    const { status, message } = handleApiError(error)
    console.error(`Error ${status}: ${message}`)
  }
}

onMounted(() => {
  fetchNewestProducts()
  fetchSoldestProducts()
})
</script>

<template>
  <main>
    <Banner />

    <NewProduct :products="newProducts" />
    <div class="border-b w-full" />
    <TopSelling :products="soldProducts" />
    <DressStyle />
    <HappyCustomer />
  </main>
</template>
