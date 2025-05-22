<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-md">
      <div class="text-h6">Docker 서버 상태</div>
      <q-btn dense flat icon="refresh" class="q-ml-md" @click="fetchStatus" />
    </div>

    <q-card flat bordered class="q-pa-md">
      <div v-if="!status">로딩 중...</div>
      <pre v-else>{{ status }}</pre>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'

const status = ref(null)

async function fetchStatus() {
  status.value = null
  try {
    const res = await api.get('/admin/admin/server-status')
    // 응답이 단순 string 이면 그대로, 객체/배열이면 JSON.stringify 로 포맷
    status.value = typeof res.data === 'string' ? res.data : JSON.stringify(res.data, null, 2)
  } catch (err) {
    console.error('서버 상태 조회 실패', err)
    status.value = '서버 상태를 가져오는 중 오류가 발생했습니다.'
  }
}

onMounted(fetchStatus)
</script>
