<script setup>
import { defineProps, ref, watch } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  id: {
    type: String,
    required: true,
    default: '',
  },
  label: {
    type: String,
    required: false,
    default: '',
  },
  disableInput: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  rows: {
    type: Number,
    default: 4,
  },
  modelValue: [String, Number], // Add modelValue prop
})

const emit = defineEmits(['update:modelValue']) // Define the emit

const handleInput = (event) => {
  emit('update:modelValue', event.target.value) // Emit the update event
}
</script>

<template>
  <div>
    <label :for="id" class="text-xs font-bold" v-if="label">{{ label }}</label>
    <textarea
      :id="id"
      :class="[
        'w-full border rounded-md px-2 py-1.5 text-sm focus:outline-none  pr-8 placeholder:text-xs font-medium focus:font-medium resize-none placeholder:pt-1',
        error ? 'border-red-500' : 'border-gray-300',
        disableInput ? 'bg-gray-100 cursor-default' : '',
      ]"
      :disabled="disableInput"
      :rows="rows"
      :value="modelValue"
      @input="handleInput"
      v-bind="$attrs"
    />
    <p class="text-red-500 text-xs mt-1" v-if="error">{{ error }}</p>
  </div>
</template>

<style scoped>
/* Optional styling */
</style>
