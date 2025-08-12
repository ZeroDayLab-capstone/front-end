<template>
  <q-page class="q-pa-lg bg-grey-2">
    <div class="q-pa-xl text-center text-h4 text-bold">커뮤니티</div>
    <q-tabs v-model="tab" class="q-mb-md" @update:model-value="go">
      <q-tab name="notice" label="NOTICE" />
      <q-tab name="faq" label="FAQ" />
      <q-tab name="qna" label="Q&A" />
    </q-tabs>
    <router-view />
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const tab = ref('faq')
watch(
  () => route.name,
  (n) => {
    if (!n) return
    tab.value = n.includes('notice') ? 'notice' : n.includes('qna') ? 'qna' : 'faq'
  },
  { immediate: true },
)
function go(v) {
  router.push(`/community/${v}`)
}
</script>
