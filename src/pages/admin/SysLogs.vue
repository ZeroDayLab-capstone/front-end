<template>
  <q-page class="q-pa-md">
    <div class="text-h6 q-mb-md">시스템 로그</div>
    <q-table :columns="columns" :rows="rows" row-key="timestamp" flat bordered dense />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const columns = [
  { name: 'timestamp', label: '시간', field: 'timestamp' },
  { name: 'user', label: '사용자', field: 'user' },
  { name: 'action', label: '동작', field: 'action' },
  { name: 'detail', label: '상세', field: 'detail' },
]
const rows = ref([])

onMounted(() => {
  // TODO: api.get('/admin/logs').then(r=>rows.value=r.data)
  rows.value = [
    { timestamp: '2025-05-18 12:00', user: '홍길동', action: '로그인', detail: '-' },
    { timestamp: '2025-05-18 12:05', user: '김철수', action: '실습제출', detail: 'Lab #2' },
  ]
})
</script>
