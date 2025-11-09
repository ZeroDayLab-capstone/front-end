<template>
  <q-page class="column items-center q-pa-lg">
    <!-- 헤더 -->
    <div class="column text-h6 text-center text-bold">
      <span>Find your account ID</span>
    </div>
    <div class="text-center q-mt-xs">
      <span>Enter your name, birthdate, and gender to look up your ID.</span>
    </div>

    <q-card
      flat
      square
      class="q-pa-md q-mt-lg"
      style="border: 1px solid lightgrey; min-width: 520px"
    >
      <!-- 타이틀 -->
      <div class="text-bold text-subtitle1 q-pb-sm">아이디 찾기</div>

      <!-- ============ Form ============ -->
      <template v-if="stage === 'form'">
        <!-- 이름 -->
        <q-input v-model="name" label="이름" class="q-my-md" filled />

        <!-- 생년월일 -->
        <q-input
          v-model="birthdate"
          label="생년월일 (YYYY-MM-DD)"
          class="q-my-md"
          filled
          mask="####-##-##"
          hint="예: 2000-07-15"
        >
          <template #append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="birthdate" mask="YYYY-MM-DD" :options="dateNotFuture" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <!-- 성별 -->
        <q-select
          v-model="gender"
          label="성별"
          class="q-my-md"
          filled
          :options="genderOptions"
          emit-value
          map-options
        />

        <div class="row items-center q-gutter-lg flex flex-center q-mt-md">
          <q-btn
            square
            unelevated
            label="Cancel"
            style="border: 1px solid lightgrey"
            @click="goLogin"
          />
          <q-btn
            square
            unelevated
            color="black"
            text-color="white"
            label="Find ID"
            :loading="loading"
            @click="findId"
          />
        </div>
      </template>

      <!-- ============ Result ============ -->
      <template v-else-if="stage === 'done'">
        <div class="q-mb-sm">일치하는 계정을 찾았습니다.</div>

        <q-card flat bordered class="q-pa-md q-mb-md">
          <div class="row items-center justify-between">
            <div class="text-subtitle1">{{ maskedEmail }}</div>
            <q-btn dense flat color="black" label="복사" @click="copyEmail" />
          </div>
        </q-card>

        <div class="row items-center q-gutter-lg flex flex-center">
          <q-btn
            square
            unelevated
            label="Back"
            style="border: 1px solid lightgrey"
            @click="resetForm"
          />
          <q-btn
            square
            unelevated
            color="black"
            text-color="white"
            label="Go to Login"
            @click="goLogin"
          />
        </div>
      </template>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'

const router = useRouter()
const $q = useQuasar()

// stage: 'form' | 'done'
const stage = ref('form')
const loading = ref(false)

// form fields
const name = ref('')
const birthdate = ref('') // YYYY-MM-DD
const gender = ref('')

// result
const foundEmail = ref('')

// 성별 옵션(emit-value/map-options 사용 → 객체 배열)
const genderOptions = [
  { label: '남', value: '남' },
  { label: '여', value: '여' },
]

// 오늘 이후 날짜 금지
const dateNotFuture = (ymd) => {
  const d = new Date(ymd)
  const today = new Date()
  d.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  return d <= today
}

const maskedEmail = computed(() => maskEmail(foundEmail.value))

function isValidBirth(v) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v || '')) return false
  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return false
  const today = new Date()
  d.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  return d <= today
}

function normalizeDate(v) {
  const s = String(v).trim().replace(/[./]/g, '-')
  const m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)
  if (!m) return s
  const [, y, mo, d] = m
  return `${y}-${mo.padStart(2, '0')}-${d.padStart(2, '0')}`
}

function maskEmail(email) {
  if (!email) return ''
  const [id, domain] = email.split('@')
  if (!id || !domain) return email
  const keep = Math.min(3, id.length)
  return id.slice(0, keep) + '*'.repeat(Math.max(1, id.length - keep)) + '@' + domain
}

function goLogin() {
  router.push('/login')
}

function resetForm() {
  stage.value = 'form'
  name.value = ''
  birthdate.value = ''
  gender.value = ''
  foundEmail.value = ''
}

async function findId() {
  // 간단 검증
  if (!name.value?.trim()) {
    $q.notify({ type: 'warning', message: '이름을 입력하세요.' })
    return
  }
  if (!isValidBirth(birthdate.value)) {
    $q.notify({
      type: 'warning',
      message: '생년월일을 YYYY-MM-DD 형식으로 입력하세요. (미래 날짜 불가)',
    })
    return
  }
  if (!gender.value) {
    $q.notify({ type: 'warning', message: '성별을 선택하세요.' })
    return
  }

  try {
    loading.value = true
    const payload = {
      name: name.value.trim(),
      birthdate: normalizeDate(birthdate.value),
      gender: gender.value,
    }
    const res = await api.post('/auth/find-id', payload)
    // 백엔드가 "string"을 반환한다고 되어 있으니 그대로 수용
    foundEmail.value = String(res.data || '')
    if (!foundEmail.value) {
      $q.notify({ type: 'negative', message: '일치하는 계정을 찾을 수 없습니다.' })
      return
    }
    stage.value = 'done'
  } catch (err) {
    console.error('find-id 실패', err)
    $q.notify({ type: 'negative', message: '조회 중 오류가 발생했습니다.' })
  } finally {
    loading.value = false
  }
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(foundEmail.value)
    $q.notify({ type: 'positive', message: '이메일을 복사했습니다.' })
  } catch {
    $q.notify({ type: 'warning', message: '복사에 실패했습니다.' })
  }
}
</script>
