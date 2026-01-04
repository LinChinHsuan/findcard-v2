import { ref } from 'vue'
import { defineStore } from 'pinia'
import useMessageStore from './messageStore'
import axios from 'axios'
import Swal from 'sweetalert2'
const options = {
  toast: true,
  width: '17rem',
  position: 'top',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  icon: 'success',
  iconColor: '#587778',
}

export default defineStore('cartStore', () => {
  const cart = ref({
    carts: [],
  })
  const cartNum = ref(0)
  const isLoading = ref(false)
  const loadingItem = ref('')

  function getCart() {
    isLoading.value = true
    const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/cart`
    axios.get(api).then((res) => {
      if (res.data.success) {
        cart.value = res.data.data
        cartNum.value = res.data.data.carts.length
      }
      isLoading.value = false
    })
  }
  function addCart(id, qty = 1, isAdmin) {
    loadingItem.value = id
    const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/cart`
    axios.post(api, { data: { product_id: id, qty } }).then((res) => {
      if (isAdmin) {
        const messageStore = useMessageStore()
        messageStore.pushMessage(res, '加入購物車')
      } else {
        Swal.fire({
          title: '商品已加入購物車',
          ...options,
        })
      }
      loadingItem.value = ''
      getCart()
    })
  }
  function delCartProduct(id) {
    const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/cart/${id}`
    axios.delete(api).then(() => {
      getCart()
    })
  }
  function delAllCartProducts() {
    const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/carts`
    axios.delete(api).then(() => {
      getCart()
    })
  }

  return {
    cart,
    cartNum,
    isLoading,
    loadingItem,
    getCart,
    addCart,
    delCartProduct,
    delAllCartProducts
  }
})
