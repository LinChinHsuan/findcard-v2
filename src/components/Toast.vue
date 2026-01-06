<template>
  <div class="toast rounded-0" role="alert" aria-live="assertive" aria-atomic="true" ref="toast">
    <div class="toast-header">
      <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span>
      <strong class="me-auto">{{ msg.title }}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body" v-if="msg.content">
      {{ msg.content }}
    </div>
  </div>
</template>

<script setup>
import Toast from 'bootstrap/js/dist/toast'
import { ref, onMounted } from 'vue'

const props = defineProps(['msg'])

const toast = ref(null)

onMounted(()=>{
    const bsToast = new Toast(toast.value, {
      delay: 6500
    })
    bsToast.show()
})
</script>
