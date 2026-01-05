<template>
  <div class="container-fliud banner">
    <div class="bg-dark bg-opacity-75 w-100 h-100 d-flex align-items-center">
      <h1 class="w-100 d-flex align-items-center justify-content-center mb-0 mt-5">
        <span class="me-2 fs-1 fw-bolder text-white">關注商品</span>
        <span class="fs-3 text-primary align-self-end">/ Favorite</span>
      </h1>
    </div>
  </div>
  <div class="bg-light">
    <div class="container-fliud" v-if="favorite.length === 0">
      <div
        class="d-flex flex-column justify-content-center align-items-center text-secondary vh-remain"
      >
        <span class="material-icons mb-3">production_quantity_limits</span>
        <p class="fs-5 fw-bold mb-5">目前沒有收藏任何商品</p>
        <RouterLink
          to="products"
          type="button"
          class="btn btn-primary fs-5 fw-bold text-white mt-3 px-4 py-3"
          >瀏覽商品</RouterLink
        >
      </div>
    </div>
    <div class="container pt-5">
      <div class="row gx-4 justify-content-center" v-if="favorite.length !== 0">
        <div
          class="col-md-6 col-lg-4 mb-3"
          v-for="item in favorite"
          :key="item.id"
          @click="viewProduct(item.id)"
        >
          <div class="bg-white border cursorPointer">
            <div class="overflow-hidden position-relative">
              <button
                class="btn fs-4 position-absolute text-white w-100 h-100 bg-dark bg-opacity-75"
                type="button"
              >
                查看更多
              </button>
              <img class="img-fit" :src="item.imageUrl" />
            </div>
            <div class="d-flex pt-4 px-4 fw-bold">
              <span class="">{{ item.title }}</span>
              <span class="ms-auto">NT${{ item.price }}</span>
            </div>
            <div class="d-flex p-4">
              <button
                type="button"
                class="btn btn-outline-secondary fw-bold w-50 me-2"
                @click.stop="removeFavorite(item)"
              >
                移除收藏
              </button>
              <button
                type="button"
                class="btn btn-primary fw-bold text-white w-50"
                @click.stop="addCart(item.id)"
              >
                <div
                  class="spinner-border text-white spinner-border-sm"
                  role="status"
                  v-if="loadingItem === item.id"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                加到購物車
              </button>
            </div>
          </div>
        </div>
      </div>
      <SectionOnSale />
    </div>
  </div>
  <SectionBanner :info="SectionCouponBanner" />
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SectionOnSale from '@/components/SectionOnSale.vue'
import SectionBanner from '@/components/SectionBanner.vue'
import Footer from '@/components/Footer.vue'

import favoriteStore from '@/stores/favoriteStore'
import cartStore from '@/stores/cartStore'
import { storeToRefs } from 'pinia'
const favStore = favoriteStore()
const cStore = cartStore()
const { favorite } = storeToRefs(favStore)
const { loadingItem } = storeToRefs(cStore)
const { getFavorite, removeFavorite } = favStore
const { addCart } = cStore

const router = useRouter()

const SectionCouponBanner = ref({
  bgImg:
    'url(https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1758699281574.jpg)',
  title: '周年慶優惠券',
  titleEn: 'Coupon',
  text: '尚未領取周年慶優惠大獎嗎？快來翻出你的專屬優惠券',
  btnText: '手刀領取',
  btnPath: '/coupon',
})

function viewProduct(id) {
  router.push(`/product/${id}`)
}

getFavorite()
</script>

<style lang="scss" scoped>
.banner {
  height: 300px;
  background-image: url('https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1650378758414.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media (max-width: 768px) {
    height: 250px;
  }
  @media (max-width: 576px) {
    height: 200px;
  }
}
.vh-remain {
  min-height: calc(100vh - 300px);
}
.material-icons {
  font-size: 64px;
}
.img-fit {
  height: 250px;
  width: 100%;
  object-fit: cover;
  transition: 0.5s;
}
.cursorPointer {
  cursor: pointer;
  &:hover {
    .btn {
      opacity: 1;
    }
    img {
      transform: scale(1.15);
    }
    box-shadow: 0 0 8px rgb(128, 209, 214, 0.2);
  }
}
.btn.bg-dark {
  z-index: 1;
  opacity: 0;
  transition: 0.5s;
}
</style>
