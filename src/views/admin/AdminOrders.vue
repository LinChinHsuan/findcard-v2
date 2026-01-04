<template>
  <Loading :active="isLoading" />
  <div class="table-responsive">
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th width="120" class="text-center">應付金額</th>
          <th width="160" class="text-center">是否付款</th>
          <th width="120" class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in orders" :key="item.id">
          <tr class="align-middle">
            <td>{{ $filters.date(item.create_at) }}</td>
            <td>{{ item.user.email }}</td>
            <td>
              <ul class="list-unstyled mb-0">
                <li v-for="(product, i) in item.products" :key="i" class="d-flex">
                  <span>{{ product.product.title }}</span>
                  <span class="ms-auto">數量：{{ product.qty }} {{ product.product.unit }}</span>
                </li>
              </ul>
            </td>
            <td class="text-end">{{ $filters.currency(item.total) }}</td>
            <td>
              <div class="form-check form-switch d-flex justify-content-center">
                <input class="form-check-input me-2" type="checkbox" role="switch" :id="item.id" :checked="item.is_paid" v-model="item.is_paid" @change="updateOrder(item)">
                <label class="form-check-label" :for="item.id">
                  <span v-if="item.is_paid" class="text-success fw-bold">已付款</span>
                  <span v-else class="text-muted">未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button class="btn btn-outline-primary fw-bold" type="button" @click="openOrderModal(item)">檢視</button>
                <button class="btn btn-outline-danger fw-bold" type="button" @click="openDelModal(item)">刪除</button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <OrderModal ref="orderModal" :order="tempOrder" @update-order="updateOrder" />
  <DelModal :item="tempOrder" ref="delModal" @del-item="delOrder" />
  <Pagination :pages="pagination" @emit-pages="getOrders" />
</template>

<script>
import messageStore from '@/stores/messageStore'
import { mapActions } from 'pinia'
import OrderModal from '@/components/OrderModal.vue'
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/Pagination.vue'
export default {
  data () {
    return {
      orders: {},
      pagination: {},
      tempOrder: {},
      isLoading: false
    }
  },
  components: {
    OrderModal,
    DelModal,
    Pagination
  },
  methods: {
    getOrders (page = 1) {
      const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/orders?page=${page}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
        }
      })
    },
    openOrderModal (item) {
      this.tempOrder = { ...item }
      this.$refs.orderModal.showModal()
    },
    openDelModal (item) {
      this.tempOrder = { ...item }
      this.tempOrder.title = `${item.user.name}的訂單`
      this.$refs.delModal.showModal()
    },
    updateOrder (item) {
      const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/order/${item.id}`
      item.paid_date = new Date().getTime() / 1000
      this.$http.put(api, { data: item }).then((res) => {
        this.getOrders()
        this.$refs.orderModal.hideModal()
        this.pushMessage(res, '更新訂單')
      })
    },
    delOrder () {
      const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/order/${this.tempOrder.id}`
      this.$http.delete(api).then((res) => {
        this.getOrders()
        this.$refs.delModal.hideModal()
        this.pushMessage(res, '刪除訂單')
      })
    },
    ...mapActions(messageStore, ['pushMessage'])
  },
  created () {
    this.getOrders()
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
