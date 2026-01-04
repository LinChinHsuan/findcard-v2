<template>
  <div class="bg-light d-flex justify-content-center align-items-center vh-100" v-if="isLoading">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div class="container-fliud productBanner">
    <div class="bg-dark bg-opacity-50 w-100 h-100 d-flex align-items-center">
      <h1 class="w-100 d-flex align-items-center justify-content-center mb-0 mt-5">
        <span class="me-2 fs-1 fw-bolder text-white">所有商品</span>
        <span class="fs-3 text-primary align-self-end">/ All Product</span>
      </h1>
    </div>
  </div>
  <div class="container-fluid bg-light py-4 py-xl-5">
    <div class="container">
      <div class="list-group list-group-flush flex-row justify-content-center flex-wrap flex-md-nowrap fs-5 mb-3 mb-xl-4">
        <button type="button"
          class="list-group-item list-group-item-action border-0 p-sm-3 px-md-4 py-3 fs-5 fw-bold text-center" :class="{'active': category === 'all' }"
          @click="category = 'all'">
          所有商品<sup class="fw-normal d-none d-md-inline">{{ products.length }}</sup>
        </button>
        <button type="button"
          class="list-group-item list-group-item-action border-0 p-sm-3 px-md-4 py-3 fs-5 fw-bold text-center" :class="{'active': category === 'onSale' }"
          @click="category = 'onSale'">
          活動促銷<sup class="fw-normal d-none d-md-inline">4</sup>
        </button>
        <button type="button"
          class="list-group-item list-group-item-action border-0 p-sm-3 px-md-4 py-3 fs-5 fw-bold text-center" :class="{'active': category === 'memorial' }"
          @click="category = 'memorial'">
          紀念牌<sup class="fw-normal d-none d-md-inline">5</sup>
        </button>
        <button type="button"
          class="list-group-item list-group-item-action border-0 p-sm-3 px-md-4 py-3 fs-5 fw-bold text-center" :class="{'active': category === 'bicycle' }"
          @click="category = 'bicycle'">
          經典單車牌<sup class="fw-normal d-none d-md-inline">3</sup>
        </button>
        <button type="button"
          class="d-none d-md-block list-group-item list-group-item-action border-0 p-sm-3 px-md-4 py-3 fs-5 fw-bold text-center" :class="{'active': category === 'other' }"
          @click="category = 'other'">
          其他<sup class="fw-normal d-none d-md-inline">4</sup>
        </button>
      </div>
      <div class="row mb-3">
        <div class="col-xl-10 mx-auto">
          <div class="row">
            <div class="col-md-6 col-lg-4 mb-3" v-for="item in filterProducts" :key="item.id">
              <div class="bg-white border cursorPointer" @click="viewProduct(item.id)">
                <div class="overflow-hidden position-relative">
                  <img class="img-fit" :src="item.imageUrl">
                  <span class="material-icons position-absolute rounded-circle fs-4 p-2" :class="{'favorite': isFavorite(item.id)}" @click.stop="toggleFavorite(item)">favorite</span>
                </div>
                <div class="d-flex flex-column text-center pt-4 px-4 fw-bold">
                  <span class="fs-5 mb-1">{{ item.title }}</span>
                  <span class="fs-5">NT ${{ $filters.currency(item.price) }}
                  <span class="text-muted text-decoration-line-through fs-6 ms-1" v-if="item.price !== item.origin_price">${{ $filters.currency(item.origin_price) }}</span>
                  </span>
                </div>
                <div class="p-4">
                  <button type="button" class="btn btn-primary fw-bold text-white w-100" @click.stop="addCart(item.id)">
                    <div class="spinner-border text-white spinner-border-sm" role="status" v-if="loadingItem === item.id">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    加到購物車
                  </button>
                </div>
              </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SectionBanner :info="SectionCouponBanner" />
  <Footer />
</template>

<script>
import favoriteStore from '@/stores/favoriteStore'
import cartStore from '@/stores/cartStore'
import { mapState, mapActions } from 'pinia'
import SectionBanner from '@/components/SectionBanner.vue'
import Footer from '@/components/Footer.vue'
export default {
  data () {
    return {
      products: [],
      category: 'all',
      isLoading: false,
      SectionCouponBanner: {
        bgImg: 'url(https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1758699281574.jpg)',
        title: '周年慶優惠券',
        titleEn: 'Coupon',
        text: '尚未領取周年慶優惠大獎嗎？快來翻出你的專屬優惠券',
        btnText: '手刀領取',
        btnPath: 'coupon'
      }
    }
  },
  components: {
    SectionBanner,
    Footer
  },
  methods: {
    getProducts () {
      this.isLoading = true
      const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/products/all`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.products = res.data.products.reverse()
        }
      })
    },
    viewProduct (id) {
      this.$router.push(`/product/${id}`)
    },
    ...mapActions(favoriteStore, ['getFavorite', 'isFavorite', 'toggleFavorite']),
    ...mapActions(cartStore, ['addCart'])
  },
  computed: {
    filterProducts () {
      let filterProducts
      switch (this.category) {
        case 'all':
          filterProducts = this.products.filter((item) => {
            return item
          })
          break
        case 'onSale':
          filterProducts = this.products.filter((item) => {
            return item.price !== item.origin_price
          })
          break
        case 'memorial':
          filterProducts = this.products.filter((item) => {
            return item.category === '紀念牌'
          })
          break
        case 'bicycle':
          filterProducts = this.products.filter((item) => {
            return item.category === '經典單車牌'
          })
          break
        case 'other':
          filterProducts = this.products.filter((item) => {
            return item.category === '其他'
          })
          break
      }
      return filterProducts
    },
    ...mapState(cartStore, ['loadingItem'])
  },
  created () {
    this.getProducts()
    this.getFavorite()
  }
}
</script>

<style lang="scss" scoped>
sup{
  top: -.65rem;
  left: .1rem;
}
.productBanner {
  height: 300px;
  background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1758699281574.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media (max-width:768px) {
    height: 250px;
  }
  @media (max-width:576px) {
    height: 200px;
  }
}
.list-group-flush > .list-group-item {
  white-space: nowrap;
  width: auto;
  transition: .7s;
  background-color: transparent;
  color: #587778;
  &:hover,&:focus,&.active {
    color: #ffffff;
    box-shadow: inset 0 0 0 3em #587778;
  }
  @media(max-width: 768px){
    flex-grow: 1;
  }
  @media(max-width: 576px){
    flex-grow: 0;
    width: 50%;
  }
}
.list-group-item + .list-group-item.active{
  margin-top: 0;
}
.img-fit{
  height: 250px;
  width: 100%;
  object-fit: cover;
  transition: .5s;
}
.cursorPointer{
  cursor: pointer;
  &:hover{
    img{
      transform: scale(1.15);
    }
    box-shadow:0 0 8px rgb(128, 209, 214, .2);
  }
  .material-icons {
    transition: .3s;
    top: 8px;
    right: 8px;
    background-color: rgb(255, 255, 255, .3);
    color: #dee2e6;
    &:hover,&.favorite {
      color: #FF5959;
    }
  }
}
</style>
