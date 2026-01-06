<template>
  <Loading :active="isLoading" />
  <div class="text-end pt-4">
    <button type="button" class="btn btn-primary fw-bold text-white" @click="openModal(true)">
      建立新的冷知識
    </button>
  </div>
  <div class="table-responsive">
    <table class="table my-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th width="120">作者</th>
          <th>標題</th>
          <th width="120">建立時間</th>
          <th width="120" class="text-center">是否啟用</th>
          <th width="120" class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr class="align-middle" v-for="item in triviaList" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.category === '冷知識' ? item.title : item.question }}</td>
          <td>{{ $filters.date(item.create_at) }}</td>
          <td class="text-center">
            <span v-if="item.isPublic" class="text-success fw-bold">啟用</span>
            <span v-else class="text-muted">未起用</span>
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
  <Pagination :pages="pagination" @emit-pages="getTrivia" />
  <TriviaModal ref="triviaModal" :trivia="tempTrivia" @update-trivia="updateTrivia" />
  <DelModal ref="delModal" :item="tempTrivia" @del-item="delTrivia" />
</template>

<script setup>
import TriviaModal from '@/components/TriviaModal.vue'
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/Pagination.vue'
import { ref } from 'vue'
import axios from 'axios'

import messageStore from '@/stores/messageStore'
const mStore = messageStore()
const { pushMessage } = mStore

const triviaModal = ref(null)
const delModal = ref(null)

const triviaList = ref([])
const tempTrivia = ref({})
const pagination = ref({})
const isNew = ref(false)
const isLoading = ref(false)

function getTrivia(page = 1) {
  const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/articles?page=${page}`
  isLoading.value = true
  axios.get(api).then((res) => {
    isLoading.value = false
    if (res.data.success) {
      triviaList.value = res.data.articles
      pagination.value = res.data.pagination
    }
  })
}
function updateTrivia(item) {
  triviaModal.value.hideModal()
  tempTrivia.value = item
  // 判斷是冷知識還是題目
  if (tempTrivia.value.category === '題目') {
    tempTrivia.value.title = tempTrivia.value.question
  }
  // 新增
  let api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/article`
  let httpMethod = 'post'
  // 編輯
  if (!isNew.value) {
    api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/article/${item.id}`
    httpMethod = 'put'
  }
  axios[httpMethod](api, { data: item }).then((res) => {
    getTrivia()
    const category = tempTrivia.value.category === '冷知識' ? '冷知識' : '題目'
    pushMessage(res, httpMethod === 'post' ? `新增${category}` : `更新${category}`)
  })
}
function delTrivia(item) {
  const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/article/${item.id}`
  axios.delete(api).then((res) => {
    getTrivia()
    delModal.value.hideModal()
    pushMessage(res, '刪除冷知識')
  })
}

function openModal(isNewStatus, item) {
  if (isNewStatus) {
    tempTrivia.value = {}
  } else {
    tempTrivia.value = { ...item }
  }
  isNew.value = isNewStatus
  triviaModal.value.showModal()
}
function openDelModal(item) {
  tempTrivia.value = item
  delModal.value.showModal()
}

getTrivia()
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
