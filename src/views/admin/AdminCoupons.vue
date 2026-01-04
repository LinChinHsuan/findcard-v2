<template>
  <div>
    <Loading :active="isLoading" />
    <div class="text-end mt-4">
      <button class="btn btn-primary fw-bold text-white" type="button" @click="openCouponModal(true)">
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
                <button class="btn btn-outline-primary fw-bold" type="button" @click="openCouponModal(false, item)">編輯</button>
                <button class="btn btn-outline-danger fw-bold" type="button" @click="openDelCouponModal(item)">刪除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :pages="pagination" @emit-pages="getCoupons" />
    <couponModal  ref="couponModal" :coupon="tempCoupon" @update-coupon="updateCoupon"/>
    <DelModal ref="delModal" :item="tempCoupon" @del-item="delCoupon"/>
  </div>
</template>

<script>
import messageStore from '@/stores/messageStore'
import { mapActions } from 'pinia'
import CouponModal from '@/components/CouponModal.vue'
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      coupons: {},
      pagination: {},
      tempCoupon: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    CouponModal,
    DelModal,
    Pagination
  },
  inject: ['emitter'],
  methods: {
    getCoupons (page = 1) {
      const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/coupons?page=${page}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
        }
      })
    },
    openCouponModal (isNew, item) {
      if (isNew) {
        this.tempCoupon = {}
      } else {
        this.tempCoupon = { ...item }
      }
      this.isNew = isNew
      this.$refs.couponModal.showModal()
    },
    openDelCouponModal (item) {
      this.tempCoupon = item
      this.$refs.delModal.showModal()
    },
    updateCoupon (item) {
      this.tempCoupon = item
      // 新增
      let api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/coupon`
      let httpMethod = 'post'
      // 編輯
      if (!this.isNew) {
        api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/coupon/${item.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: this.tempCoupon }).then((res) => {
        this.getCoupons()
        this.$refs.couponModal.hideModal()
        this.pushMessage(res, httpMethod === 'post' ? '新增優惠券' : '修改優惠券')
      })
    },
    delCoupon (item) {
      const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/coupon/${item.id}`
      this.$http.delete(api).then((res) => {
        this.getCoupons()
        this.$refs.delModal.hideModal()
        this.pushMessage(res, '刪除優惠券')
      })
    },
    ...mapActions(messageStore, ['pushMessage'])
  },
  created () {
    this.getCoupons()
  }
}
</script>

<style lang="scss" scoped>
th,td{
  white-space: nowrap;
}
.btn:hover,.btn:active{
  color: #FFFFFF;
}
</style>
