<template>
  <div
    ref="modal"
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="ProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title fw-bold" id="ProductModalLabel">
            {{ tempProduct.id ? '編輯產品' : '新增產品' }}
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-lg-4">
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  placeholder="請輸入圖片連結"
                  v-model="tempProduct.imageUrl"
                />
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label">或 上傳圖片</label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  ref="fileInput"
                  @change="uploadFile"
                />
              </div>
              <div class="text-center" v-if="isLoading">
                <div class="spinner-border text-primary mt-5" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <img class="img-fluid" :alt="tempProduct.title" :src="tempProduct.imageUrl" />
              <div
                class="mt-4"
                v-if="Array.isArray(tempProduct.imagesUrl) && tempProduct.imagesUrl.length !== 0"
              >
                <span class="form-label mb-1">多圖新增</span>
                <div
                  class="input-group mb-3"
                  v-for="(item, index) in tempProduct.imagesUrl"
                  :key="item"
                >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imagesUrl[index]"
                  />
                  <button
                    class="btn btn-outline-danger"
                    type="button"
                    @click="tempProduct.imagesUrl.splice(index, 1)"
                  >
                    刪除
                  </button>
                  <img class="img-fluid mt-2" :src="item" />
                </div>
                <div>
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    type="button"
                    v-if="
                      tempProduct.imagesUrl.length <= 4 &&
                      tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                    "
                    @click="tempProduct.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
              </div>
              <button
                class="btn btn-outline-primary btn-sm d-block w-100 mt-3"
                type="button"
                v-else
                @click="createImages"
              >
                新增多圖
              </button>
            </div>
            <div class="col-lg-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入標題"
                  v-model="tempProduct.title"
                />
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    type="text"
                    class="form-control"
                    id="category"
                    placeholder="請輸入分類"
                    v-model="tempProduct.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    type="text"
                    class="form-control"
                    id="unit"
                    placeholder="請輸入單位"
                    v-model="tempProduct.unit"
                  />
                </div>
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="origin_price"
                    placeholder="請輸入原價"
                    v-model="tempProduct.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    placeholder="請輸入售價"
                    v-model="tempProduct.price"
                  />
                </div>
              </div>
              <hr />
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  placeholder="請輸入產品描述"
                  v-model="tempProduct.description"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="content"
                  placeholder="請輸入產品說明內容"
                  v-model="tempProduct.content"
                ></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"
                    v-model="tempProduct.is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
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
            @click="$emit('updateProduct', tempProduct)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import Modal from 'bootstrap/js/dist/modal'
import axios from 'axios'

const props = defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
})

const tempProduct = ref({})
const isLoading = ref(false)
watch(
  () => props.product,
  () => {
    tempProduct.value = JSON.parse(JSON.stringify(props.product))
  },
)

const fileInput = ref(null)
function uploadFile() {
  isLoading.value = true
  const uploadFile = fileInput.value.files[0]
  const formData = new FormData()
  formData.append('file-to-upload', uploadFile)
  const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/admin/upload`
  axios.post(api, formData).then((res) => {
    if (res.data.success) {
      tempProduct.value.imageUrl = res.data.imageUrl
    }
    isLoading.value = false
  })
}
function createImages() {
  tempProduct.value.imagesUrl = ['']
}

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

<style lang="scss" scoped>
.btn:hover,
.btn:active {
  color: #ffffff;
}
</style>
