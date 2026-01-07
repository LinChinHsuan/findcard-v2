<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <a
          class="page-link rounded-0 px-2"
          href="#"
          aria-label="Previous"
          @click.prevent="updatePage(pages.current_page - 1)"
        >
          <span class="material-icons align-middle">chevron_left</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pages.total_pages"
        :key="page"
        :class="{ active: page === pages.current_page }"
      >
        <a class="page-link fw-bold h-100" href="#" @click.prevent="updatePage(page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <a
          class="page-link rounded-0 px-2"
          href="#"
          aria-label="Next"
          @click.prevent="updatePage(pages.current_page + 1)"
        >
          <span class="material-icons align-middle">chevron_right</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const props = defineProps(['pages'])
const emit = defineEmits(['emit-pages'])

function updatePage(page) {
  emit('emit-pages', page)
}
</script>

<style lang="scss" scoped>
.page-link {
  line-height: 25px;
}
</style>
