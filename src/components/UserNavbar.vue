<template>
  <nav class="navbar navbar-expand-lg navbar-light p-0 bg-white position-fixed top-0 w-100">
    <a class="navbar-brand" href="#">
      <img src="../assets/images/logo.png" alt="logo" height="40" class="px-2">
      <img src="../assets/images/findcard.png" alt="找。牌" height="24">
    </a>
    <button class="navbar-toggler border-0 me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" ref="navbarBtn" @click="isCollapse = !isCollapse">
      <span class="material-icons fs-2" :class="{ 'active': isCollapse }">menu</span>
    </button>
    <div class="collapse navbar-collapse pt-2 pt-lg-0" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link fw-bold px-4 px-lg-3 py-3" :class="{ 'active':  status === 'home' }">首頁</RouterLink>
        </li>
         <li class="nav-item">
          <RouterLink to="/products" class="nav-link fw-bold px-4 px-lg-3 py-3" :class="{ 'active':  status === 'products' }">產品列表</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/coupon" class="nav-link fw-bold px-4 px-lg-3 py-3" :class="{ 'active':  status === 'coupon' }">優惠活動</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/trivia" class="nav-link fw-bold px-4 px-lg-3 py-3" :class="{ 'active':  status === 'trivia' }">撲克冷知識</RouterLink>
        </li>
        <li class="d-block d-lg-none nav-item">
          <RouterLink to="/cart" class="nav-link fw-bold px-4 px-lg-3 py-3" :class="{ 'active':  status === 'cart' }">購物車</RouterLink>
        </li>
        <li class="d-block d-lg-none nav-item">
          <RouterLink to="/favorite" class="nav-link fw-bold px-4 px-lg-3 py-3" :class="{ 'active':  status === 'favorite' }">關注商品</RouterLink>
        </li>
        <li class="d-block d-lg-none nav-item">
          <RouterLink to="/login" class="nav-link fw-bold px-4 px-lg-3 py-3" :class="{ 'active':  status === 'login' }">後台登入</RouterLink>
        </li>
      </ul>
      <ul class="d-none d-lg-flex navbar-nav ms-auto me-2">
        <li class="nav-item position-relative">
          <RouterLink to="/cart" class="nav-link px-3" :class="{ 'active':  status === 'cart' }">
            <span class="material-icons">shopping_cart</span>
            <div class="bg-danger text-white rounded-circle text-center position-absolute num" v-if="cartNum !== 0">
              {{ cartNum }}
            </div>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/favorite" class="nav-link px-3" :class="{ 'active':  status === 'favorite' }">
            <span class="material-icons">favorite</span>
            <div class="bg-danger text-white rounded-circle text-center position-absolute num" v-if="favoriteNum !== 0">
              {{ favoriteNum }}
            </div>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/login" class="nav-link px-3" :class="{ 'active':  status === 'login' }">
            <span class="material-icons">manage_accounts</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import 'bootstrap/js/dist/collapse'
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import favoriteStore from '@/stores/favoriteStore'
import cartStore from '@/stores/cartStore'

const route = useRoute()
const favStore = favoriteStore()
const cStore = cartStore()
const { getFavorite } = favStore
const { getCart } = cStore
const { favoriteNum } = storeToRefs(favStore)
const { cartNum } = storeToRefs(cStore)

const isCollapse = ref(false)
const status = ref('')
const navbarBtn = ref(null)
watch(route, (n)=>{
  if (document.body.offsetWidth < 992) {
    if (isCollapse.value) {
      navbarBtn.value.click()
    }
  }
  status.value = n.name
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }
})

onMounted(() => {
  getCart()
  getFavorite()
  status.value = route.name
})
</script>

<style lang="scss" scoped>
.navbar{
  z-index: 3;
}
.navbar-light .navbar-nav .nav-link {
  position: relative;
  &::after{
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 0%;
    background-color: #587778;
    transition: width .3s ease;
  }
  &.active,&:hover {
    color: #587778;
    &::after{
      width: 100%;
    }
    @media(max-width:992px) {
      background-color: #587778;
      color: #ffffff;
      &::after{
        width: 0;
      }
    }
  }
}
.material-icons{
  line-height: 40px;
}
.navbar-toggler{
  &:focus{
    box-shadow: none;
  }
  .material-icons{
    &.active{
      color: #587778;
    }
  }
}
.num{
  width:20px;
  line-height: 20px;
  top: 8px;
  right: 8px;
  font-size: 12px;
}
</style>
