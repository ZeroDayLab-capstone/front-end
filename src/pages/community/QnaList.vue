<template>
  <q-table :rows="rows" :columns="columns" row-key="id" flat bordered @row-click="go">
    <!-- No: 현재 화면 상단부터 1,2,3 -->
    <template #body-cell-no="p">
      <q-td :props="p">{{ p.rowIndex + 1 }}</q-td>
    </template>

    <template #body-cell-status="p">
      <q-td :props="p">
        <q-chip :color="p.row.accepted ? 'positive' : 'grey-6'" text-color="white" dense>
          {{ p.row.accepted ? '채택' : '대기' }}
        </q-chip>
      </q-td>
    </template>
  </q-table>
  <div class="q-my-md text-right">
    <q-btn unelevated color="black" label="질문하기" @click="$router.push('/community/qna/0')" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const columns = [
  { name: 'no', label: 'No', field: 'no', align: 'left' }, // ← 번호 전용
  { name: 'title', label: '제목', field: 'title' },
  { name: 'writer', label: '작성자', field: 'writer' },
  { name: 'answers', label: '답변', field: 'answers' },
  { name: 'date', label: '작성시간', field: 'date' },
  { name: 'status', label: '상태', field: 'accepted' },
]

const rows = ref([
  {
    id: 3,
    title: '로그인이 안돼요',
    writer: 'alice',
    answers: 2,
    accepted: true,
    date: '2025-08-10',
  },
  {
    id: 2,
    title: '비밀번호 규칙이 궁금합니다',
    writer: 'bob',
    answers: 1,
    accepted: false,
    date: '2025-08-08',
  },
  {
    id: 1,
    title: '프로필 사진 변경이 안돼요.',
    writer: 'carol',
    answers: 0,
    accepted: false,
    date: '2025-08-05',
  },
])

function go(_, row) {
  router.push(`/community/qna/${row.id}`)
}
</script>
