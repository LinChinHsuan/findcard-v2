<template>
  <div>
    <Loading :active="isLoading" />
    <div class="text-end mt-4">
      <button
        class="btn btn-primary fw-bold text-white"
        type="button"
        @click="openCouponModal(true)"
      >
        建立新的優惠券
      </button>
    </div>
    <div class="table-responsive">
      <table class="table my-4">
        <thead>
          <tr>
            <th>名稱</th>
            <th>折扣百分比</th>
            <th>到期日</th>
            <th class="text-center">是否啟用</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr class="align-middle" v-for="(item, key) in coupons" :key="key">
            <td>{{ item.title }}</td>
            <td>{{ item.percent }}%</td>
            <td>{{ $filters.date(item.due_date) }}</td>
            <td class="text-center">
              <span v-if="item.is_enabled" class="text-success fw-bold">啟用</span>
              <span v-else class="text-muted">未起用</span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary fw-bold"
                  type="button"
                  @click="openCouponModal(false, item)"
                >
                  編輯
                </button>
                <button
                  class="btn btn-outline-danger fw-bold"
                  type="button"
                  @click="openDelCouponModal(item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :pages="pagination" @emit-pages="getCoupons" />
    <couponModal ref="couponModal" :coupon="tempCoupon" @update-coupon="updateCoupon" />
    <DelModal ref="delModal" :item="tempCoupon" @del-item="delCoupon" />
  </div>
</template>

<script setup>
import CouponModal from '@/components/CouponModal.vue'
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/Pagination.vue'
import { ref } from 'vue'
import axios from 'axios'

import messageStore from '@/stores/messageStore'
const mStore = messageStore()
const { pushMessage } = mStore

const couponModal = ref(null)
const delModal = ref(null)

const coupons = ref([])
const pagination = ref({})
const tempCoupon = ref({})
const isNew = ref(false)
const isLoading = ref(false)

function getCoupons(page = 1) {
  const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/coupons?page=${page}`
  isLoading.value = true
  axios.get(api).then((res) => {
    isLoading.value = false
    if (res.data.success) {
      coupons.value = res.data.coupons
      pagination.value = res.data.pagination
    }
  })
}
function openCouponModal(isNewStatus, item) {
  if (isNewStatus) {
    tempCoupon.value = {}
  } else {
    tempCoupon.value = { ...item }
  }
  isNew.value = isNewStatus
  couponModal.value.showModal()
}
function openDelCouponModal(item) {
  tempCoupon.value = item
  delModal.value.showModal()
}
function updateCoupon(item) {
  tempCoupon.value = item
  // 新增
  let api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/coupon`
  let httpMethod = 'post'
  // 編輯
  if (!isNew.value) {
    api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/coupon/${item.id}`
    httpMethod = 'put'
  }
  axios[httpMethod](api, { data: item }).then((res) => {
    getCoupons()
    couponModal.value.hideModal()
    pushMessage(res, httpMethod === 'post' ? '新增優惠券' : '修改優惠券')
  })
}
function delCoupon(item) {
  const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/coupon/${item.id}`
  axios.delete(api).then((res) => {
    getCoupons()
    delModal.value.hideModal()
    pushMessage(res, '刪除優惠券')
  })
}

getCoupons()
</script>

<style lang="scss" scoped>
th,
td {
  white-space: nowrap;
}
.btn:hover,
.btn:active {
  color: #ffffff;
}
</style>
