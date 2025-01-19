import './assets/styles/tailwind.css'
import 'vue3-toastify/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Marquee from 'vue3-marquee'
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Marquee)
app.use(vue3GoogleLogin, {
  clientId,
})

app.mount('#app')
