import { createRouter, createWebHashHistory } from 'vue-router'
import Swal from 'sweetalert2'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/UserBoard.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/UserHome.vue'),
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/UserProducts.vue'),
      },
      {
        path: 'product/:id',
        name: 'product',
        component: () => import('../views/UserProduct.vue'),
      },
      {
        path: 'trivia',
        name: 'triviaBoard',
        component: () => import('../views/UserTriviaBoard.vue'),
        children: [
          {
            path: '',
            name: 'trivia',
            component: () => import('../views/UserTrivia.vue'),
          },
          {
            path: 'triviaChallenge',
            name: 'triviaChallenge',
            component: () => import('../views/UserTriviaChallenge.vue'),
          },
        ],
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('../views/UserCoupon.vue'),
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/UserCart.vue'),
      },
      {
        path: 'favorite',
        name: 'favorite',
        component: () => import('../views/UserFavorite.vue'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/AdminLogin.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/AdminDashboard.vue'),
    beforeEnter: (to, from, next) => {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)findcardCookie\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      )

      if (token) {
        next()
      } else {
        Swal.fire({
          title: '請先登入管理員帳號',
          width: '24rem',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          icon: 'error',
          iconColor: '#FF5959',
        })
        next('/login')
      }
    },
    children: [
      {
        path: 'products',
        name: 'adminProducts',
        component: () => import('../views/admin/AdminProducts.vue'),
      },
      {
        path: 'orders',
        name: 'adminOrders',
        component: () => import('../views/admin/AdminOrders.vue'),
      },
      {
        path: 'coupons',
        name: 'adminCoupons',
        component: () => import('../views/admin/AdminCoupons.vue'),
      },
      {
        path: 'trivia',
        name: 'adminTrivia',
        component: () => import('../views/admin/AdminTrivia.vue'),
      },
      {
        path: 'cart',
        name: 'adminCart',
        component: () => import('../views/admin/AdminCart.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404Page',
    component: () => import('../views/404Page.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

export default router
