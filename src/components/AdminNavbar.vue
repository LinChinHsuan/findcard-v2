<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light border-bottom border-4 border-primary py-0 py-lg-2"
  >
    <span class="navbar-brand ps-3">
      <img src="../assets/images/logo.png" alt="logo" height="40" class="px-2" />
      <img src="../assets/images/findcard.png" alt="找。牌" height="24" />
    </span>
    <button
      class="navbar-toggler border-0 py-0 me-3"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
      @click="isCollapse = !isCollapse"
    >
      <span class="material-icons fs-2" :class="{ active: isCollapse }">menu</span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav" ref="navbarCollapse">
      <ul class="navbar-nav w-100">
        <li class="nav-item">
          <RouterLink
            to="products"
            class="nav-link fw-bold p-3"
            :class="{ active: status === 'adminProducts' }"
            >產品列表</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink
            to="orders"
            class="nav-link fw-bold p-3"
            :class="{ active: status === 'adminOrders' }"
            >訂單</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink
            to="coupons"
            class="nav-link fw-bold p-3"
            :class="{ active: status === 'adminCoupons' }"
            >優惠券</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink
            to="trivia"
            class="nav-link fw-bold p-3"
            :class="{ active: status === 'adminTrivia' }"
            >撲克冷知識</RouterLink
          >
        </li>
        <li class="nav-item ms-lg-auto">
          <RouterLink
            to="cart"
            class="nav-link fw-bold p-3"
            :class="{ active: status === 'adminCart' }"
            >模擬購物車</RouterLink
          >
        </li>
        <li class="nav-item">
          <a class="nav-link fw-bold p-3" href="#" @click.prevent="logout">登出</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import Collapse from 'bootstrap/js/dist/collapse'
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const navbarCollapse = ref(null)
let bsCollapse = null
const isCollapse = ref(false)
const status = ref('')

watch(() => route.name, (newName) => {
  if (document.body.offsetWidth < 992) {
    if (isCollapse.value) {
      bsCollapse.hide()
    }
  }
  status.value = newName
})

function logout() {
  const api = `${import.meta.env.VITE_APP_API}/logout`
  axios.post(api).then((res) => {
    if (res.data.success) {
      router.push('/login')
    }
  })
}

onMounted(() => {
  status.value = route.name

  bsCollapse = new Collapse(navbarCollapse.value, {
    toggle: false // 初始化時不要切換選單開關
  })
})
</script>

<style lang="scss" scoped>
.navbar-light .navbar-nav .nav-link {
  &.active,
  &:hover {
    color: #587778;
    @media (max-width: 992px) {
      background-color: #587778;
      color: #ffffff;
    }
  }
}
.navbar-toggler {
  &:focus {
    box-shadow: none;
  }
}
.material-icons {
  line-height: 40px;
  &.active {
    color: #587778;
  }
}
</style>
