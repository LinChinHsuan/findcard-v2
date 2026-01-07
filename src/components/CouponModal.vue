<template>
  <div
    class="modal fade"
    id="couponModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title fw-bold" id="exampleModalLabel">
            {{ coupon.id ? '編輯優惠券' : '新增優惠券' }}
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="tempCoupon.title"
              placeholder="請輸入標題"
            />
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input
              type="text"
              class="form-control"
              id="coupon_code"
              v-model="tempCoupon.code"
              placeholder="請輸入優惠碼"
            />
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input type="date" class="form-control" id="due_date" v-model="due_date" />
          </div>
          <div class="mb-3">
            <label for="price">折扣百分比</label>
            <input
              type="number"
              class="form-control"
              id="price"
              v-model.number="tempCoupon.percent"
              placeholder="請輸入折扣百分比"
            />
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                :true-value="1"
                :false-value="0"
                v-model="tempCoupon.is_enabled"
                id="is_enabled"
              />
              <label class="form-check-label" for="is_enabled">是否啟用</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary text-white"
            @click="$emit('update-coupon', tempCoupon)"
          >
            {{ coupon.id ? '更新優惠券' : '新增優惠券' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import Modal from 'bootstrap/js/dist/modal'

const props = defineProps({
  coupon: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['update-coupon'])

const tempCoupon = ref({})
const due_date = ref('')

watch(
  () => props.coupon,
  (newVal) => {
    tempCoupon.value = { ...newVal }
    if (newVal.id) {
      due_date.value = new Date(tempCoupon.value.due_date * 1000).toISOString().split('T')[0]
    } else {
      due_date.value = ''
    }
  },
)
watch(due_date, (newVal) => {
  if (newVal) {
    tempCoupon.value.due_date = Math.floor(new Date(newVal) / 1000)
  }
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
