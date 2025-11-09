<template>
  <!-- 작성 모드: /community/qna/0 -->
  <div v-if="isWriteMode" class="q-pa-md q-gutter-sm">
    <q-btn-toggle
      v-model="mode"
      unelevated
      toggle-color="black"
      :options="[
        { label: '작성', value: 'edit' },
        { label: '미리보기', value: 'preview' },
      ]"
    />

    <!-- ✅ 제목 입력 추가 -->
    <q-input v-model="title" label="제목" class="q-mt-md" filled />

    <!-- 본문 작성 -->
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import DOMPurify from 'dompurify'
import { api } from 'src/boot/axios'

const route = useRoute()
const router = useRouter()
const $q = useQuasar()

// 작성/상세 모드 판별: /community/qna/0 이면 작성
const isWriteMode = computed(() => String(route.params.id) === '0')

// 작성 모드 상태
const title = ref('')
const editor = ref('')
const mode = ref('edit')
const safeHtml = computed(() => DOMPurify.sanitize(editor.value))

// 상세 모드 상태
const item = ref({ id: null, title: '', writer: '', date: '', body: '' })
const answers = ref([]) // [{id, body, writer, date}]

onMounted(() => {
  if (!isWriteMode.value) loadDetail()
})

async function loadDetail() {
  try {
    const id = Number(route.params.id)
    const res = await api.get(`/qna/qna/posts/${id}`)
    // 기대 스키마: { id,title,author,created_at,content,comments:[{id,content,author,created_at}] }
    const p = res.data || {}
    item.value = {
      id: p.id,
      title: p.title,
      writer: p.author, // author → writer
      date: p.created_at, // created_at → date
      body: p.content, // content → body
    }
    answers.value = Array.isArray(p.comments)
      ? p.comments.map((c) => ({
          id: c.id ?? c.comment_id,
          body: c.content,
          writer: c.author,
          date: c.created_at,
        }))
      : []
  } catch (e) {
    console.error('QnA 상세 조회 실패', e)
    $q.notify({ type: 'negative', message: '게시글을 불러올 수 없습니다.' })
    router.push('/community/qna')
  }
}

function submitGuard() {
  if (!title.value.trim()) {
    $q.notify({ type: 'warning', message: '제목을 입력하세요.' })
    return false
  }
  if (!editor.value.trim()) {
    $q.notify({ type: 'warning', message: '내용을 입력하세요.' })
    return false
  }
  return true
}

async function submit() {
  if (!submitGuard()) return
  try {
    // 로그인 필요: axios 인터셉터가 Authorization 헤더를 알아서 추가
    const res = await api.post('/qna/qna/posts/', {
      title: title.value,
      content: editor.value, // 백엔드 스키마에 맞춤
    })
    const newId = res.data?.id
    $q.notify({ type: 'positive', message: '등록되었습니다.' })
    if (newId) router.push(`/community/qna/${newId}`)
    else router.push('/community/qna')
  } catch (e) {
    console.error('QnA 작성 실패', e)
    $q.notify({ type: 'negative', message: '등록에 실패했습니다.' })
  }
}
</script>
