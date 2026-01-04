<template>
  <div class="bg-light d-flex justify-content-center align-items-center vh-100" v-if="isLoading">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div class="bg-light pt-5">
    <div class="container pt-4">
      <nav class="d-none d-lg-block" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <RouterLink to="/">首頁</RouterLink>
          </li>
          <li class="breadcrumb-item">
            <RouterLink to="/products">產品列表</RouterLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ product.title}}</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-lg-5 col-xl-6 position-relative">
          <div v-if="!product.imageUrl" class="d-flex justify-content-center align-items-center h-100">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div v-else>
            <img :src="product.imageUrl" :alt="product.title" class="productImage w-100" v-if="!product.imagesUrl">
            <div ref="carousel" id="carouselIndicators" class="carousel slide" data-bs-ride="carousel" v-else>
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#carouselIndicators" :data-bs-slide-to="i" v-for="i in product.imagesUrl.length" :key="i"></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img :src="product.imageUrl" class="productImage d-block w-100" :alt="product.title">
                </div>
                <div class="carousel-item" v-for="item in product.imagesUrl" :key="item">
                  <img :src="item" class="productImage d-block w-100" :alt="product.title">
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
            <span class="cursorPointer material-icons position-absolute rounded-circle fs-4 p-2" :class="{'favorite': isFavorite(product.id)}" @click.stop="toggleFavorite(product)">favorite</span>
          </div>
        </div>
        <div class="col-lg-7 col-xl-6">
          <div class="d-flex flex-column justify-content-center h-100 px-lg-5">
            <h1 class="fs-1 fw-bold mt-5 mt-lg-0 mb-3">{{ product.title}}</h1>
            <p class="fs-5 fw-bold mb-2 pt-4 border-top">產品介紹</p>
            <p class="lh-lg mb-5 text-description">{{ product.description }}</p>
            <p class="mb-4">{{ product.content }}</p>
            <p class="fs-3 fw-bold text-end mb-0">NT ${{ product.price}} / 副
              <span class="fs-5 text-decoration-line-through text-muted" v-if="product.price !== product.origin_price">
                ${{ product.origin_price }}
              </span>
            </p>
            <div class="d-flex mt-5">
              <div class="d-flex align-items-center w-50 me-3">
                <span class="material-icons text-primary p-2 qtyCounter" @click="qtyAdjust(-1)">remove</span>
                <span class="flex-grow-1 text-center">{{ qty }}</span>
                <span class="material-icons text-primary p-2 qtyCounter" @click="qtyAdjust(1)">add</span>
              </div>
              <button class="btn btn-primary fw-bold text-white w-50" type="button" @click="addCart(product.id, qty)">
                <div class="spinner-border text-white spinner-border-sm" role="status" v-if="loadingItem === product.id">
                  <span class="visually-hidden">Loading...</span>
                </div>
                加入購物車
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

<script>
import favoriteStore from '@/stores/favoriteStore'
import cartStore from '@/stores/cartStore'
import { mapState, mapActions } from 'pinia'
import Carousel from 'bootstrap/js/dist/carousel'
import SectionOnSale from '@/components/SectionOnSale.vue'
import SectionBanner from '@/components/SectionBanner.vue'
import Footer from '@/components/Footer.vue'
export default {
  data () {
    return {
      carousel: {},
      product: {},
      qty: 1,
      isLoading: false,
      SectionCouponBanner: {
        bgImg: 'url(https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1758699281574.jpg)',
        title: '周年慶優惠券',
        titleEn: 'Coupon',
        text: '尚未領取周年慶優惠大獎嗎？快來翻出你的專屬優惠券',
        btnText: '手刀領取',
        btnPath: '/coupon'
      }
    }
  },
  computed: {
    ...mapState(cartStore, ['loadingItem'])
  },
  components: {
    SectionOnSale,
    SectionBanner,
    Footer
  },
  watch: {
    $route () {
      this.getProduct()
    }
  },
  methods: {
    getProduct () {
      this.isLoading = true
      const id = this.$route.params.id
      const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/product/${id}`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.product = res.data.product
        }
      })
    },
    qtyAdjust (num) {
      if (num === 1) {
        this.qty += 1
      } else if (this.qty === 1) {
        this.qty = 1
      } else {
        this.qty -= 1
      }
    },
    ...mapActions(favoriteStore, ['getFavorite', 'isFavorite', 'toggleFavorite']),
    ...mapActions(cartStore, ['addCart'])
  },
  created () {
    this.getProduct()
    this.getFavorite()
  },
  mounted () {
    this.carousel = new Carousel(this.$refs.carousel)
  }
}
</script>

<style lang="scss">
.cursorPointer.material-icons{
  cursor: pointer;
  transition: .3s;
  top: 10px;
  right: 22px;
  background-color: rgb(255, 255, 255, .3);
  color: #dee2e6;
  z-index: 2;
  &:hover{
    img{
      transform: scale(1.15);
    }
    box-shadow:0 0 8px rgb(128, 209, 214, .2);
    color: #FF5959;
  }
  &.favorite {
    color: #FF5959;
  }
}
.qtyCounter{
  cursor: pointer;
  &:hover{
    background-color: #e9ecef;
  }
}
img{
  object-fit: cover;
}
.productImage{
  height: 500px;
  @media (max-width: 992px) {
    height: 350px;
  }
  @media (max-width: 768px) {
    height: 250px;
  }
}
.carousel-indicators [data-bs-target]{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #587778;
}
.text-description{
  text-indent: 2em;
  text-align: justify;
}
</style>
