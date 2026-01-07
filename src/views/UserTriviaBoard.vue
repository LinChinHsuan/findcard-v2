<template>
  <div class="container-fliud banner">
    <div class="bg-dark bg-opacity-75 w-100 h-100 d-flex align-items-center">
      <h1 class="w-100 d-flex align-items-center justify-content-center mb-0 mt-5">
        <span class="me-2 fs-1 fw-bolder text-white">撲克冷知識</span>
        <span class="fs-3 text-primary align-self-end">/ Trivia</span>
      </h1>
    </div>
  </div>
  <RouterView />
  <Footer />
</template>

<script setup>
import Footer from '@/components/Footer.vue'
</script>

<style lang="scss" scoped>
.banner {
  height: 300px;
  background-image: url('https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1758699356415.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media (max-width: 768px) {
    height: 250px;
  }
  @media (max-width: 576px) {
    height: 200px;
  }
}
</style>
