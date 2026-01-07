import { createApp } from 'vue'
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import axios from 'axios'

// Vee-validate
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { currency, date } from '@/methods/filters'

// 定義驗證規則
defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
})
// 設定預設語系
setLocale('zh_TW')

const app = createApp(App)

app.config.globalProperties.$filters = { currency, date }

// pinia
const pinia = createPinia()
app.use(pinia)

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
app.use(VueSweetalert2, options)

app.use(router)

axios.interceptors.request.use((config) => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)findcardCookie\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  )
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// 註冊元件
app.component('Loading', Loading)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)

app.mount('#app')
