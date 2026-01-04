<template>
  <div class="toast-container position-fixed">
    <Toast v-for="(msg, key) in messages" :key="key" :msg="msg" />
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue'
import messageStore from '@/stores/messageStore'
import { mapState, mapActions } from 'pinia'

export default {
  components: { Toast },
  computed: {
    ...mapState(messageStore, ['messages'])
  },
  methods: {
    ...mapActions(messageStore, ['pushMessage'])
  }
}
</script>

<style lang="scss" scoped>
.toast-container{
  z-index: 3;
  top: 10px;
  right: 10px;
}
</style>
