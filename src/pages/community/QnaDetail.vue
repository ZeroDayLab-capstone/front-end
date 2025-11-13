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

          <q-item-section side v-if="canManage(a)">
            <q-btn
              dense
              flat
              icon="edit"
              class="q-mr-xs"
              @click="startEditAnswer(a)"
              aria-label="Edit"
            />
            <q-btn
              dense
              flat
              icon="delete"
              color="negative"
              @click="deleteAnswer(a.id)"
              aria-label="Delete"
            />
          </q-item-section>
        </q-item>
      </q-list>
      <div v-else class="text-grey q-pa-sm">아직 답변이 없습니다.</div>
    </q-card>

    <!-- ✅ 답변 입력 + 등록 -->
    <q-card flat bordered class="q-pa-md">
      <div class="text-subtitle1 q-mb-sm">답변 달기</div>

      <q-input
        v-model="answer"
        type="textarea"
        autogrow
        filled
        placeholder="답변을 입력하세요"
        @keydown.ctrl.enter.prevent="submitAnswer"
      />

      <div class="q-mt-sm text-right">
        <q-btn flat label="취소" class="q-mr-sm" @click="answer = ''" />
        <q-btn
          color="black"
          unelevated
          label="답글 달기"
          :loading="answerLoading"
          :disable="!answer.trim()"
          @click="submitAnswer"
        />
      </div>
    </q-card>
  </div>

  <q-dialog v-model="editDlg.open" persistent>
    <q-card style="min-width: 480px">
      <q-card-section class="text-subtitle1">답변 수정</q-card-section>
      <q-card-section>
        <q-input v-model="editDlg.content" type="textarea" autogrow filled />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="취소" @click="editDlg.open = false" />
        <q-btn
          unelevated
          color="black"
          label="저장"
          :loading="editDlg.loading"
          @click="submitEditAnswer"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import DOMPurify from 'dompurify'
import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/auth'
import { jwtDecode } from 'jwt-decode'

const route = useRoute()
const router = useRouter()
const $q = useQuasar()
const auth = useAuthStore()

const me = computed(() => {
  try {
    if (!auth.token) return { email: null, username: null, sub: null }
    const d = jwtDecode(auth.token)
    return {
      email: d.email || d.user_email || null,
      username: d.username || d.name || d.preferred_username || d.nick || null,
      sub: d.sub || null,
    }
  } catch {
    return { email: null, username: null, sub: null }
  }
})

function canManage(a) {
  // 서버가 can_edit/can_delete 내려주면 그걸 우선 신뢰
  if (a?.can_edit === true || a?.can_delete === true) return true

  // 댓글 객체에서 가능한 author 표기들을 모아둠
  const authorCandidates = [
    a?.writer, // 화면에서 쓰는 표시값(닉네임/이메일)
    a?.author, // 서버가 author로 주는 경우
    a?.writer_email, // 서버가 이메일을 별도로 주는 경우
    a?.author_email,
    a?.author_id, // 숫자/UUID일 수도
  ]
    .filter(Boolean)
    .map((v) => String(v).toLowerCase())

  // 내 토큰에서 가능한 식별자 후보들
  const meIds = [me.value.email, me.value.username, me.value.sub]
    .filter(Boolean)
    .map((v) => String(v).toLowerCase())

  // 후보들 중 하나라도 일치하면 수정/삭제 허용
  return meIds.some((id) => authorCandidates.includes(id))
}

// /community/qna/0 → 작성 모드
const isWriteMode = computed(() => String(route.params.id) === '0')

// 작성 모드 상태
const title = ref('')
const editor = ref('')
const mode = ref('edit')
const safeHtml = computed(() => DOMPurify.sanitize(editor.value))

// 상세 모드 상태
const item = ref({ id: null, title: '', writer: '', date: '', body: '' })
const answers = ref([]) // [{id, body, writer, date}]

// ✅ 답변 입력 상태
const answer = ref('')
const answerLoading = ref(false)

const editDlg = ref({ open: false, id: null, content: '', loading: false })

onMounted(() => {
  if (!isWriteMode.value) loadDetail()
})

async function loadDetail() {
  try {
    const id = Number(route.params.id)
    const res = await api.get(`/qna/qna/qna/posts/${id}`)
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
          can_edit: c.can_edit ?? undefined,
          can_delete: c.can_delete ?? undefined,
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
    // 로그인 필요: axios 인터셉터가 Authorization 헤더 자동 첨부
    const res = await api.post('/qna/qna/qna/posts/', {
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

async function submitAnswer() {
  if (!answer.value.trim()) {
    $q.notify({ type: 'warning', message: '답변 내용을 입력하세요.' })
    return
  }
  try {
    answerLoading.value = true
    const postId = Number(route.params.id)
    await api.post(`/qna/qna/qna/posts/${postId}/comments`, {
      content: answer.value,
    })
    $q.notify({ type: 'positive', message: '답변이 등록되었습니다.' })
    answer.value = ''
    await loadDetail() // 방금 단 답변 반영
  } catch (e) {
    console.error('댓글 등록 실패', e)
    $q.notify({ type: 'negative', message: '답변 등록에 실패했습니다.' })
  } finally {
    answerLoading.value = false
  }
}

/* ===== 댓글: 수정 ===== */
function startEditAnswer(a) {
  editDlg.value = { open: true, id: a.id, content: a.body, loading: false }
}
async function submitEditAnswer() {
  const { id, content } = editDlg.value
  if (!content?.trim()) {
    $q.notify({ type: 'warning', message: '내용을 입력하세요.' })
    return
  }
  try {
    editDlg.value.loading = true
    await api.put(`/qna/qna/qna/posts/comments/${id}`, { content })
    $q.notify({ type: 'positive', message: '수정되었습니다.' })
    editDlg.value.open = false
    await loadDetail()
  } catch (e) {
    console.error('댓글 수정 실패', e)
    $q.notify({ type: 'negative', message: '수정에 실패했습니다.' })
  } finally {
    editDlg.value.loading = false
  }
}

/* ===== 댓글: 삭제 ===== */
async function deleteAnswer(id) {
  let ok = false
  try {
    await $q
      .dialog({
        title: '삭제',
        message: '정말 삭제하시겠습니까?',
        cancel: true,
        ok: { label: '삭제', color: 'negative' },
      })
      .onOk(() => {
        ok = true
      })
  } catch {
    ok = false
  }
  if (!ok) return

  try {
    await api.delete(`/qna/qna/qna/posts/comments/${id}`)
    $q.notify({ type: 'positive', message: '삭제되었습니다.' })
    await loadDetail()
  } catch (e) {
    console.error('댓글 삭제 실패', e)
    $q.notify({ type: 'negative', message: '삭제에 실패했습니다.' })
  }
}
</script>
