<template>
  <div class="heroBanner position-relative">
    <div class="row h-100 g-0">
      <div class="col-lg-6 h-100 position-absolute slogan">
        <div class="h-100 d-flex flex-column justify-content-center text-white">
          <h1 class="text-center mt-5 mb-4">
            <span class="d-none">找。牌</span>
            <img src="../assets/images/findcardWhite.png" alt="找。牌" width="200">
          </h1>
          <p class="fs-4 text-center mx-auto mb-0">「魔術師為觀眾找牌，我們替您找牌。」</p>
          <RouterLink to="products" type="button" class="btn btn-outline-light btn-lg fw-bold border-2 px-4 mt-5 align-self-center">瀏覽商品</RouterLink>
        </div>
      </div>
      <div class="col-lg-6 ms-auto h-100">
        <img src="https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1758699027858.jpg" alt="找。牌" class="w-100 h-100 img-fit">
      </div>
      <div class="userScroll d-flex justify-content-center" v-if="height < 50">
        <img src="../assets/images/down-arrow.png" alt="arrow-down">
      </div>
    </div>
  </div>
  <div class="bg-light">
    <div class="container py-5">
      <div class="d-none d-md-block">
        <h3 class="d-flex justify-content-center mb-4">
          <span class="me-2 fs-1 fw-bolder">關於找。牌</span>
          <span class="fs-3 text-primary align-self-end">/ About Us</span>
        </h3>
        <div class="row about pb-5" ref="about">
          <div class="col-6 col-md-8">
            <div class="row h-100 align-content-center">
              <div class="col-xl-10 mx-auto pt-3 pt-lg-0 mb-4 mb-lg-5">
                <div class="fw-bold mb-lg-2 slogan">
                  <p class="fs-2 d-none d-lg-block mb-0">「魔術師為觀眾找牌，我們替您找牌。」</p>
                  <p class="fs-4 d-block d-lg-none mb-0">「魔術師為觀眾找牌，我們替您找牌。」</p>
                </div>
                <p class="fs-6 text-end text mb-0">—— 魔術師林店長 2019.03.09</p>
              </div>
              <div class="col-10 col-xl-8 mx-auto">
                <p class="d-none d-lg-block fs-5 text-indent mb-0">
                 《找。牌》是由曾榮獲韓國蔚山魔術特別獎的林店長所創辦的牌店，專注於提供各位魔術師高品質的撲克牌，每副牌皆以最高標準把關，從印刷到噴墨從未鬆懈一絲一毫。
                </p>
                <p class="d-block d-lg-none text-indent mb-0">
                  《找。牌》是由曾榮獲韓國蔚山魔術特別獎的林店長所創辦的牌店，專注於提供各位魔術師高品質的撲克牌，每副牌皆以最高標準把關，從印刷到噴墨從未鬆懈一絲一毫。
                </p>
              </div>
            </div>
          </div>
          <div class="col-4">
            <img src="https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1758699095796.jpg" alt="關於找。牌">
          </div>
        </div>
      </div>
      <h3 class="d-flex justify-content-center mb-4">
        <span class="me-2 fs-1 fw-bolder">熱銷商品</span>
        <span class="fs-3 text-primary align-self-end">/ Hot Sale</span>
      </h3>
      <div class="row hotSale">
        <div class="col-lg-6">
          <div ref="carousel" id="carouselIndicators" class="carousel slide carousel-fade" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active"></div>
              <div class="carousel-item"></div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="h-100 d-flex flex-column justify-content-center px-2 px-md-0 px-lg-4 py-2 py-md-0">
            <h2 class="fs-1 fw-bold mt-5 mt-lg-0 mb-3">加拿大國家公園紀念牌</h2>
            <p class="fs-5 fw-bold mb-2 pt-4 border-top">產品介紹</p>
            <p class="lh-lg mb-4 text-indent">本產品為加拿大國家公園所推出的紀念牌，其每張牌面都是根據該國家公園內的風景與野生動物所繪製，具有濃濃的生態氣息和觀賞性，作為紀念牌價值十足。同時，金屬製的牌盒給人相當的安全感，給您與傳統的紙質牌盒截然不同的體驗。</p>
            <p class="d-none d-xl-block mb-5">規格：一盒53張、金屬製牌盒</p>
            <p class="fs-3 fw-bold text-end mb-3">NT $680 / 副
              <span class="fs-5 text-decoration-line-through text-muted">
                $800
              </span>
            </p>
            <div class="d-flex">
              <button type="button" class="btn btn-outline-primary border-2 fw-bold w-50 me-2" @click.stop="addCart('-N-HfxO4rb_sLZJ3Eg5o')">
                <div class="spinner-border text-white spinner-border-sm" role="status" v-if="loadingItem === '-N-HfxO4rb_sLZJ3Eg5o'">
                  <span class="visually-hidden">Loading...</span>
                </div>
                加到購物車
              </button>
              <button class="btn btn-primary text-white fw-bold w-50" type="button" @click.stop="buyNow('-N-HfxO4rb_sLZJ3Eg5o')">
                  <div class="spinner-border text-white spinner-border-sm" role="status" v-if="buyNowLoading">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                立即購買
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SectionBanner :info="SectionCouponBanner" />
    <div class="container pt-5">
      <h3 class="d-flex justify-content-center mb-4">
        <span class="me-2 fs-1 fw-bolder">最新消息</span>
        <span class="fs-3 text-primary align-self-end">/ News</span>
      </h3>
      <div class="row news" ref="news">
        <div class="d-none d-md-block col-md-6">
          <img src="https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1758699725944.jpg" alt="最新消息">
        </div>
        <div class="col-md-6 my-auto">
          <ul class="list-group list-group-flush">
            <li class="list-group-item bg-transparent d-flex align-item-center">
              <div class="d-flex flex-column">
                <span class="text-muted">2022</span>
                <span class="fs-5 text-primary">02/21</span>
              </div>
              <p class="mb-0 ms-3 align-self-center">歡慶找。牌兩週年，歡迎參加週年慶抽獎活動！</p>
            </li>
            <li class="list-group-item bg-transparent d-flex align-item-center">
              <div class="d-flex flex-column">
                <span class="text-muted">2022</span>
                <span class="fs-5 text-primary">03/09</span>
              </div>
              <p class="mb-0 ms-3 align-self-center">店長生日！輸入此優惠碼即可享七折：0309</p>
            </li>
            <li class="list-group-item bg-transparent d-flex align-item-center">
              <div class="d-flex flex-column">
                <span class="text-muted">2021</span>
                <span class="fs-5 text-primary">08/17</span>
              </div>
              <p class="mb-0 ms-3 align-self-center">店長出國比賽，暫停營業至05/20</p>
            </li>
            <li class="list-group-item bg-transparent d-flex align-item-center">
              <div class="d-flex flex-column">
                <span class="text-muted">2021</span>
                <span class="fs-5 text-primary">03/21</span>
              </div>
              <p class="mb-0 ms-3 align-self-center">狂賀，店長榮獲蔚山魔術特別獎！</p>
            </li>
            <li class="list-group-item bg-transparent d-flex align-item-center">
              <div class="d-flex flex-column">
                <span class="text-muted">2020</span>
                <span class="fs-5 text-primary">02/21</span>
              </div>
              <p class="mb-0 ms-3 align-self-center">歡慶找。牌開幕，歡迎參加開幕抽獎活動！</p>
            </li>
          </ul>
        </div>
      </div>
      <SectionOnSale />
    </div>
    <SectionBanner :info="SectionTriviaBanner" />
    <div class="container py-5">
      <h3 class="d-flex justify-content-center mb-4">
        <span class="me-2 fs-1 fw-bolder">顧客評價</span>
        <span class="fs-3 text-primary align-self-end">/ Feedback</span>
      </h3>
      <div class="row feedback" ref="feedback">
        <div class="d-none d-lg-block col-lg-4">
          <div class="border p-3 h-100 d-flex flex-column justify-content-between">
            <div class="mb-5">
              <div class="d-flex">
                <img src="https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1758699552863.jpg" alt="user" class="user rounded-circle">
                <div class="mx-3 d-flex flex-column justify-content-center">
                  <h2 class="fs-5">吳品宜</h2>
                  <small class="text-secondary">2022年3月22日 18:07</small>
                </div>
                <span class="badge rounded-pill bg-primary ms-auto align-self-start">
                  4.8
                  <span class="material-icons">grade</span>
                </span>
              </div>
              <p class="mt-3 mb-0">原本以為只買一副會很慢才處理，結果下單隔天就出貨了，完全沒有因為買少量被影響到，良心店家。</p>
            </div>
            <button type="button" class="btn p-0 align-self-end" @click="$router.push('/product/-MzUM_vUNQPUVW8OWiu-')">
              <div class="d-flex">
                <span class="ms-auto ps-2 me-2">經典單車牌(紅)</span>
                <img src="https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1650378976380.jpg" alt="經典單車牌(紅)">
              </div>
            </button>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 mb-3 mb-md-0">
          <div class="border p-3 h-100 d-flex flex-column justify-content-between">
            <div class="mb-5">
              <div class="d-flex">
                <img src="https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1758699570888.jpg" alt="user" class="user rounded-circle">
                <div class="mx-3 d-flex flex-column justify-content-center">
                  <h2 class="fs-5">鄭伊如</h2>
                  <small class="text-secondary">2022年1月27日 15:43</small>
                </div>
                <span class="badge rounded-pill bg-primary ms-auto align-self-start">
                  5.0
                  <span class="material-icons">grade</span>
                </span>
              </div>
              <p class="mt-3 mb-0">金屬牌盒質感相當好，每張牌都經過特別的設計，且紙質和噴墨品質都很完美，不愧為主打商品。</p>
            </div>
            <button type="button" class="btn p-0 align-self-end" @click="$router.push('/product/-N-HfxO4rb_sLZJ3Eg5o')">
              <div class="d-flex">
                <span class="ms-auto ps-2 me-2">加拿大國家公園紀念牌</span>
                <img src="https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1650378716872.jpg" alt="加拿大國家公園紀念牌">
              </div>
            </button>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="border p-3 h-100 d-flex flex-column justify-content-between">
            <div class="mb-5">
              <div class="d-flex">
                <img src="https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1758699598281.jpg" alt="user" class="user rounded-circle">
                <div class="mx-3 d-flex flex-column justify-content-center">
                  <h2 class="fs-5">林思穎</h2>
                  <small class="text-secondary">2022年2月18日 11:32</small>
                </div>
                <span class="badge rounded-pill bg-primary ms-auto align-self-start">
                  4.9
                  <span class="material-icons">grade</span>
                </span>
              </div>
              <p class="mt-3 mb-0">2019年度卡牌大會的紀念產品居然還找得到，光是這點就足以給好評，簡直是神店！</p>
            </div>
            <button type="button" class="btn p-0 align-self-end" @click="$router.push('/product/-N-HexEVmkB61Cs9WAf8')">
              <div class="d-flex">
                <span class="ms-auto ps-2 me-2">Cardistry-Con 2019</span>
                <img src="https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1650378822796.jpg" alt="Cardistry-Con 2019">
              </div>
            </button>
          </div>
        </div>
      </div>
      <h3 class="d-flex justify-content-center mt-5 mb-4">
        <span class="me-2 fs-1 fw-bolder">常見問題</span>
        <span class="fs-3 text-primary align-self-end">/ FAQ</span>
      </h3>
      <div class="row faq">
        <div class="col-lg-7 col-xl-6 mx-auto">
          <ul class="accordion list-unstyled" id="accordionFAQ">
            <li class="accordion-item">
              <h4 class="accordion-header" id="headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <span class="text-center lh-lg fw-bold me-3">Q1</span>
                  運送及付款方式有哪些呢？
                </button>
              </h4>
              <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionFAQ">
                <div class="accordion-body bg-white">
                  <p class="p-3 mb-0 ms-4">可以選擇超商取貨及宅配，付款方式有銀行轉帳及信用卡支付。</p>
                </div>
              </div>
            </li>
            <li class="accordion-item">
              <h4 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                  <span class="text-center lh-lg fw-bold me-3">Q2</span>
                  退貨方式及規則
                </button>
              </h4>
              <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionFAQ">
                <div class="accordion-body bg-white">
                  <p class="p-3 mb-0 ms-4">因商品封條為一次性包裝，商品退貨時必須回復至您收到商品時的原始狀態，請您務必確認後再行拆封，感謝您的配合。</p>
                </div>
              </div>
            </li>
            <li class="accordion-item">
              <h4 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                  <span class="text-center lh-lg fw-bold me-3">Q3</span>
                  有辦法單獨購買某張卡嗎？
                </button>
              </h4>
              <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionFAQ">
                <div class="accordion-body bg-white">
                  <p class="p-3 mb-0 ms-4">因為本店進牌都是以副來算，最小購買單位是一副，因此無法單獨購買一張牌，感謝您的配合。</p>
                </div>
              </div>
            </li>
            <li class="accordion-item">
              <h4 class="accordion-header" id="headingFour">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                  <span class="text-center lh-lg fw-bold me-3">Q4</span>
                  產品有損，可以換貨嗎？
                </button>
              </h4>
              <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionFAQ">
                <div class="accordion-body bg-white">
                  <p class="p-3 mb-0 ms-4">如果當場發現產品有損，將立刻幫您換新，並附上本店折價券。</p>
                </div>
              </div>
            </li>
            <li class="accordion-item">
              <h4 class="accordion-header" id="headingFive">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                  <span class="text-center lh-lg fw-bold me-3">Q5</span>
                  請問有賣其他魔術道具嗎？
                </button>
              </h4>
              <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionFAQ">
                <div class="accordion-body bg-white">
                  <p class="p-3 mb-0 ms-4">本店「找。牌」為專門販賣撲克牌的牌店，因此只有販售牌類產品。</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Carousel from 'bootstrap/js/dist/carousel'
import SectionOnSale from '@/components/SectionOnSale.vue'
import SectionBanner from '@/components/SectionBanner.vue'
import Footer from '@/components/Footer.vue'
import cartStore from '@/stores/cartStore'
import { mapActions, mapState } from 'pinia'
export default {
  data () {
    return {
      carousel: {},
      buyNowLoading: false,
      SectionCouponBanner: {
        bgImg: 'url(https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1758699281574.jpg)',
        attachment: true,
        title: '周年慶優惠券',
        titleEn: 'Coupon',
        text: '尚未領取周年慶優惠大獎嗎？快來翻出你的專屬優惠券',
        btnText: '手刀領取',
        btnPath: '/coupon'
      },
      SectionTriviaBanner: {
        bgImg: 'url(https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1758699356415.jpg)',
        title: '撲克冷知識',
        titleEn: 'Trivia',
        text: '你知道嗎？將撲克牌四種花色重疊在一起的話，就會跑出星星喔',
        btnText: '了解更多',
        btnPath: '/trivia'
      },
      height: 0
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
    height () {
      if (this.height >= 220) {
        this.$refs.about.classList.add('animation')
      }
      if (this.height >= 1940 && document.body.clientWidth >= 768) {
        this.$refs.news.classList.add('animation')
      } else if (this.height >= 1500 && document.body.clientWidth < 768) {
        this.$refs.news.classList.add('animation')
      }
      if (this.height >= 3100) {
        this.$refs.feedback.classList.add('animation')
      }
    }
  },
  methods: {
    scroll () {
      this.height = document.body.scrollTop || document.documentElement.scrollTop
    },
    buyNow (id) {
      this.buyNowLoading = true
      const api = `${import.meta.env.VITE_APP_API}/api/${import.meta.env.VITE_APP_PATH}/cart`
      this.$http.post(api, { data: { product_id: id, qty: 1 } }).then(() => {
        this.$swal('商品已加入購物車')
        this.buyNowLoading = false
        this.$router.push('/cart')
      })
    },
    ...mapActions(cartStore, ['addCart'])
  },
  mounted () {
    this.carousel = new Carousel(this.$refs.carousel)
    document.addEventListener('scroll', this.scroll)
  },
  unmounted () {
    document.removeEventListener('scroll', this.scroll)
  }
}
</script>

<style lang="scss" scoped>
//hero banner開始
.heroBanner{
  height: calc(100vh - 56px);
  margin-top: 56px;
  .img-fit{
    object-fit: cover;
  }
  .slogan{
    background-color: #587778;
    top:0;
    @media (max-width: 992px) {
      background-color: transparent;
      z-index: 2;
      background-color: rgba(0, 0, 0, .6);
      border: 5px double rgba(254, 254, 254, .6);
    }
    p{
      width: 18em;
      white-space: nowrap;
      overflow: hidden;
      animation: typing 2s steps(18),Wcaret 2s steps(1);
      @media (max-width: 424px) {
        font-size: 16px !important;
      }
    }
  }
  .btn{
    transition: .8s;
    color: #FFFFFF;
    &:hover,
    &:focus {
      box-shadow: inset 0 0 0 2em #FFFFFF;
      color: #587778;
    }
    @media (max-width: 992px) {
      background-color: #587778;
      color: #FFFFFF;
    }
  }
  .userScroll{
    position: absolute;
    width: 100%;
    height: 40px;
    bottom: 30px;
    z-index: 4;
    animation: slideDown 1s infinite;
  }
}
@keyframes typing {
  0% { width: 0 }
}
@keyframes Wcaret {
  0% { border-right: .05em solid #ffffff; }
  33% { border-right: .05em solid transparent; }
  67% { border-right: .05em solid #ffffff; }
  100% { border-right: .05em solid transparent; }
}
@keyframes slideDown {
  0% {
    -webkit-transform: translateY(-20px);
    transform: translateY(-20px);
  }
  100% {
    -webkit-transform: translateY(20px);
    transform: translateY(20px);
  }
}
//hero banner結束

//關於我們開始
.about{
  img{
    width: 90%;
    box-shadow: 20px 20px #587778;
    transform: translateY(-20px);
    opacity: 0;
    transition: 1.5s .5s ease-out;
  }
  .slogan{
    p{
      width: 18em;
      white-space: nowrap;
      overflow: hidden;
      color: transparent;
    }
  }
  &.animation{
    .slogan p{
      color: rgb(33, 37, 41);
      animation: typing 2s steps(18),caret 2s steps(1);
    }
    img{
      transform: translateY(0);
      box-shadow: 20px 20px #587778;
      opacity: 1;
    }
  }
}
@keyframes caret {
  0% { border-right: .05em solid #212529; }
  33% { border-right: .05em solid transparent; }
  67% { border-right: .05em solid #212529; }
  100% { border-right: .05em solid transparent; }
}
.text-indent{
  text-indent: 2em;
}
//關於我們結束

//熱銷商品開始
.hotSale .btn{
  transition: .8s;
  border-width: 2px;
  &:hover,
  &:focus {
    color: #ffffff;
    box-shadow: inset 0 0 0 2em #587778;
  }
}
.carousel{
  .carousel-item{
    background-size: cover;
    background-position: center;
    min-height: 500px;
    &:nth-child(1){
      background-image: url("https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1650378716872.jpg");
    }
    &:nth-child(2){
      background-image: url("https://storage.googleapis.com/vue-course-api.appspot.com/vuefindcard/1650378700094.jpg");
    }
    @media (max-width:992px) {
      min-height: 400px;
    }
    @media (max-width:767px) {
      min-height: 300px;
    }
    @media (max-width:576px) {
      min-height: 250px;
    }
  }
  .carousel-indicators{
    bottom: 0;
  }
  .carousel-indicators [data-bs-target]{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #587778;
  }
}
//熱銷商品結束

//最新消息開始
.news{
  img{
    height: 400px;
    width: 100%;
    object-fit: cover;
  }
  &.animation .list-group-item{
    animation: flipX 1.2s;
  }
}
@keyframes flipX {
  0%{
    transform: perspective(600px) rotateX(-180deg);
    opacity: 0;
  }
  100%{
    transform: perspective(600px) rotateX(-360deg);
  }
}
//最新消息結束

//顧客回饋開始
.feedback{
  img{
    width: 30px;
    height: 30px;
    object-fit: cover;
  }
  .user{
    width: 50px;
    height: 50px;
  }
  .btn:hover{
    background-color: #587778;
    color: #ffffff;
  }
  .btn span{
    line-height: 30px;
  }
  .material-icons{
    font-size: 12px;
    vertical-align: bottom;
  }
  &.animation > div{
    animation: rotateXIn 1.2s ease-out;
  }
}
@keyframes rotateXIn {
  0%{
    transform: perspective(600px) translate3d(0, -60px, -2000px) rotateX(75deg);
    opacity: 0;
  }
  5%{
    transform: perspective(600px) translate3d(0, -60px, -1500px) rotateX(75deg)
  }
}
//顧客回饋結束

//常見問題開始
.faq{
  .accordion-button{
    background-color: #ffffff;
    color: #212529;
  }
}
//常見問題結束
</style>
