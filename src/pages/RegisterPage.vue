<template>
  <q-page class="flex flex-center">
    <q-card flat class="q-pa-md" style="border: 1px solid lightgrey">
      <div class="text-bold text-subtitle1" style="min-width: 400px">회원가입</div>

      <!-- 이메일, 사용자명 입력 -->
      <q-input class="q-my-md" v-model="newIdInput" label="이메일" />

      <q-input class="q-my-md" v-model="newNameInput" label="사용자명" />

      <!-- 비밀번호 입력 및 확인 -->
      <q-input type="password" class="q-my-md" v-model="newPwInput" label="비밀번호" />
      <q-input type="password" class="q-my-md" v-model="checkPwInput" label="비밀번호 확인" />

      <!-- 성별 선택 -->
      <q-select
        class="q-my-md"
        v-model="genderInput"
        label="성별"
        :options="genderOptions"
        emit-value
        map-options
      />

      <!-- ✅ 생년월일 (성별 바로 밑) -->
      <q-input
        class="q-my-md"
        v-model="birthdateInput"
        label="생년월일 (YYYY-MM-DD)"
        mask="####-##-##"
        hint="예: 2000-07-15"
      >
        <template #append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="birthdateInput" mask="YYYY-MM-DD" :options="dateNotFuture" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <!-- 국적 선택 -->
      <q-select
        class="q-my-md"
        v-model="nationalityInput"
        label="국적"
        :options="nationalityOptions"
        emit-value
        map-options
      />

      <!-- 직업 선택 -->
      <q-select
        class="q-my-md"
        v-model="jobInput"
        label="직업"
        :options="jobOptions"
        emit-value
        map-options
      />

      <!-- 회원가입 버튼 -->
      <q-btn
        square
        class="full-width q-mt-md"
        unelevated
        color="black"
        text-color="white"
        label="회원가입"
        @click="signUp"
      />
    </q-card>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const newNameInput = ref('')
const router = useRouter()
const newIdInput = ref('')
const newPwInput = ref('')
const checkPwInput = ref('')
const genderInput = ref('')
const birthdateInput = ref('')
const nationalityInput = ref('')
const jobInput = ref('')

// 선택 옵션들
const genderOptions = ['남', '여']
const nationalityOptions = ['대한민국', '미국', '일본', '중국', '영국', '독일', '프랑스', '캐나다']
const jobOptions = ['직장인', '프리랜서', '학생', '무직']

// 생년월일 유효성 (미래 날짜 금지)
const dateNotFuture = (ymd) => {
  // ymd: 'YYYY/MM/DD'가 아닌 'YYYY-MM-DD'로 들어오도록 mask 지정했음
  // QDate는 mask에 맞춰 넘겨줌
  const d = new Date(ymd)
  const today = new Date()
  d.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  return d <= today
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || '')
}
function isValidBirth(v) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v || '')) return false
  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return false
  const today = new Date()
  d.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  return d <= today
}

async function signUp() {
  // 간단 검증
  if (!isValidEmail(newIdInput.value)) {
    alert('올바른 이메일을 입력하세요.')
    return
  }
  if (!newNameInput.value?.trim()) {
    alert('사용자명을 입력하세요.')
    return
  }
  if (newPwInput.value !== checkPwInput.value) {
    alert('비밀번호가 일치하지 않습니다.')
    return
  }
  if (!genderInput.value) {
    alert('성별을 선택하세요.')
    return
  }
  if (!isValidBirth(birthdateInput.value)) {
    alert('생년월일을 YYYY-MM-DD 형식으로 입력하세요.')
    return
  }
  if (!nationalityInput.value) {
    alert('국적을 선택하세요.')
    return
  }
  if (!jobInput.value) {
    alert('직업을 선택하세요.')
    return
  }
  const payload = {
    email: newIdInput.value,
    password: newPwInput.value,
    username: newNameInput.value,
    gender: genderInput.value,
    nationality: nationalityInput.value,
    job: jobInput.value,
    birthdate: normalizeDate(birthdateInput.value), // "YYYY-MM-DD"로 정규화
  }

  try {
    const res = await api.post('/auth/register', payload)
    alert(res.data.message || '회원가입 성공')
    router.push('/login')
  } catch (err) {
    const status = err.response?.status
    if (status === 409) {
      alert('이미 등록된 이메일입니다.')
    } else if (status === 400 || status === 422) {
      alert('입력값을 확인해주세요.')
    } else {
      console.error(err)
      alert('회원가입 중 오류가 발생했습니다.')
    }
  }
}

// ⬇️ 간단 정규화: 2000.7.5 / 2000/7/5 → 2000-07-05
function normalizeDate(v) {
  const s = String(v).trim().replace(/[./]/g, '-')
  const m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)
  if (!m) return s
  const [, y, mo, d] = m
  return `${y}-${mo.padStart(2, '0')}-${d.padStart(2, '0')}`
}
</script>
