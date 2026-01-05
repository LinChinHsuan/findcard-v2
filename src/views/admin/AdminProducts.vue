<template>
  <Loading :active="isLoading" />
  <div class="text-end pt-4">
    <button type="button" class="btn btn-primary fw-bold text-white" @click="openModal(true)">
      建立新的產品
    </button>
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
              <button
                class="btn btn-outline-primary fw-bold"
                type="button"
                @click="openModal(false, item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger fw-bold"
                type="button"
                @click="openDelModal(item)"
              >
                刪除
              </button>
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

<script setup>
import ProductModal from '@/components/ProductModal.vue'
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/Pagination.vue'
import { ref } from 'vue'
import axios from 'axios'

import messageStore from '@/stores/messageStore'
const mStore = messageStore()
const { pushMessage } = mStore

const productModal = ref(null)
const delModal = ref(null)

const products = ref([])
const pagination = ref({})
const tempProduct = ref({})
const isNew = ref(false)
const isLoading = ref(false)

function getProducts(page = 1) {
  const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/products?page=${page}`
  isLoading.value = true
  axios.get(api).then((res) => {
    isLoading.value = false
    if (res.data.success) {
      products.value = res.data.products
      pagination.value = res.data.pagination
    }
  })
}
function updateProduct(item) {
  tempProduct.value = item
  // 新增
  let api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/product`
  let httpMethod = 'post'
  // 編輯
  if (!isNew.value) {
    api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/product/${item.id}`
    httpMethod = 'put'
  }
  axios[httpMethod](api, { data: tempProduct.value }).then((res) => {
    getProducts()
    productModal.value.hideModal()
    pushMessage(res, httpMethod === 'post' ? '新增商品' : '更新商品')
  })
}
function delProduct(item) {
  const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/product/${item.id}`
  axios.delete(api).then((res) => {
    getProducts()
    delModal.value.hideModal()
    pushMessage(res, '刪除商品')
  })
}

function openModal(isNewStatus, item) {
  if (isNewStatus) {
    tempProduct.value = {}
  } else {
    tempProduct.value = { ...item }
  }
  isNew.value = isNewStatus
  productModal.value.showModal()
}
function openDelModal(item) {
  tempProduct.value = item
  delModal.value.showModal()
}
getProducts()
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
