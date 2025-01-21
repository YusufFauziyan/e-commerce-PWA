<script setup>
import { defineProps, defineEmits, ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  header: {
    type: String,
    required: false,
    default: '',
  },
  width: {
    type: String,
    default: 'full',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'full'].indexOf(value) !== -1,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  disableClose: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])
const isDisabled = ref(props.disableClose)
const isOpen = ref(props.isOpen) // Use modelValue for modal state

const close = () => {
  isOpen.value = false
  emit('close')
}

const onEscape = (e) => {
  if ((e.key === 'Esc' || e.key === 'Escape') && !isDisabled.value) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onEscape)
})
</script>

<template>
  <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-10" v-if="isOpen">
    <div
      class="absolute w-full h-full bg-gray-900 opacity-50"
      @click="!isDisabled ? close : null"
    ></div>

    <div class="absolute max-h-full">
      <div class="container bg-white overflow-hidden rounded-xl">
        <div
          class="px-4 py-4 leading-none flex justify-between items-center font-medium text-sm select-none"
        >
          <h3 class="font-bold text-lg tracking-tight">{{ title }}</h3>
          <div
            v-if="!disableClose"
            @click="close"
            class="text-2xl hover:text-gray-600 cursor-pointer"
          >
            &#215;
          </div>
        </div>

        <div class="max-h-full px-4 pt-2 pb-6">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Style untuk modal */
</style>
