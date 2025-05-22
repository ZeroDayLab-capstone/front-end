<!-- src/pages/admin/Logs.vue -->
<template>
  <q-page class="q-pa-md">
    <div class="text-h6 q-mb-md">시스템 로그</div>
    <q-table :columns="columns" :rows="rows" row-key="timestamp" flat bordered dense />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'

const columns = [
  { name: 'timestamp', label: '시간', field: 'timestamp' },
  { name: 'user', label: '사용자', field: 'user' },
  { name: 'action', label: '동작', field: 'action' },
  { name: 'detail', label: '상세', field: 'detail' },
]
const rows = ref([])

onMounted(async () => {
  try {
    // 실제 엔드포인트로 로그 조회
    const res = await api.get('/admin/admin/logs')

    // additionalProp1, additionalProp2… 의 배열들을 모두 담아서 1차원 배열로 합침
    rows.value = Object.values(res.data)
      .flat()
      .map((item) => ({
        // 만약 detail 필드가 없다면 빈 문자열로 기본값 설정
        timestamp: item.timestamp,
        user: item.user,
        action: item.action,
        detail: item.detail ?? '',
      }))
  } catch (err) {
    console.error('시스템 로그 조회 실패', err)
  }
})
</script>
