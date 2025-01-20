<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { login, loginWithGoogle } from '@/services/authService'
import type { CallbackTypes } from 'vue3-google-login'
import { useRouter } from 'vue-router'

// store
import { useAuthStore } from '@/stores/auth'

// validation schema
const schema = yup.object({
  email: yup.string().email('Email must be valid').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

// store
const authStore = useAuthStore()

// router
const router = useRouter()

const { handleSubmit } = useForm({
  validationSchema: schema,
})

// Definisi field
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

// Submit handler
const onSubmit = handleSubmit(async (values) => {
  console.log('Form Submitted:', values)
  try {
    const res = await login(values.email, values.password)

    authStore.setUser(res)
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
  }
})

// login google
const callbackGoogle: CallbackTypes.CredentialCallback = async (response: any) => {
  const { credential } = response

  try {
    const res = await loginWithGoogle(credential)

    authStore.setUser(res)
    router.push('/')
  } catch (error) {
    console.error('Login with Google failed:', error)
  }
}

const showPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

console.log(authStore.token)
console.log(authStore.user)

onMounted(() => {
  if (authStore.user) {
    router.push('/')
  }
})
</script>

<template>
  <main class="grid grid-cols-2 h-[100vh] overflow-hidden">
    <div class="p-12">
      <nav class="h-full">
        <RouterLink class="text-xl font-bold" to="/">LOGO</RouterLink>

        <div class="flex justify-center flex-col h-full px-[15%]">
          <h4 class="text-4xl font-bold">Sign In</h4>
          <p class="text-sm mt-1 text-gray-500/75">Fill the fields below to continue.</p>

          <form @submit.prevent="onSubmit">
            <div class="mt-6 flex flex-col gap-4">
              <div>
                <label for="email" class="text-sm font-bold">Email</label>
                <input
                  v-model="email"
                  type="email"
                  id="email"
                  :class="[
                    'w-full border rounded-lg px-2 py-1.5 focus:outline-none mt-1 pr-8',
                    emailError ? 'border-red-500' : 'border-gray-300',
                  ]"
                  placeholder="example@gmail.com"
                />
                <p class="text-red-500 text-xs mt-1" v-if="emailError">{{ emailError }}</p>
              </div>
              <div>
                <label for="password" class="text-sm font-bold">Password</label>
                <div class="relative">
                  <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    :class="[
                      'w-full border rounded-lg px-2 py-1.5 focus:outline-none mt-1 pr-8',
                      passwordError ? 'border-red-500' : 'border-gray-300',
                    ]"
                    placeholder="Write your password"
                  />
                  <p class="text-red-500 text-xs mt-1" v-if="passwordError">{{ passwordError }}</p>

                  <component
                    :is="showPassword ? EyeSlashIcon : EyeIcon"
                    class="absolute right-2 top-3.5 w-4 h-4 text-gray-500 cursor-pointer"
                    @click="togglePassword"
                  />
                </div>
              </div>

              <button
                type="submit"
                class="bg-black text-white font-bold py-2 rounded-lg mt-4 focus:outline-none hover:bg-white hover:text-black duration-200 border"
              >
                Sign In
              </button>
            </div>
          </form>

          <div class="my-8 flex items-center justify-center gap-2">
            <hr class="w-full border-t border-gray-300" />
            <p class="text-sm text-gray-500">Or</p>
            <hr class="w-full border-t border-gray-300" />
          </div>

          <GoogleLogin :callback="callbackGoogle" />
        </div>
      </nav>
    </div>
    <div class="bg-primary p-20 relative">
      <p class="text-xl font-bold opacity-50 capitalize">
        "The advance of technology is based on making it fit in so that you don't really even notice
        it, so it's part of everyday life."
      </p>
      <p class="mt-12 font-bold opacity-80">Bill Gates</p>
      <p class="opacity-50 text-xs font-medium">Co-founder of Microsoft.</p>
      <div class="absolute top-1/3 w-full rounded-xl overflow-hidden shadow-md">
        <img
          src="@/assets/login/login-hero-light.png"
          alt="login-hero"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </main>
</template>
