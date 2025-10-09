import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useSectionRouter(total) {
  const route = useRoute()
  const router = useRouter()
  const index = ref(0)

  watchEffect(() => {
    const sec = parseInt(route.query.sec, 10)
    index.value = !isNaN(sec) && sec >= 0 && sec < total ? sec : 0
  })

  function go(sec) {
    router.push({ name: route.name || 'webbasic', query: { sec } })
  }

  return { index, go }
}
