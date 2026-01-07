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
</script>
