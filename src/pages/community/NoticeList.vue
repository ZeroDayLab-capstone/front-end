<template>
  <q-table :rows="rows" :columns="columns" row-key="id" flat bordered @row-click="go">
    <!-- No: 현재 화면 상단부터 1,2,3 -->
    <template #body-cell-no="p">
      <q-td :props="p">{{ p.rowIndex + 1 }}</q-td>
    </template>

    <template #body-cell-title="p">
      <q-td :props="p">
        <q-icon v-if="p.row.pinned" name="push_pin" class="q-mr-xs" />
        {{ p.row.title }}
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const columns = [
  { name: 'no', label: 'No', field: 'no', align: 'left' }, // ← 번호 전용
  { name: 'title', label: '제목', field: 'title' },
  { name: 'date', label: '작성시간', field: 'date' },
]

const rows = ref([
  { id: 3, title: '서비스 점검 안내', date: '2025-08-10', pinned: true },
  { id: 2, title: '신규 기능 업데이트', date: '2025-08-01' },
  { id: 1, title: '오픈 공지', date: '2025-07-20' },
])

function go(_, row) {
  router.push(`/community/notice/${row.id}`)
}
</script>
