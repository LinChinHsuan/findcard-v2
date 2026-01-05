<template>
  <div :style="{ 'background-image': info.bgImg }" class="bg-img" :class="{'bg-attachment': info.attachment}">
    <div class="bg-dark bg-opacity-75 h-100 d-flex flex-column justify-content-center">
      <h3 class="d-flex justify-content-center mb-4">
        <span class="me-2 fs-1 text-white fw-bolder">{{ info.title }}</span>
        <span class="fs-3 text-primary align-self-end">/ {{ info.titleEn }}</span>
      </h3>
      <p class="text-white text-center px-3 fs-5">{{ info.text }}</p>
      <div class="d-flex">
        <RouterLink :to="info.btnPath" type="button" class="btn btn-outline-light btn-lg border-2 text-white fw-bold px-4 mt-3 mx-auto">
          {{ info.btnText }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['info'])
</script>

<style lang="scss" scoped>
.bg-img{
  height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.bg-attachment{
  background-attachment: fixed;
}
.btn-outline-light{
  transition: .8s;
  &:hover,
  &:focus {
    color: #ffffff;
    box-shadow: inset 0 0 0 3em #587778;
  }
}
</style>
