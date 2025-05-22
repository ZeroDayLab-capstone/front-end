<template>
  <q-page class="q-pa-md" style="max-width: 600px">
    <div class="text-h6 q-mb-lg">사용자 실습 결과 조회</div>

    <div class="row items-end q-gutter-sm">
      <q-input v-model.number="userId" type="number" label="User ID" />
      <q-btn label="조회" color="primary" @click="fetchResults" />
    </div>

    <q-table
      v-if="rows.length"
      :columns="columns"
      :rows="rows"
      row-key="lab_id"
      flat
      bordered
      dense
      class="q-mt-md"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'src/boot/axios'

const userId = ref(null)
const rows = ref([])
const columns = [
  { name: 'lab_id', label: '실습 ID', field: 'lab_id' },
  { name: 'status', label: '상태', field: 'status' },
  { name: 'score', label: '점수', field: 'score' },
]

async function fetchResults() {
  if (!userId.value) return
  rows.value = [] // 초기화
  try {
    if (!userId.value) return
    // axios.request 를 사용해야 브라우저에서도 GET 바디가 전송됩니다
    const res = await api.request({
      method: 'get',
      url: '/admin/admin/user-results',
      data: { user_id: userId.value },
    })
    // 응답 예시: { results: [ { lab_id, status, score }, … ] }
    rows.value = res.data.results
  } catch (err) {
    console.error('사용자 실습 결과 조회 실패', err)
  }
}
</script>
