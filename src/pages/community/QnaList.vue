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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'src/boot/axios'

const router = useRouter()

const columns = [
  { name: 'no', label: 'No', field: 'no', align: 'left' },
  { name: 'title', label: '제목', field: 'title' },
  { name: 'writer', label: '작성자', field: 'writer' }, // ← author
  { name: 'answers', label: '답변', field: 'answers' }, // ← comment_count
  { name: 'date', label: '작성시간', field: 'date' }, // ← created_at
  { name: 'status', label: '상태', field: 'accepted' }, // ← accepted
]

const rows = ref([])

onMounted(load)

async function load() {
  try {
    const res = await api.get('/qna/qna/qna/posts/')
    const list = Array.isArray(res.data) ? res.data : []
    rows.value = list.map((p) => ({
      id: p.id,
      title: p.title,
      writer: p.author, // 매핑
      answers: p.comment_count, // 매핑
      accepted: p.accepted, // 매핑
      date: p.created_at, // 매핑
      pinned: p.pinned ?? false, // (옵션)
    }))
  } catch (e) {
    console.error('QnA 목록 조회 실패', e)
    rows.value = []
  }
}

function go(_, row) {
  router.push(`/community/qna/${row.id}`)
}
</script>
