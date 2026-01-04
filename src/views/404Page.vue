<template>
  <div class="vh-100 bg-light d-flex flex-column align-items-center justify-content-center">
    <h1 class="d-flex mb-3 mb-md-4">
      <span class="me-2 fw-bolder">找不到頁面</span>
      <span class="text-primary align-self-end">/ 404 Not Found</span>
    </h1>
    <p class="mb-5">Oops！您要找的頁面被魔術師消失了</p>
    <RouterLink to="/" class="btn btn-outline-primary btn-lg fw-bold px-4 py-3"
      >回到 找。牌 首頁</RouterLink
    >
  </div>
</template>

<style lang="scss" scoped>
h1 {
  :first-child {
    font-size: 2.5rem;
    @media (max-width: 424px) {
      font-size: 2rem;
    }
    @media (max-width: 374px) {
      font-size: 1.75rem;
    }
  }
  :last-child {
    font-size: 1.75rem;
    color: #587778;
    @media (max-width: 424px) {
      font-size: 1.25rem;
    }
    @media (max-width: 374px) {
      font-size: 1rem;
    }
  }
}
p {
  font-size: 1.25rem;
  @media (max-width: 424px) {
    font-size: 1rem;
  }
}
.btn-outline-primary {
  transition: 0.5s;
  &:hover,
  &:focus {
    color: #ffffff;
    box-shadow: inset 0 0 0 2em #587778;
  }
}
</style>
