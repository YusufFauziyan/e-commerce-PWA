<script setup>
import { ref, onMounted } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

// services
import { getAllAddress, createAddress, updateAddress } from '@/services/addressService'
import { updateUserInfo } from '@/services/userService'

// package
import { VueTelInput } from 'vue-tel-input'

// component
import VModal from '@/components/VModal.vue'
import VInput from '@/components/VInput.vue'
import VTextArea from '@/components/VTextArea.vue'
import VButton from '@/components/VButton.vue'

// define props
const props = defineProps({
  user: {
    type: Object,
    default: () => ({}),
    required: true,
  },
})

// validation
const schema = yup.object({
  addressTitle: yup.string().required('Address Title is required'),
  fullName: yup.string().required('Full Name is required'),
  phone: yup.number().typeError('Phone number must be a number').required('Phone is required'),
  address: yup.string().required('Address is required'),
})

// ref
const showModal = ref(true)
const addressId = ref(null)
const loadingSubmit = ref(false)

// form
const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    addressTitle: '',
    fullName: props.user.username,
    phone: props.user.phone_number,
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
  loadingSubmit.value = true

  try {
    // Create address
    if (!addressId.value) {
      await createAddress({
        user_id: props.user.id,
        title_address: values.addressTitle,
        street_address: values.address,
        default_address: true,
      })
    } else {
      await updateAddress(addressId.value, {
        title_address: values.addressTitle,
        street_address: values.address,
      })
    }

    await updateUserInfo(props.user.id, {
      phone_number: values.phone,
    })
  } catch (error) {
    console.error(error)
  } finally {
    loadingSubmit.value = false
  }
})

// fetch address
const fetchAddress = async () => {
  try {
    const res = await getAllAddress()

    const findDefaultAddress = res.find((address) => address.default_address)
    if (findDefaultAddress) {
      addressId.value = findDefaultAddress.id
      addressTitle.value = findDefaultAddress.title_address
      address.value = findDefaultAddress.street_address
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchAddress()
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
        <VInput id="email" label="Email" :disableInput="true" :modelValue="props.user.email" />

        <div class="flex flex-col gap-1 col-span-2">
          <p class="text-xs font-bold">Phone</p>
          <VueTelInput
            v-model="phone"
            id="phone"
            label="Phone"
            defaultCountry="id"
            :inputOptions="{ required: true, type: 'tel' }"
          />
          <p class="text-red-500 text-xs" v-if="phoneError">{{ phoneError }}</p>
        </div>
        <VTextArea
          v-model="address"
          class="col-span-2"
          id="address"
          label="Address"
          placeholder="Toworawara 3, 00-112, Poland"
          :error="addressError"
        />

        <VButton
          class="col-span-2"
          type="submit"
          label="Save Address"
          size="sm"
          :loading="loadingSubmit"
        />
      </div>
    </form>
  </VModal>
</template>
