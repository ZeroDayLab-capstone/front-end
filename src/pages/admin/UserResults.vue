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

const userId = ref(null)
const rows = ref([])
const columns = [
  { name: 'lab_id', label: '실습 ID', field: 'lab_id' },
  { name: 'status', label: '상태', field: 'status' },
  { name: 'score', label: '점수', field: 'score' },
]

function fetchResults() {
  if (!userId.value) return
  rows.value = [] // 로딩 초기화
  // TODO: api.get('/admin/user-results', { params:{ user_id:userId.value } }).then(r=>rows.value=r.data)
  setTimeout(() => {
    rows.value = [
      { lab_id: 1, status: '완료', score: 100 },
      { lab_id: 2, status: '미제출', score: 0 },
    ]
  }, 300)
}
</script>
