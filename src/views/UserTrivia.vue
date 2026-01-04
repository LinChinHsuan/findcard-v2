<template>
  <div class="bg-light">
    <div class="d-flex justify-content-center align-items-center vh-100" v-if="isLoading">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="container py-5" v-else>
      <h3 class="d-flex justify-content-center mb-4">
        <span class="me-2 fs-1 fw-bolder">你知道嗎？</span>
        <span class="fs-3 text-primary align-self-end">/ Do you know?</span>
      </h3>
      <div class="row">
        <div class="col-lg-5 col-xl-6">
          <div class="w-100 h-100">
            <div
              class="d-none d-lg-block w-100 h-100 bg-cover"
              :style="{ 'background-image': 'url(' + nowTrivia.imageUrl + ')' }"
            ></div>
            <img
              :src="nowTrivia.imageUrl"
              :alt="nowTrivia.title"
              height="300"
              class="d-block d-lg-none w-100"
            />
          </div>
        </div>
        <div class="col-lg-7 col-xl-6">
          <div class="d-flex flex-column justify-content-center h-100 p-5 bg-white">
            <h1 class="fs-2 fw-bold mb-3">{{ nowTrivia.title }}</h1>
            <p class="mb-1 pt-3 pt-lg-5 border-top">說明：</p>
            <p class="lh-lg mb-3 text-indent">{{ nowTrivia.explanation }}</p>
            <button
              class="btn btn-primary btn-lg text-white fw-bold mt-3 mt-lg-auto"
              type="button"
              @click="nextTrivia"
            >
              下則冷知識
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SectionBanner :info="SectionCouponBanner" />
</template>

<script setup>
import SectionBanner from '@/components/SectionBanner.vue'
import { ref } from 'vue'
import axios from 'axios'

const trivia = ref([])
const nowTrivia = ref({})
const nowTriviaIndex = ref(0)
const isLoading = ref(false)
function getTrivia(page = 1) {
  isLoading.value = true
  const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/articles?page=${page}`
  axios.get(api).then((res) => {
    if (res.data.success) {
      const triviaData = res.data.articles
      triviaData.forEach((item) => {
        if (item.category === '冷知識') {
          trivia.value.push(item)
        }
      })
    }
    nowTrivia.value = trivia.value[0]
    isLoading.value = false
  })
}
getTrivia()

function nextTrivia() {
  if (nowTriviaIndex.value !== trivia.value.length - 1) {
    nowTriviaIndex.value += 1
  } else {
    nowTriviaIndex.value = 0
  }
  nowTrivia.value = trivia.value[nowTriviaIndex.value]
}

const SectionCouponBanner = ref({
  bgImg:
    'url(https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1758699725944.jpg)',
  title: '冷知識大考驗',
  titleEn: 'Challenge',
  text: '快來參加撲克牌冷知識大考驗，最大獎可獲得半價優惠券！',
  btnText: '立刻參加',
  btnPath: '/trivia/triviaChallenge',
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
</style>
