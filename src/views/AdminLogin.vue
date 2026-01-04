<template>
  <div class="bg-light vh-100">
    <div class="container h-100 py-5">
      <div class="row h-100 flex-nowrap flex-column justify-content-center">
        <div class="col-12">
          <h1 class="d-flex align-items-center justify-content-center mt-3 mb-4">
            <span class="me-2 fs-1 fw-bolder">管理員登入</span>
            <span class="fs-4 text-primary align-self-end">/ Login</span>
          </h1>
        </div>
        <div class="col-10 col-sm-8 col-md-6 col-xl-4 mx-auto">
          <p class="fs-4 mt-4 mb-3 font-weight-normal text-center">請輸入帳號密碼</p>
          <div class="form-floating">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              v-model="user.username"
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control border-top-0"
              id="floatingPassword"
              placeholder="Password"
              v-model="user.password"
            />
            <label for="floatingPassword">Password</label>
          </div>
          <button
            class="btn btn-primary text-white fs-5 fw-bold w-100 my-4 py-2"
            type="button"
            @click="signin"
          >
            登入
          </button>
        </div>
      </div>
    </div>
  </div>
  <Footer class="position-fixed bottom-0 w-100" />
</template>

<script setup>
import Footer from '@/components/Footer.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const user = ref({
  username: '',
  password: '',
})
function signin() {
  const api = `${import.meta.env.VITE_APP_API}/admin/signin`
  axios.post(api, user.value).then((res) => {
    if (res.data.success) {
      const { token, expired } = res.data
      document.cookie = `findcardCookie=${token}; expires=${new Date(expired)};`
      router.push('/admin/products')
    }
  })
}
</script>
