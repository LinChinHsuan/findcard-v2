import { ref } from 'vue'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
const options = {
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  icon: 'success',
  iconColor: '#587778',
}

export default defineStore('favoriteStore', () => {
  const favorite = ref([])
  const favoriteNum = ref(0)

  function getFavorite() {
    favorite.value = JSON.parse(localStorage.getItem('favorite')) || []
    favoriteNum.value = favorite.value.length
  }
  function removeFavorite(item) {
    favorite.value.splice(favorite.value.indexOf(item), 1)
    localStorage.setItem('favorite', JSON.stringify(favorite.value))
    Swal.fire({
      title: `取消關注 ${item.title}`,
      width: '24rem',
      ...options,
    })
    getFavorite()
  }
  function toggleFavorite(item) {
    const id = item.id
    const hasFavorite = favorite.value.some((item) => item.id === id)
    if (!hasFavorite) {
      favorite.value.push(item)
      localStorage.setItem('favorite', JSON.stringify(favorite.value))
      Swal.fire({
        title: `已將 ${item.title} 加入我的最愛`,
        width: '28rem',
        ...options,
      })
    } else {
      const delItem = favorite.value.find((item) => {
        return item.id === id
      })
      favorite.value.splice(favorite.value.indexOf(delItem), 1)
      localStorage.setItem('favorite', JSON.stringify(favorite.value))
      Swal.fire({
        title: `取消關注 ${item.title}`,
        width: '24rem',
        ...options,
      })
    }
    getFavorite()
  }
  function isFavorite(id) {
    return favorite.value.some(function (item) {
      return item.id === id
    })
  }

  return {
    favorite,
    favoriteNum,
    getFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  }
})
