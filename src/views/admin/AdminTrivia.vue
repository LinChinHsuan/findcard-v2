<template>
  <Loading :active="isLoading" />
  <div class="text-end pt-4">
    <button type="button" class="btn btn-primary fw-bold text-white" @click="openModal(true)">建立新的冷知識</button>
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
        <tr class="align-middle" v-for="item in Trivia" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.category === "冷知識" ? item.title : item.question }}</td>
          <td>{{ $filters.date(item.create_at) }}</td>
          <td class="text-center">
            <span v-if="item.isPublic" class="text-success fw-bold">啟用</span>
            <span v-else class="text-muted">未起用</span>
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
  <Pagination :pages="pagination" @emit-pages="getTrivia" />
  <TriviaModal ref="triviaModal" :trivia="tempTrivia" @update-trivia="updateTrivia" />
  <DelModal ref="delModal" :item="tempTrivia" @del-item="delTrivia" />
</template>

<script>
import messageStore from '@/stores/messageStore'
import { mapActions } from 'pinia'
import TriviaModal from '@/components/TriviaModal.vue'
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/Pagination.vue'
export default {
  data () {
    return {
      Trivia: {},
      tempTrivia: {},
      pagination: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    TriviaModal,
    DelModal,
    Pagination
  },
  methods: {
    getTrivia (page = 1) {
      const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/articles?page=${page}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.Trivia = res.data.articles
          this.pagination = res.data.pagination
        }
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempTrivia = {}
      } else {
        this.tempTrivia = { ...item }
      }
      this.isNew = isNew
      this.$refs.triviaModal.showModal()
    },
    openDelModal (item) {
      this.tempTrivia = item
      this.$refs.delModal.showModal()
    },
    updateTrivia (item) {
      this.$refs.triviaModal.hideModal()
      this.tempTrivia = item
      // 判斷是冷知識還是題目
      if (this.tempTrivia.category === '題目') {
        this.tempTrivia.title = this.tempTrivia.question
      }
      // 新增
      let api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/article`
      let httpMethod = 'post'
      // 編輯
      if (!this.isNew) {
        api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/article/${item.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: this.tempTrivia }).then((res) => {
        this.getTrivia()
        const category = this.tempTrivia.category === '冷知識' ? '冷知識' : '題目'
        this.pushMessage(res, httpMethod === 'post' ? `新增${category}` : `更新${category}`)
      })
    },
    delTrivia (item) {
      const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/article/${item.id}`
      this.$http.delete(api).then((res) => {
        this.getTrivia()
        this.$refs.delModal.hideModal()
        this.pushMessage(res, '刪除冷知識')
      })
    },
    ...mapActions(messageStore, ['pushMessage'])
  },
  created () {
    this.getTrivia()
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
