<template>
  <Navbar />
  <div class="container position-relative">
    <ToastMessages />
    <RouterView />
  </div>
</template>

<script setup>
import ToastMessages from '@/components/ToastMessages.vue'
import Navbar from '@/components/AdminNavbar.vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const token = document.cookie.replace(/(?:(?:^|.*;\s*)findcardCookie\s*=\s*([^;]*).*$)|^.*$/, '$1')
axios.defaults.headers.common.Authorization = token
const api = `${import.meta.env.VITE_APP_API}/api/user/check`
axios.post(api).then((res) => {
  if (!res.data.success) {
    router.push('/login')
  }
})
</script>
