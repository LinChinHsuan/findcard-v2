<template>
  <div class="bg-light">
    <div class="d-flex justify-content-center align-items-center vh-100" v-if="isLoading">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="container py-5" v-else>
      <h3 class="d-flex justify-content-center mb-4">
        <span class="me-2 fs-1 fw-bolder">冷知識大考驗</span>
        <span class="fs-3 text-primary align-self-end">/ Challenge</span>
      </h3>
      <div class="row" v-if="!answered">
        <div class="col-lg-5 col-xl-6">
          <div class="w-100 h-100">
            <div
              class="d-none d-lg-block w-100 h-100 bg-cover"
              :style="{ 'background-image': `url(${nowQuestion.imageUrl})` }"
            ></div>
            <img
              :src="nowQuestion.imageUrl"
              :alt="nowQuestion.title"
              height="300"
              class="d-block d-lg-none w-100"
            />
          </div>
        </div>
        <div class="col-lg-7 col-xl-6 position-relative">
          <div class="d-flex flex-column justify-content-center h-100 p-5 bg-white">
            <h1 class="fs-2 fw-bold text-center mb-3 mb-lg-5">
              {{ nowQuestion.title }}
            </h1>
            <div class="d-flex flex-column mb-5">
              <button
                type="button"
                class="btn btn-outline-primary fw-bold mb-2"
                :class="{ choose: nowAnswer === 'A' }"
                @click="answer('A')"
              >
                {{ nowQuestion.optionA }}
              </button>
              <button
                type="button"
                class="btn btn-outline-primary fw-bold mb-2"
                :class="{ choose: nowAnswer === 'B' }"
                @click="answer('B')"
              >
                {{ nowQuestion.optionB }}
              </button>
              <button
                type="button"
                class="btn btn-outline-primary fw-bold mb-2"
                :class="{ choose: nowAnswer === 'C' }"
                @click="answer('C')"
              >
                {{ nowQuestion.optionC }}
              </button>
              <button
                type="button"
                class="btn btn-outline-primary fw-bold"
                :class="{ choose: nowAnswer === 'D' }"
                @click="answer('D')"
              >
                {{ nowQuestion.optionD }}
              </button>
            </div>
            <div class="position-relative">
              <p class="text-center text-muted py-2 mb-0 mt-lg-auto">
                {{ nowQuestionIndex + 1 }} / {{ questions.length }}
              </p>
              <div class="position-absolute bottom-0 end-0">
                <button
                  type="button"
                  class="btn btn-outline-primary fw-bold"
                  @click="nextQuestion"
                  v-if="nowAnswer && nowQuestionIndex !== 4"
                >
                  下一題
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary fw-bold"
                  @click="checkAnswers"
                  v-if="nowAnswer && nowQuestionIndex === 4"
                >
                  檢查答案
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row">
          <div class="col-lg-5 col-xl-6">
            <div class="w-100 h-100">
              <div
                class="d-none d-lg-block w-100 h-100 bg-cover"
                :style="{
                  'background-image':
                    'url(https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1758699027858.jpg)',
                }"
              ></div>
              <img
                src="https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1758699027858.jpg"
                height="300"
                class="d-block d-lg-none w-100"
              />
            </div>
          </div>
          <div class="col-lg-7 col-xl-6">
            <div class="h-100 p-5 bg-white text-center">
              <span class="material-icons checkCircle text-primary mb-3">check_circle</span>
              <p class="fs-5 mb-5">
                你的分數 {{ score }} / {{ answers.length }} ({{
                  (score / answers.length) * 100
                }}%)
              </p>
              <p class="mb-0">恭喜獲得冷知識大考驗{{ coupon.percent }}優惠券</p>
              <p class="mb-0">
                折扣碼: <span class="fw-bold">{{ coupon.couponCode }}</span>
              </p>
              <p class="mb-3">已可在結帳頁使用</p>
              <RouterLink
                to="/cart"
                class="btn btn-primary btn-lg border-2 fw-bold text-white"
                type="button"
                >立刻使用</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SectionBanner :info="SectionCouponBanner" />
</template>

<script setup>
import SectionBanner from '@/components/SectionBanner.vue'
import { ref, computed } from 'vue'
import axios from 'axios'

const answered = ref(false)
const questions = ref([])
const answers = ref([])
const isLoading = ref(false)
const nowQuestionIndex = ref(0)
const nowQuestion = computed(() => {
  return questions.value[nowQuestionIndex.value] || {}
})
function getQuestions(page = 1) {
  isLoading.value = true
  const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/articles?page=${page}`
  axios.get(api).then((res) => {
    if (res.data.success) {
      const triviaData = res.data.articles
      triviaData.forEach((item) => {
        if (item.category === '題目') {
          questions.value.push(item)
          answers.value.push(item.answer)
        }
      })
    }
    isLoading.value = false
  })
}
getQuestions()

const userAnswers = ref([])
const nowAnswer = ref('')
function answer(option) {
  nowAnswer.value = option
}
function nextQuestion() {
  userAnswers.value.push(nowAnswer.value)
  nowAnswer.value = ''
  nowQuestionIndex.value += 1
}
const score = ref(0)
const coupon = ref({
  percent: 0,
  couponCode: '',
  score: 0,
})
function checkAnswers() {
  userAnswers.value.push(nowAnswer.value)
  nowAnswer.value = ''
  userAnswers.value.forEach((item, i) => {
    if (item === answers.value[i]) {
      score.value += 1
    }
  })
  coupon.value.score = score.value
  if (score.value === 5) {
    coupon.value.percent = '五折'
    coupon.value.couponCode = '100points'
  } else if (score.value > 1) {
    coupon.value.percent = '七折'
    coupon.value.couponCode = 'card30off'
  } else {
    coupon.value.percent = '八五折'
    coupon.value.couponCode = 'card15off'
  }
  answered.value = true
  localStorage.setItem('ChallengeCoupon', JSON.stringify(coupon.value))
}
answered.value = JSON.parse(localStorage.getItem('ChallengeCoupon')) || false
if (answered.value) {
  coupon.value = answered.value
  score.value = answered.value.score
}

const SectionCouponBanner = ref({
  bgImg:
    'url(https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1758699281574.jpg)',
  title: '周年慶優惠券',
  titleEn: 'Coupon',
  text: '尚未領取周年慶優惠大獎嗎？快來翻出你的專屬優惠券',
  btnText: '手刀領取',
  btnPath: '/coupon',
})
</script>

<style lang="scss" scoped>
.text-indent {
  text-indent: 2em;
}
.bg-cover {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
img {
  object-fit: cover;
}
.btn-outline-primary:hover,
.choose {
  background-color: #587778;
  color: #ffffff;
}
.checkCircle {
  font-size: 80px;
}
</style>
