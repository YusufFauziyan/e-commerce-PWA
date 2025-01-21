<script setup>
import { ref, onMounted } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

// component
import VModal from '@/components/VModal.vue'
import VInput from '@/components/VInput.vue'
import VTextArea from '@/components/VTextArea.vue'
import VButton from '@/components/VButton.vue'

// validation
const schema = yup.object({
  addressTitle: yup.string().required('Address Title is required'),
  fullName: yup.string().required('Full Name is required'),
  phone: yup.number().required('Phone is required'),
  address: yup.string().required('Address is required'),
})

// ref
const showModal = ref(true)

// form
const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    addressTitle: '',
    fullName: '',
    phone: 628,
    address: '',
  },
})

// Define field
const { value: addressTitle, errorMessage: addressTitleError } = useField('addressTitle')
const { value: fullName, errorMessage: fullNameError } = useField('fullName')
const { value: phone, errorMessage: phoneError } = useField('phone')
const { value: address, errorMessage: addressError } = useField('address')

// Submit form
const onSubmit = handleSubmit(async (values) => {
  console.log('Form Submitted:', values)
})
</script>

<template>
  <VModal
    v-if="showModal"
    disableClose
    title="Create Address"
    width="md"
    :isOpen="showModal"
    v-on:close="showModal = false"
  >
    <form @submit.prevent="onSubmit">
      <div class="grid grid-cols-2 gap-2 w-full">
        <VInput
          v-model="addressTitle"
          class="col-span-2"
          id="addressTitle"
          label="Address Title"
          placeholder="Enter your address title"
          :error="addressTitleError"
        />
        <VInput
          v-model="fullName"
          id="fullName"
          label="Full Name"
          placeholder="Enter your Full Name"
          :error="fullNameError"
        />
        <VInput id="email" label="Email" :disableInput="true" modelValue="example@gmail.com" />
        <VInput
          v-model="phone"
          class="col-span-2"
          id="phone"
          label="Phone"
          placeholder="+62xxx-xxxx-xxxx"
          type="number"
          :error="phoneError"
        />
        <VTextArea
          v-model="address"
          class="col-span-2"
          id="address"
          label="Address"
          placeholder="Toworawara 3, 00-112, Poland"
          :error="addressError"
        />

        <VButton class="col-span-2" type="submit" label="Save Address" size="sm" />
      </div>
    </form>
  </VModal>
</template>
