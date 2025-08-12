<template>
  <!-- 작성 모드: /community/qna/0 -->
  <div v-if="isWriteMode" class="q-pa-md q-gutter-sm">
    <!-- 작성 / 미리보기 토글 -->
    <q-btn-toggle
      v-model="mode"
      unelevated
      toggle-color="black"
      :options="[
        { label: '작성', value: 'edit' },
        { label: '미리보기', value: 'preview' },
      ]"
    />

    <!-- 작성 -->
    <div v-if="mode === 'edit'">
      <q-editor v-model="editor" min-height="10rem" />
    </div>

    <!-- 미리보기 (sanitize) -->
    <div v-else>
      <q-card flat bordered>
        <q-card-section>
          <div v-html="safeHtml"></div>
        </q-card-section>
      </q-card>

      <!-- 필요할 때만 원문(HTML) 확인 -->
      <q-expansion-item dense label="원문(HTML) 보기">
        <q-card flat bordered>
          <q-card-section>
            <pre style="white-space: pre-wrap; margin: 0">{{ editor }}</pre>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>

    <div class="q-mt-md text-right">
      <q-btn flat label="취소" class="q-mr-sm" @click="$router.push('/community/qna')" />
      <q-btn color="black" unelevated label="등록" @click="submit" />
    </div>
  </div>

  <!-- 상세 보기 모드: /community/qna/:id -->
  <div v-else>
    <q-card flat bordered class="q-pa-lg q-mb-lg">
      <div class="text-h5 q-mb-xs">{{ item.title }}</div>
      <div class="text-caption text-grey q-mb-lg">{{ item.date }} · 작성자 {{ item.writer }}</div>
      <div class="q-mb-xl" style="white-space: pre-line">{{ item.body }}</div>
    </q-card>

    <q-card flat bordered class="q-pa-md q-mb-lg">
      <div class="text-subtitle1 q-mb-md">답변 {{ answers.length }}</div>
      <q-list bordered v-if="answers.length">
        <q-item v-for="a in answers" :key="a.id">
          <q-item-section>
            <div class="text-body2 q-mb-xs" style="white-space: pre-line">{{ a.body }}</div>
            <div class="text-caption text-grey">by {{ a.writer }} · {{ a.date }}</div>
          </q-item-section>
        </q-item>
      </q-list>
      <div v-else class="text-grey q-pa-sm">아직 답변이 없습니다.</div>
    </q-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import DOMPurify from 'dompurify'

const route = useRoute()
const router = useRouter()
const $q = useQuasar()

// 작성/상세 모드 판별: /community/qna/0 이면 작성
const isWriteMode = computed(() => String(route.params.id) === '0')

// 작성 모드 상태
const editor = ref('')
const mode = ref('edit')
const safeHtml = computed(() => DOMPurify.sanitize(editor.value))

// 데모용 데이터 (상세 모드)
const list = [
  {
    id: 3,
    title: '로그인이 안돼요',
    writer: 'alice',
    date: '2025-08-10',
    body: '오류 메시지가 뜹니다.',
  },
  {
    id: 2,
    title: '비밀번호 규칙이 궁금합니다',
    writer: 'bob',
    date: '2025-08-08',
    body: '특수문자 포함인가요?',
  },
  {
    id: 1,
    title: '프로필 사진이 안 바뀌어요',
    writer: 'carol',
    date: '2025-08-05',
    body: '저장 후에도 반영이 안됩니다.',
  },
]

const item = computed(() => {
  const id = Number(route.params.id)
  return (
    list.find((v) => v.id === id) ?? { title: '존재하지 않는 질문', writer: '', date: '', body: '' }
  )
})

const answers = ref([
  ...(Number(route.params.id) === 3
    ? [
        { id: 1, body: '캐시를 비우고 다시 시도해보세요.', writer: 'admin', date: '2025-08-10' },
        {
          id: 2,
          body: '동일 현상이면 스크린샷 부탁드립니다.',
          writer: 'moderator',
          date: '2025-08-10',
        },
      ]
    : []),
])

function submit() {
  if (!editor.value.trim()) {
    $q.notify({ type: 'warning', message: '내용을 입력하세요.', position: 'top' })
    return
  }
  // 데모: 실제 저장 없이 목록으로 이동
  $q.notify({ type: 'positive', message: '등록(데모): 서버 연결 후 적용됩니다.', position: 'top' })
  router.push('/community/qna')
}
</script>
