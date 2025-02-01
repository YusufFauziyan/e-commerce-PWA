<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  label: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'primary', // Variasi tombol seperti 'primary', 'secondary', dll.
  },
  loading: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'normal', // Ukuran tombol: sm, normal, large
    validator: (value) => ['sm', 'normal', 'large'].includes(value),
  },
})

const buttonClass = computed(() => {
  const baseClass = 'font-bold rounded-lg focus:outline-none duration-200 border'

  const variants = {
    primary: 'bg-black text-white hover:bg-white hover:text-black',
    secondary: 'bg-gray-500 text-white hover:bg-gray-400 hover:text-black',
    danger: 'bg-red-500 text-white hover:bg-red-400',
  }

  const sizes = {
    sm: 'py-2 px-2 text-xs',
    normal: 'py-2 px-4 text-sm',
    large: 'py-3 px-6 text-lg',
  }

  return `${baseClass} ${variants[props.variant] || variants.primary} ${
    sizes[props.size] || sizes.normal
  }`
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[buttonClass, disabled ? 'opacity-50 cursor-not-allowed' : '']"
  >
    {{ loading ? 'Loading' : label }}
  </button>
</template>

<style scoped>
/* Tambahkan styling tambahan jika diperlukan */
</style>
