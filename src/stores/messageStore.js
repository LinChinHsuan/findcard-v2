import { ref } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('messageStore', () => {
  const messages = ref([])

  function pushMessage(res, title = '更新') {
    if (res.data.success) {
      messages.value.push({
        style: 'success',
        title: `${title}成功`,
      })
    } else {
      // 有些訊息是字串，有些則是陣列，在此統一格式
      const message = typeof res.data.message === 'string' ? [res.data.message] : res.data.message
      messages.value.push({
        style: 'danger',
        title: `${title}失敗`,
        content: message.join('、'),
      })
    }
  }

  return {
    messages,
    pushMessage
  }
})
