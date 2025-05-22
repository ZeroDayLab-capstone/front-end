<template>
  <q-page class="q-pa-md">
    <div class="text-h6 q-mb-md">모든 사용자 목록</div>
    <q-table :columns="columns" :rows="rows" row-key="id" flat bordered dense />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'

// 나중에 api 호출해서 세팅하세요
const columns = [
  { name: 'id', label: 'ID', field: 'id' },
  { name: 'email', label: '이메일', field: 'email' },
  { name: 'username', label: '이름', field: 'username' },
  { name: 'gender', label: '성별', field: 'gender' },
  { name: 'nationality', label: '국적', field: 'nationality' },
  { name: 'job', label: '직업', field: 'job' },
  { name: 'is_admin', label: '관리자', field: (row) => (row.is_admin ? '✅' : '—') },
]
const rows = ref([])

onMounted(async () => {
  try {
    const res = await api.get('/admin/admin/users')
    // 응답이 { data: [ { id, email, username, ... }, ... ] } 형태라고 가정
    const allLists = Object.values(res.data)
    rows.value = allLists.flat()
  } catch (err) {
    console.error('사용자 목록 가져오기 실패', err)
  }
})
</script>
