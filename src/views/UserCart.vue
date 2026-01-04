<template>
  <div class="container-fliud banner" v-if="step === 0">
    <div class="bg-dark bg-opacity-75 w-100 h-100 d-flex align-items-center">
      <h1 class="w-100 d-flex align-items-center justify-content-center mb-0 mt-5">
        <span class="me-2 fs-1 fw-bolder text-white">購物車</span>
        <span class="fs-3 text-primary align-self-end">/ Cart</span>
      </h1>
    </div>
  </div>
  <div class="container-fluid bg-light pt-5" v-else>
    <div class="row">
      <div class="d-none d-lg-block col-lg-10 col-xl-8 mx-auto">
        <div class="d-flex mt-5" v-if="step !== 0">
          <h1
            class="flex-grow-1 d-flex align-items-end justify-content-center mb-0"
            :class="{ active: step === 1, inactive: step !== 1 }"
          >
            <span class="me-2 fw-bolder">1. 填寫資訊</span>
            <span>/ Fill In</span>
          </h1>
          <h1
            class="flex-grow-1 d-flex align-items-end justify-content-center mb-0"
            :class="{ active: step === 2, inactive: step !== 2 }"
          >
            <span class="me-2 fw-bolder">2. 確認訂單</span>
            <span>/ Confirm</span>
          </h1>
          <h1
            class="flex-grow-1 d-flex align-items-end justify-content-center mb-0"
            :class="{ active: step === 3, inactive: step !== 3 }"
          >
            <span class="me-2 fw-bolder">3. 完成訂單</span>
            <span>/ Checkout</span>
          </h1>
        </div>
      </div>
      <div class="d-lg-none col-12">
        <div class="d-flex justify-content-center mt-5" v-if="step !== 0">
          <h1
            class="d-flex align-items-center justify-content-center mb-0"
            :class="{ active: step === 1, 'd-none': step !== 1 }"
          >
            <span class="me-2 fw-bolder">1. 填寫資訊</span>
            <span class="align-self-end">/ Fill In</span>
          </h1>
          <h1
            class="d-flex align-items-center justify-content-center mb-0"
            :class="{ active: step === 2, 'd-none': step !== 2 }"
          >
            <span class="me-2 fw-bolder">2. 確認訂單</span>
            <span class="align-self-end">/ Confirm</span>
          </h1>
          <h1
            class="d-flex align-items-center justify-content-center mb-0"
            :class="{ active: step === 3, 'd-none': step !== 3 }"
          >
            <span class="me-2 fw-bolder">3. 完成訂單</span>
            <span class="align-self-end">/ Checkout</span>
          </h1>
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-center align-items-center bg-light vh-100" v-if="isLoading">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div class="bg-light" v-else>
    <div class="py-sm-5 vh-remain">
      <template v-if="step === 0">
        <div
          class="d-flex flex-column justify-content-center align-items-center text-secondary vh-remain"
          v-if="!cart.carts.length"
        >
          <span class="material-icons cart mb-3">production_quantity_limits</span>
          <p class="fs-5 fw-bold mb-5">目前購物車沒有任何商品</p>
          <RouterLink
            to="/products"
            type="button"
            class="btn btn-primary fs-5 fw-bold text-white mt-3 px-4 py-3"
            >瀏覽商品</RouterLink
          >
        </div>
        <template v-else>
          <div class="container d-none d-md-block">
            <div class="row">
              <div class="col-lg-10 col-xl-8 mx-auto">
                <h3 class="fs-5 text-center border-bottom pb-3">購物清單</h3>
                <table class="table table-borderless align-middle mt-3">
                  <tr>
                    <th width="60">刪除</th>
                    <th class="text-center">商品</th>
                    <th class="text-center d-none d-lg-table-cell">單價</th>
                    <th class="text-center" width="150">數量</th>
                    <th class="text-end px-0" width="120">總計</th>
                  </tr>
                  <tr v-for="item in cart.carts" :key="item.id">
                    <td>
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-sm border border-danger p-2 d-flex align-items-center"
                        @click="delCartModal(item)"
                      >
                        <span class="material-icons"> delete_outline </span>
                      </button>
                    </td>
                    <td class="d-flex align-items-center px-0">
                      <img
                        :src="item.product.imageUrl"
                        class="productImg"
                        :alt="item.product.title"
                      />
                      <span class="ms-3 p-0">{{ item.product.title }}</span>
                    </td>
                    <td class="d-none d-lg-table-cell text-center">${{ item.product.price }}</td>
                    <td>
                      <div class="d-flex align-items-center">
                        <span
                          class="material-icons text-primary p-2 qtyCounter"
                          @click="qtyAdjust(item, -1)"
                          >remove</span
                        >
                        <span class="flex-grow-1 text-center">{{ item.qty }}</span>
                        <span
                          class="material-icons text-primary p-2 qtyCounter"
                          @click="qtyAdjust(item, 1)"
                          >add</span
                        >
                      </div>
                    </td>
                    <td class="text-end px-0" :class="{ 'text-success': item.coupon }">
                      <small class="text-success p-0" v-if="item.coupon">折扣價：</small>
                      ${{ parseInt(item.final_total) }}
                    </td>
                  </tr>
                </table>
                <div class="input-group pb-4">
                  <button class="btn btn-outline-danger me-5" type="button" @click="delCartModal()">
                    清空購物車
                  </button>
                  <div class="w-50 d-flex ms-auto">
                    <input
                      type="text"
                      class="form-control rounded-0"
                      placeholder="請輸入優惠碼"
                      v-model="coupon"
                    />
                    <button
                      class="btn btn-outline-primary fw-bold"
                      type="button"
                      @click="useCoupon"
                    >
                      套用優惠碼
                    </button>
                  </div>
                </div>
                <table class="table table-borderless fw-bold mb-4">
                  <tr>
                    <td class="px-0 pb-0">運費</td>
                    <td class="text-end px-0 pb-0">NT$ 0</td>
                  </tr>
                  <tr v-if="cart.total === cart.final_total">
                    <td class="px-0">總金額</td>
                    <td class="text-end">NT$ {{ cart.total }}</td>
                  </tr>
                  <tr v-else>
                    <td class="text-success px-0">折扣後總價</td>
                    <td class="text-end text-success">NT$ {{ parseInt(cart.final_total) }}</td>
                  </tr>
                </table>
                <div class="text-end">
                  <button
                    type="button"
                    class="btn btn-primary btn-lg text-white fw-bold"
                    @click="step = 1"
                  >
                    確認結帳
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="d-md-none px-3 py-5 py-sm-0">
            <h3 class="fs-5 text-center border-bottom pb-3">購物清單</h3>
            <table class="table table-borderless align-middle mt-3">
              <tr>
                <th class="text-center pb-2" width="60">刪除</th>
                <th class="text-center">商品</th>
                <th class="text-center">數量</th>
                <th class="text-end px-0 d-none d-sm-table-cell" width="120">總計</th>
              </tr>
              <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm border border-danger ms-2 p-2 d-flex align-items-center"
                    @click="delCartModal(item)"
                  >
                    <span class="material-icons"> delete_outline </span>
                  </button>
                </td>
                <td class="d-flex align-items-center px-0">
                  <img
                    :src="item.product.imageUrl"
                    class="d-none d-sm-block productImg px-0 me-2"
                    :alt="item.product.title"
                  />
                  <span class="white-space-wrap p-2">{{ item.product.title }}</span>
                </td>
                <td class="d-flex align-items-center p-0">
                  <!-- <div> -->
                  <span
                    class="material-icons text-primary p-2 qtyCounter"
                    @click="qtyAdjust(item, -1)"
                    >remove</span
                  >
                  <span class="flex-grow-1 text-center p-2">{{ item.qty }}</span>
                  <span
                    class="material-icons text-primary p-2 qtyCounter"
                    @click="qtyAdjust(item, 1)"
                    >add</span
                  >
                  <!-- </div> -->
                </td>
                <td
                  class="text-end px-0 d-none d-sm-table-cell"
                  :class="{ 'text-success': item.coupon }"
                >
                  <small class="text-success p-0" v-if="item.coupon">折扣價：</small>
                  ${{ parseInt(item.final_total) }}
                </td>
              </tr>
            </table>
            <div class="input-group pb-4">
              <button
                class="d-none d-sm-block btn btn-outline-danger me-2 me-sm-5"
                type="button"
                @click="delCartModal()"
              >
                清空購物車
              </button>
              <input
                type="text"
                class="form-control rounded-0"
                placeholder="請輸入優惠碼"
                v-model="coupon"
              />
              <button class="btn btn-outline-primary fw-bold" type="button" @click="useCoupon">
                套用優惠碼
              </button>
            </div>
            <table class="table table-borderless fw-bold">
              <tr>
                <td class="px-0 pb-0">運費</td>
                <td class="text-end px-0 pb-0">NT$ 0</td>
              </tr>
              <tr v-if="cart.total === cart.final_total">
                <td class="px-0">總金額</td>
                <td class="text-end">NT$ {{ cart.total }}</td>
              </tr>
              <tr v-else>
                <td class="text-success px-0">折扣價</td>
                <td class="text-end text-success">NT$ {{ parseInt(cart.final_total) }}</td>
              </tr>
            </table>
            <div class="text-end">
              <button
                type="button"
                class="btn btn-primary btn-lg text-white fw-bold"
                @click="step = 1"
              >
                確認結帳
              </button>
            </div>
          </div>
        </template>
      </template>
      <template v-if="step !== 0">
        <div class="container">
          <div class="row">
            <template v-if="step === 1">
              <div class="d-none d-lg-block col-6">
                <h3 class="fs-5 text-center border-bottom pb-3">清單明細</h3>
                <table class="table table-borderless align-middle mt-3">
                  <tr>
                    <th class="text-center">商品</th>
                    <th class="text-center">數量</th>
                    <th class="text-end px-0">總計</th>
                  </tr>
                  <tr v-for="item in cart.carts" :key="item.id">
                    <td class="d-flex align-items-center px-0">
                      <img
                        :src="item.product.imageUrl"
                        class="productImg"
                        :alt="item.product.title"
                      />
                      <span class="ms-3 p-0">{{ item.product.title }}</span>
                    </td>
                    <td class="text-center">
                      {{ item.qty }}
                    </td>
                    <td class="text-end px-0" :class="{ 'text-success': item.coupon }">
                      <small class="text-success p-0" v-if="item.coupon">折扣價：</small>
                      ${{ parseInt(item.final_total) }}
                    </td>
                  </tr>
                </table>
                <table class="table table-borderless fw-bold mb-4">
                  <tr>
                    <td class="px-0 pb-0">運費</td>
                    <td class="text-end px-0 pb-0">NT$ 0</td>
                  </tr>
                  <tr v-if="cart.total === cart.final_total">
                    <td class="px-0">總金額</td>
                    <td class="text-end">NT$ {{ cart.total }}</td>
                  </tr>
                  <tr v-else>
                    <td class="text-success px-0">折扣後總價</td>
                    <td class="text-end text-success">NT$ {{ parseInt(cart.final_total) }}</td>
                  </tr>
                </table>
              </div>
              <div class="col-lg-6 py-4 py-sm-0">
                <h3 class="fs-5 text-center border-bottom pb-3">顧客資訊</h3>
                <VForm class="mt-3" v-slot="{ errors }" @submit="createOrder">
                  <div class="form-floating mb-3">
                    <VField
                      id="email"
                      name="email"
                      type="email"
                      class="form-control"
                      :class="{ 'is-invalid': errors['email'] }"
                      placeholder="請輸入 Email"
                      rules="email|required"
                      v-model="form.user.email"
                    ></VField>
                    <label for="email" class="form-label">Email*</label>
                    <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="form-floating mb-3">
                    <VField
                      id="name"
                      name="姓名"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['姓名'] }"
                      placeholder="請輸入姓名"
                      rules="required"
                      v-model="form.user.name"
                    ></VField>
                    <label for="name" class="form-label">收件人姓名*</label>
                    <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="form-floating mb-3">
                    <VField
                      id="tel"
                      name="電話"
                      type="tel"
                      class="form-control"
                      :class="{ 'is-invalid': errors['電話'] }"
                      placeholder="請輸入電話"
                      rules="required"
                      v-model="form.user.tel"
                    ></VField>
                    <label for="tel" class="form-label">收件人電話*</label>
                    <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="form-floating mb-3">
                    <VField
                      id="address"
                      name="地址"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['地址'] }"
                      placeholder="請輸入地址"
                      rules="required"
                      v-model="form.user.address"
                    ></VField>
                    <label for="address" class="form-label">收件人地址*</label>
                    <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="form-floating mb-3">
                    <textarea
                      class="form-control"
                      id="ps"
                      placeholder="備註留言"
                      style="height: 150px"
                      v-model="form.message"
                    ></textarea>
                    <label for="ps">備註</label>
                  </div>
                  <div class="text-end">
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg w-100 fw-bold text-white"
                      :disabled="!isFillIn"
                      @submit="createOrder"
                    >
                      <div
                        class="spinner-border text-white spinner-border-sm"
                        role="status"
                        v-if="isOrderLoading"
                      >
                        <span class="visually-hidden">Loading...</span>
                      </div>
                      送出訂單
                    </button>
                  </div>
                </VForm>
              </div>
            </template>
            <template v-if="step === 2">
              <div class="col-lg-8 col-xl-6 mx-auto py-4 py-sm-0">
                <h3 class="fs-5 text-center border-bottom pb-3">訂單資訊</h3>
                <div class="accordion my-3" id="accordionExample">
                  <div class="accordion-item rounded-0">
                    <h2 class="accordion-header" id="headingOne">
                      <button
                        class="accordion-button collapsed rounded-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                      >
                        商品列表
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <table class="table align-middle">
                          <thead>
                            <tr>
                              <th class="fw-normal p-2">品名</th>
                              <th class="fw-normal p-2">數量</th>
                              <th class="fw-normal p-2">單價</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in order.products" :key="item.id">
                              <td>{{ item.product.title }}</td>
                              <td>{{ item.qty }} / {{ item.product.unit }}</td>
                              <td class="text-end">{{ item.total }}</td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colspan="2" class="text-end">總計</td>
                              <td class="text-end">{{ order.total }}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <table class="table table-hover">
                  <tbody>
                    <tr>
                      <th width="120">訂單編號</th>
                      <td>{{ order.id }}</td>
                    </tr>
                    <tr>
                      <th width="150">Email</th>
                      <td>{{ order.user.email }}</td>
                    </tr>
                    <tr>
                      <th>姓名</th>
                      <td>{{ order.user.name }}</td>
                    </tr>
                    <tr>
                      <th>收件人電話</th>
                      <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr>
                      <th>收件人地址</th>
                      <td>{{ order.user.address }}</td>
                    </tr>
                    <tr>
                      <th>備註</th>
                      <td>{{ order.message }}</td>
                    </tr>
                    <tr>
                      <th>付款狀態</th>
                      <td>
                        <span class="text-muted">尚未付款</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p class="text-end mt-3">訂單成立時間：{{ $filters.date(order.create_at) }}</p>
                <div class="text-end">
                  <button
                    class="btn btn-primary fs-5 text-white fw-bold w-100 py-3"
                    type="button"
                    @click="payOrder"
                  >
                    確認付款
                  </button>
                </div>
              </div>
            </template>
            <template v-if="step === 3">
              <div class="col-md-10 col-xl-8 mx-auto py-4 py-sm-0">
                <div class="bg-white d-flex flex-column text-center p-4 p-sm-5">
                  <span class="material-icons checkCircle text-primary mb-3">check_circle</span>
                  <p class="fs-2 fw-bold mb-4 mb-sm-5">付款成功</p>
                  <p class="mb-0">感謝您的訂購</p>
                  <p class="mb-0">商品預計於三個工作天內寄送（不含週休及國定例假日）</p>
                  <p class="mb-3">再請留意簡訊通知及配送人員的電話</p>
                  <RouterLink
                    to="/products"
                    class="btn btn-primary fs-5 text-white fw-bold w-100 py-3"
                    >回去購物</RouterLink
                  >
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import cartStore from '@/stores/cartStore'
import Footer from '@/components/Footer.vue'
import { ref, reactive, watch, onMounted, inject } from 'vue'
import { storeToRefs } from 'pinia'
import axios from 'axios'

const store = cartStore()
const { cart, isLoading } = storeToRefs(store)
const { getCart, delCartProduct, delAllCartProducts } = store

const swal = inject('$swal')

// 頁面狀態
const step = ref(0)
const coupon = ref('')
const isOrderLoading = ref(false)
const orderId = ref('')
const order = ref({ products: [] })

// 表單
const isFillIn = ref(false)
const form = reactive({
  user: {
    name: '',
    email: '',
    tel: '',
    address: '',
  },
  message: '',
})
watch(
  () => form.user,
  (n) => {
    if (n.address && n.tel && n.email && n.name) {
      isFillIn.value = true
    } else {
      isFillIn.value = false
    }
  },
  { deep: true },
)

function delCartModal(item) {
  if (item) {
    swal({
      toast: false,
      timer: undefined,
      timerProgressBar: false,
      position: 'center',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#587778',
      confirmButtonText: '刪除',
      cancelButtonText: '取消',
      title: `是否刪除${item.product.title}？`,
      text: '一旦刪除便無法復原',
      width: '34rem',
    }).then((result) => {
      if (result.isConfirmed) {
        delCartProduct(item.id)
      }
    })
  } else {
    swal({
      toast: false,
      timer: undefined,
      timerProgressBar: false,
      position: 'center',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#587778',
      confirmButtonText: '刪除',
      cancelButtonText: '取消',
      title: '是否刪除全部商品？',
      text: '一旦刪除便無法復原',
      width: '25rem',
    }).then((result) => {
      if (result.isConfirmed) {
        delAllCartProducts()
      }
    })
  }
}
function qtyAdjust(item, i) {
  if (item.qty === 1 && i === -1) {
    return
  }
  item.qty += i
  const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/cart/${item.id}`
  axios.put(api, { data: { product_id: item.id, qty: item.qty } }).then(() => {
    getCart()
  })
}
function useCoupon() {
  const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/coupon`
  axios.post(api, { data: { code: coupon.value } }).then((res) => {
    if (res.data.success) {
      getCart()
      swal({
        title: '已套用優惠券',
        width: '15rem',
      })
      coupon.value = ''
    } else if (coupon.value === '') {
      swal({
        icon: 'info',
        title: '請輸入優惠券',
        width: '16rem',
      })
    } else {
      swal({
        icon: 'error',
        iconColor: '#FF5959',
        title: '無此優惠券',
        width: '14rem',
      })
    }
  })
}
function createOrder() {
  isLoading.value = true
  const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/order`
  const order = form
  axios.post(api, { data: order }).then((res) => {
    orderId.value = res.data.orderId
    getOrder(orderId.value)
    step.value = 2
    getCart()
  })
}
function getOrder(id) {
  const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/order/${id}`
  axios.get(api).then((res) => {
    order.value = res.data.order
  })
}
function payOrder() {
  const id = orderId.value
  const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/pay/${id}`
  axios.post(api).then(() => {
    step.value = 3
  })
}

getCart()
</script>

<style lang="scss" scoped>
.banner {
  height: 300px;
  background-image: url('https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1650378681038.jpg');
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
  @media (max-width: 768px) {
    min-height: calc(100vh - 330px);
  }
  @media (max-width: 576px) {
    min-height: calc(100vh - 280px);
  }
  @media (max-width: 418px) {
    min-height: calc(100vh - 304px);
  }
}
.material-icons.cart {
  font-size: 64px;
}
th,
td,
.btn {
  white-space: nowrap;
}
.white-space-wrap {
  white-space: pre-wrap;
}
.productImg {
  width: 100px;
  height: 100px;
  object-fit: cover;
  @media (max-width: 425px) {
    display: none;
  }
}
.qtyCounter {
  cursor: pointer;
  &:hover {
    background-color: #e9ecef;
  }
}
.btn:hover,
.btn:active {
  color: #ffffff;
}
.accordion-button {
  background-color: #ffffff;
  color: #212529;
}
.accordion-item .table > :not(:first-child) {
  border-top: 1px solid currentColor;
}
.active {
  :first-child {
    font-size: 2.5rem;
    @media (max-width: 424px) {
      font-size: 2rem;
    }
  }
  :last-child {
    font-size: 1.75rem;
    color: #587778;
    @media (max-width: 424px) {
      font-size: 1.5rem;
    }
  }
}
.inactive {
  span {
    color: #6c757d;
  }
  :first-child {
    font-size: 1rem;
  }
  :last-child {
    font-size: 0.75rem;
  }
}
.material-icons.checkCircle {
  font-size: 80px;
}
</style>
