<template>
  <div
    ref="modal"
    class="modal fade"
    id="delModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="delModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title fw-bold">
            <span>刪除 {{ item.title }}</span>
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除 <strong class="text-danger">{{ item.title }}</strong> (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger text-white" @click="$emit('delItem', item)">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Modal from 'bootstrap/js/dist/modal'

const props = defineProps({
  item: {},
})

const modal = ref(null)
let bsModal = null

function showModal() {
  bsModal.show()
}
function hideModal() {
  bsModal.hide()
}
defineExpose({
  showModal,
  hideModal,
})

onMounted(() => {
  bsModal = new Modal(modal.value)
})
</script>
