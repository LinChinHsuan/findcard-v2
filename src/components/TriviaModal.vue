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
            {{ tempTrivia.id ? '編輯' : '新增'
            }}{{ tempTrivia.category === '題目' ? '題目' : '冷知識' }}
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
                  v-model="tempTrivia.imageUrl"
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
              <img class="img-fluid" :src="tempTrivia.imageUrl" />
            </div>
            <div class="col-lg-8">
              <div class="mb-3">
                <input
                  ref="radioTrivia"
                  type="radio"
                  class="btn-check"
                  name="radioCategory"
                  id="radioTrivia"
                  autocomplete="off"
                  v-model="tempTrivia.category"
                  value="冷知識"
                  checked
                />
                <label class="btn btn-outline-primary" for="radioTrivia">冷知識</label>
                <input
                  ref="radioQuestion"
                  type="radio"
                  class="btn-check"
                  name="radioCategory"
                  id="radioQuestion"
                  autocomplete="off"
                  v-model="tempTrivia.category"
                  value="題目"
                />
                <label class="btn btn-outline-primary" for="radioQuestion">題目</label>
              </div>
              <div class="mb-3">
                <label for="author" class="form-label">作者</label>
                <input
                  type="text"
                  class="form-control"
                  id="author"
                  placeholder="請輸入姓名"
                  v-model="tempTrivia.author"
                />
              </div>
              <div v-if="tempTrivia.category === '冷知識'">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempTrivia.title"
                  />
                </div>
                <div class="mb-3">
                  <label for="explanation" class="form-label">文章內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="explanation"
                    placeholder="請輸入冷知識內容"
                    v-model="tempTrivia.explanation"
                  ></textarea>
                </div>
              </div>
              <div v-else>
                <div class="mb-3">
                  <label for="question" class="form-label">問題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="question"
                    placeholder="請輸入問題"
                    v-model="tempTrivia.question"
                  />
                </div>
                <div class="row">
                  <div class="col-6 mb-3">
                    <label for="optionA" class="form-label">答案A</label>
                    <input
                      type="text"
                      class="form-control"
                      id="optionA"
                      placeholder="請輸入答案A"
                      v-model="tempTrivia.optionA"
                    />
                  </div>
                  <div class="col-6 mb-3">
                    <label for="option2" class="form-label">答案2</label>
                    <input
                      type="text"
                      class="form-control"
                      id="optionB"
                      placeholder="請輸入答案B"
                      v-model="tempTrivia.optionB"
                    />
                  </div>
                  <div class="col-6 mb-3">
                    <label for="optionC" class="form-label">答案C</label>
                    <input
                      type="text"
                      class="form-control"
                      id="optionC"
                      placeholder="請輸入答案C"
                      v-model="tempTrivia.optionC"
                    />
                  </div>
                  <div class="col-6 mb-3">
                    <label for="optionD" class="form-label">答案D</label>
                    <input
                      type="text"
                      class="form-control"
                      id="optionD"
                      placeholder="請輸入答案D"
                      v-model="tempTrivia.optionD"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label w-100">正解</label>
                  <input
                    type="radio"
                    class="btn-check"
                    name="radioQuestionAnswer"
                    id="radioQuestionAnswerA"
                    autocomplete="off"
                    v-model="tempTrivia.answer"
                    value="A"
                    checked
                  />
                  <label class="btn btn-outline-primary" for="radioQuestionAnswerA">A</label>
                  <input
                    type="radio"
                    class="btn-check"
                    name="radioQuestionAnswer"
                    id="radioQuestionAnswerB"
                    autocomplete="off"
                    v-model="tempTrivia.answer"
                    value="B"
                  />
                  <label class="btn btn-outline-primary" for="radioQuestionAnswerB">B</label>
                  <input
                    type="radio"
                    class="btn-check"
                    name="radioQuestionAnswer"
                    id="radioQuestionAnswerC"
                    autocomplete="off"
                    v-model="tempTrivia.answer"
                    value="C"
                  />
                  <label class="btn btn-outline-primary" for="radioQuestionAnswerC">C</label>
                  <input
                    type="radio"
                    class="btn-check"
                    name="radioQuestionAnswer"
                    id="radioQuestionAnswerD"
                    autocomplete="off"
                    v-model="tempTrivia.answer"
                    value="D"
                  />
                  <label class="btn btn-outline-primary" for="radioQuestionAnswerD">D</label>
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="isPublic"
                    v-model="tempTrivia.isPublic"
                  />
                  <label class="form-check-label" for="isPublic">是否啟用</label>
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
            @click="$emit('updateTrivia', tempTrivia)"
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
  trivia: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['updateTrivia'])

const radioTrivia = ref(null)
const radioQuestion = ref(null)

const tempTrivia = ref({})
const isLoading = ref(false)
watch(() => props.trivia,
  (newVal) => {
    tempTrivia.value = JSON.parse(JSON.stringify(newVal))
    if (!tempTrivia.value.id) {
      tempTrivia.value = {
        category: '冷知識',
        create_at: Math.floor(new Date().getTime() / 1000),
        isPublic: false,
        content: '此API此欄不能為空',
        answer: 'A',
      }
    } else {
      tempTrivia.value.content = '此API此欄不能為空'
      if (tempTrivia.value.category === '冷知識') {
        radioQuestion.value.disabled = true
      } else {
        radioTrivia.value.disabled = true
      }
    }
  }
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
      tempTrivia.value.imageUrl = res.data.imageUrl
    }
    isLoading.value = false
  })
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
.btn:active,
.btn-check:checked + .btn-outline-primary {
  color: #ffffff;
}
</style>
