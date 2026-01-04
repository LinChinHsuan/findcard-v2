<template>
  <Loading :active="isLoading" />
  <div class="text-end pt-4">
    <button type="button" class="btn btn-primary fw-bold text-white" @click="openModal(true)">建立新的產品</button>
  </div>
  <div class="table-responsive">
    <table class="table my-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120" class="text-center">原價</th>
          <th width="120" class="text-center">售價</th>
          <th width="120" class="text-center">是否啟用</th>
          <th width="120" class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr class="align-middle" v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">{{ $filters.currency(item.origin_price) }}</td>
          <td class="text-end">{{ $filters.currency(item.price) }}</td>
          <td class="text-center">
            <span v-if="item.is_enabled" class="text-success fw-bold">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary fw-bold" type="button" @click="openModal(false,item)">編輯</button>
              <button class="btn btn-outline-danger fw-bold" type="button" @click="openDelModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination :pages="pagination" @emit-pages="getProducts" />
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct" />
  <DelModal ref="delModal" :item="tempProduct" @del-item="delProduct" />
</template>

<script>
import messageStore from '@/stores/messageStore'
import { mapActions } from 'pinia'
import ProductModal from '@/components/ProductModal.vue'
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    ProductModal,
    DelModal,
    Pagination
  },
  methods: {
    getProducts (page = 1) {
      const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/products?page=${page}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.products = res.data.products
          this.pagination = res.data.pagination
        }
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      this.$refs.productModal.showModal()
    },
    openDelModal (item) {
      this.tempProduct = item
      this.$refs.delModal.showModal()
    },
    updateProduct (item) {
      this.tempProduct = item
      // 新增
      let api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      // 編輯
      if (!this.isNew) {
        api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
        this.getProducts()
        this.$refs.productModal.hideModal()
        this.pushMessage(res, httpMethod === 'post' ? '新增商品' : '更新商品')
      })
    },
    delProduct (item) {
      const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/product/${item.id}`
      this.$http.delete(api).then((res) => {
        this.getProducts()
        this.$refs.delModal.hideModal()
        this.pushMessage(res, '刪除商品')
      })
    },
    ...mapActions(messageStore, ['pushMessage'])
  },
  created () {
    this.getProducts()
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
