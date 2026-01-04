<template>
  <h3 class="d-flex justify-content-center mt-5 mb-3">
    <span class="me-2 fs-1 fw-bolder">促銷商品</span>
    <span class="fs-3 text-primary align-self-end">/ On Sale</span>
  </h3>
  <div class="row g-4 pb-5">
    <div class="col-md-6 col-lg-4 col-xl-3" v-for="(item, index) in products" :key="item.id" :class="{'d-none d-xl-block': index === 3, 'd-none d-lg-block': index === 0}" @click="viewProduct(item.id)">
      <div class="bg-white border cursorPointer">
        <div class="overflow-hidden position-relative">
          <button class="btn fs-4 position-absolute text-white w-100 h-100 bg-dark bg-opacity-75" type="button">查看更多</button>
          <img class="img-fit" :src="item.imageUrl">
        </div>
        <div class="d-flex flex-column text-center pt-4 px-4 fw-bold">
          <span class="fs-5 mb-1">{{ item.title }}</span>
          <span class="fs-5">NT ${{ item.price }}
            <span class="text-muted text-decoration-line-through fs-6 ms-1">${{ item.origin_price }}</span>
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
</template>

<script>
import cartStore from '@/stores/cartStore'
import { mapState, mapActions } from 'pinia'
export default {
  data () {
    return {
      products: [
        {
          title: 'Cardistry-Con 2019',
          id: '-N-HexEVmkB61Cs9WAf8',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1650378822796.jpg',
          origin_price: 500,
          price: 400
        },
        {
          title: '加拿大國家公園紀念牌',
          id: '-N-HfxO4rb_sLZJ3Eg5o',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1650378716872.jpg',
          origin_price: 800,
          price: 680
        },
        {
          title: '紀念牌保護盒',
          id: '-N-HfkrNHQrf4OXk-1cf',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1650378774359.jpg',
          origin_price: 280,
          price: 200
        },
        {
          title: '經典單車牌（藍）',
          id: '-MzUqau2-81yrO0osEL9',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1650423229822.jpg',
          origin_price: 100,
          price: 65
        }
      ]
    }
  },
  computed: {
    ...mapState(cartStore, ['loadingItem'])
  },
  methods: {
    ...mapActions(cartStore, ['addCart']),
    viewProduct (id) {
      this.$router.push(`/product/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.img-fit{
  height: 250px;
  width: 100%;
  object-fit: cover;
  transition: .5s;
}
.cursorPointer{
  cursor: pointer;
  &:hover{
    .btn{
      opacity: 1;
    }
    img{
      transform: scale(1.15);
    }
    box-shadow:0 0 8px rgb(128, 209, 214, .2);
  }
}
.btn.bg-dark{
  z-index: 1;
  opacity: 0;
  transition: .5s;
}
</style>
