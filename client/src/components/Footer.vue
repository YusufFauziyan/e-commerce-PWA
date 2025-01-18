<script setup lang="ts">
import { EnvelopeIcon } from '@heroicons/vue/24/outline'
import { formatRupiah } from '../utils/format-number'
</script>

<template>
  <div class="mt-40 relative">
    <div class="flex items-center justify-center flex-col">
      <div class="absolute -top-20 container">
        <div class="bg-common-black py-8 px-12 rounded-xl grid grid-cols-2 gap-4 items-center">
          <h1 class="font-extrabold text-2xl text-white dark:text-black">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h1>

          <div class="flex items-center gap-3 flex-col justify-center px-24 overflow-hidden">
            <div class="relative w-full">
              <EnvelopeIcon
                class="absolute top-1/2 left-4 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              />
              <input
                type="email"
                placeholder="Enter your email address"
                class="w-full pl-10 border py-1.5 px-4 rounded-2xl text-common-black focus:outline-none text-xs dark:text-black"
              />
            </div>
            <button
              class="bg-white dark:bg-black dark:text-white py-2 px-4 w-full rounded-2xl text-xs font-bold hover:bg-black duration-200 hover:text-white border-white border dark:hover:bg-white dark:hover:text-black dark:border-black focus:outline-none"
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-primary h-[32vh] dark:text-black footer pt-1">
      <div class="container">
        <div class="grid grid-cols-6 gap-4 mt-20 border-b pb-8">
          <div class="col-span-2 flex flex-col gap-4 justify-between">
            <div>
              <h1 class="text-xl font-bold">LOGO</h1>
              <p class="text-xs opacity-60 mr-12 mt-3">
                We have clothes that suits your style and which you’re proud to wear. From women to
                men.
              </p>
            </div>
            <div class="flex gap-2 items-end h-full">
              <div class="p-2 border-2 rounded-full hover:scale-110 duration-300 cursor-pointer">
                <img src="@/assets/icons/twitter.png" alt="twitter" class="w-4 h-4" />
              </div>
              <div class="p-2 border-2 rounded-full hover:scale-110 duration-300 cursor-pointer">
                <img src="@/assets/icons/facebook.png" alt="facebook" class="w-4 h-4" />
              </div>
              <div class="p-2 border-2 rounded-full hover:scale-110 duration-300 cursor-pointer">
                <img src="@/assets/icons/instagram.png" alt="instagram" class="w-4 h-4" />
              </div>
              <div class="p-2 border-2 rounded-full hover:scale-110 duration-300 cursor-pointer">
                <img src="@/assets/icons/github.png" alt="github" class="w-4 h-4" />
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-between">
            <h6 class="tracking-wider font-medium">COMPANY</h6>
            <ul class="text-xs mt-4 opacity-60 flex flex-col h-full justify-between gap-2">
              <li>About</li>
              <li>Features</li>
              <li>Works</li>
              <li>Career</li>
            </ul>
          </div>
          <div class="flex flex-col justify-between">
            <h6 class="tracking-wider font-medium">HELP</h6>
            <ul class="text-xs mt-4 opacity-60 flex flex-col h-full justify-between gap-2">
              <li>Support</li>
              <li>Delivery Details</li>
              <li>Terms & Conditions</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          <div class="flex flex-col justify-between">
            <h6 class="tracking-wider font-medium">FAQ</h6>
            <ul class="text-xs mt-4 opacity-60 flex flex-col h-full justify-between gap-2">
              <li>Account</li>
              <li>Manage Deliveries</li>
              <li>Orders</li>
              <li>Payments</li>
            </ul>
          </div>
          <div class="flex flex-col justify-between">
            <h6 class="tracking-wider font-medium">RESOURCES</h6>
            <ul class="text-xs mt-4 opacity-60 flex flex-col h-full justify-between gap-2">
              <li>Free eBooks</li>
              <li>Development Tutorial</li>
              <li>How to - Blog</li>
              <li>Youtube Playlist</li>
            </ul>
          </div>
        </div>

        <div class="flex justify-between gap-2 py-4">
          <p class="opacity-40 text-[8px] font-medium">Shop.co © 2000-2021, All rights reserved</p>
          <div class="flex gap-2">
            <div class="py-0.5 px-3 flex items-center bg-white rounded-md shadow">
              <img src="@/assets/icons/visa.png" alt="visa" class="w-6 h-6" />
            </div>
            <div class="py-0.5 px-3 flex items-center bg-white rounded-md shadow">
              <img src="@/assets/icons/master-card.png" alt="master-card" class="w-6 h-6" />
            </div>
            <div class="py-0.5 px-3 flex items-center bg-white rounded-md shadow">
              <img src="@/assets/icons/paypal.png" alt="paypal" class="w-6 h-6" />
            </div>
            <div class="py-0.5 px-3 flex items-center bg-white rounded-md shadow">
              <img src="@/assets/icons/apple-pay.png" alt="apple-pay" class="w-6 h-6" />
            </div>
            <div class="py-0.5 px-3 flex items-center bg-white rounded-md shadow">
              <img src="@/assets/icons/google-pay.png" alt="google-pay" class="w-6 h-6" />
            </div>
            <div class="py-0.5 px-3 flex items-center bg-white rounded-md shadow">
              <p class="text-[8px] font-bold opacity-60">+6</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
li:hover {
  text-decoration: underline;
  color: var(--color-text-common-black);
}

.footer p,
.footer h1,
.footer h6 {
  color: #000;
}
</style>
