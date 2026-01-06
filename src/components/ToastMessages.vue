<template>
  <div class="toast-container position-fixed">
    <Toast v-for="(msg, key) in messages" :key="key" :msg="msg" />
  </div>
</template>

<script setup>
import Toast from '@/components/Toast.vue'
import messageStore from '@/stores/messageStore'
import { storeToRefs } from 'pinia'

const mStore = messageStore()

const { messages } = storeToRefs(mStore)
const { pushMessage } = mStore
</script>

<style lang="scss" scoped>
.toast-container{
  z-index: 3;
  top: 10px;
  right: 10px;
}
</style>
