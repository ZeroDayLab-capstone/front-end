<template>
  <q-page class="column items-center q-pa-lg">
    <!-- 헤더 텍스트 (기존 유지) -->
    <div class="column text-h6 text-center text-bold">
      <span>Please enter your username</span>
      <span>and contact info on your</span>
      <span>TrendPick account.</span>
    </div>
    <div class="column text-center q-mt-sm">
      <span>Verification code will be sent to you</span>
      <span>via the contact info you chose.</span>
    </div>

    <q-card flat square class="q-pa-md q-mt-lg" style="border: 1px solid lightgrey">
      <div class="text-bold text-subtitle1 q-pb-sm" style="min-width: 500px">비밀번호 찾기</div>

      <!-- Stage 1: 이메일/닉네임 입력 & 코드 발송 -->
      <template v-if="stage === 'request'">
        <q-input square class="q-mb-md" filled v-model="nickname" label="닉네임" />
        <q-input square class="q-my-md" filled v-model="email" label="이메일" />

        <div class="row items-center q-gutter-lg flex flex-center">
          <q-btn
            square
            unelevated
            label="Cancel"
            style="border: 1px solid lightgrey"
            @click="goToLogin"
          />
          <q-btn
            square
            unelevated
            color="black"
            label="Continue"
            :loading="loading"
            @click="sendCode"
          />
        </div>
      </template>

      <!-- Stage 2: 인증코드 확인 -->
      <template v-else-if="stage === 'verify'">
        <div class="q-mb-md">이메일로 전송된 인증코드를 입력하세요.</div>
        <q-input
          square
          class="q-my-md"
          filled
          v-model="code"
          label="인증코드 (6자리)"
          maxlength="6"
        />

        <div class="row items-center q-gutter-lg flex flex-center">
          <q-btn
            square
            unelevated
            label="Back"
            style="border: 1px solid lightgrey"
            @click="stage = 'request'"
          />
          <q-btn
            square
            unelevated
            color="black"
            label="Verify"
            :loading="loading"
            @click="verifyCode"
          />
        </div>

        <div class="q-mt-md text-caption text-grey-7">
          {{ email }} 로 보냈습니다.
          <q-btn flat dense no-caps class="q-ml-sm" :disable="cooldown > 0" @click="resend"
            >재전송 {{ cooldown > 0 ? `(${cooldown}s)` : '' }}</q-btn
          >
        </div>
      </template>

      <!-- Stage 3: 새 비밀번호 설정 -->
      <template v-else-if="stage === 'reset'">
        <q-input
          square
          class="q-my-md"
          filled
          v-model="newPassword"
          label="새 비밀번호"
          type="password"
        />
        <q-input
          square
          class="q-my-md"
          filled
          v-model="newPasswordConfirm"
          label="새 비밀번호 확인"
          type="password"
        />

        <div class="row items-center q-gutter-lg flex flex-center">
          <q-btn
            square
            unelevated
            label="Back"
            style="border: 1px solid lightgrey"
            @click="stage = 'verify'"
          />
          <q-btn
            square
            unelevated
            color="black"
            label="Reset Password"
            :loading="loading"
            @click="resetPassword"
          />
        </div>
      </template>

      <!-- Stage 4: 완료 -->
      <template v-else-if="stage === 'done'">
        <div class="q-mb-md">비밀번호가 변경되었습니다. 새 비밀번호로 로그인 해주세요.</div>
        <div class="row items-center q-gutter-lg flex flex-center">
          <q-btn square unelevated color="black" label="Go to Login" @click="goToLogin" />
        </div>
      </template>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'

const router = useRouter()
const $q = useQuasar()

// 입력값
const email = ref('')
const nickname = ref('') // 지금은 서버에 안 보냄(추후 스키마 확장 시 활성화)
const code = ref('')
const newPassword = ref('')
const newPasswordConfirm = ref('')

// 화면 단계: 'request' | 'verify' | 'reset' | 'done'
const stage = ref('request')

// 상태
const loading = ref(false)
const cooldown = ref(0)
let cooldownTimer = null

const goToLogin = () => router.push('/login')

function startCooldown(sec = 60) {
  cooldown.value = sec
  clearInterval(cooldownTimer)
  cooldownTimer = setInterval(() => {
    cooldown.value -= 1
    if (cooldown.value <= 0) clearInterval(cooldownTimer)
  }, 1000)
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || '')
}

// 1) 인증코드 발송
async function sendCode() {
  if (!isValidEmail(email.value)) {
    $q.notify({ type: 'warning', message: '올바른 이메일을 입력하세요.' })
    return
  }
  try {
    loading.value = true
    // 지금 백엔드 스키마는 email만 허용
    await api.post('/auth/send-reset-code', { email: email.value })
    // (미래 스키마에서 name도 받게 되면 아래 주석을 사용)
    // await api.post('/auth/send-reset-code', { email: email.value, name: nickname.value })

    // 계정 열거 방지 UX: 성공/실패와 무관하게 동일 메시지 사용 권장
    $q.notify({ type: 'positive', message: '인증코드를 전송했습니다. 메일함을 확인하세요.' })
    stage.value = 'verify'
    startCooldown(60)
  } catch (err) {
    // 의도적으로 동일 메시지
    $q.notify({ type: 'positive', message: '인증코드를 전송했습니다. 메일함을 확인하세요.' })
    stage.value = 'verify'
    startCooldown(60)
    // 콘솔에는 실제 에러 남겨 디버깅
    console.error('send-reset-code 실패', err)
  } finally {
    loading.value = false
  }
}

// 1-1) 재전송
async function resend() {
  if (cooldown.value > 0) return
  await sendCode()
}

// 2) 인증코드 확인
async function verifyCode() {
  if (!code.value || code.value.length < 4) {
    $q.notify({ type: 'warning', message: '인증코드를 입력하세요.' })
    return
  }
  try {
    loading.value = true
    await api.post('/auth/verify-reset-code', {
      email: email.value,
      code: code.value,
      // 미래 스키마에서 name 필요하면 여기에 포함 가능
      // name: nickname.value,
    })
    $q.notify({ type: 'positive', message: '인증이 완료되었습니다.' })
    stage.value = 'reset'
  } catch (err) {
    $q.notify({ type: 'negative', message: '인증코드가 올바르지 않습니다.' })
    console.error('verify-reset-code 실패', err)
  } finally {
    loading.value = false
  }
}

// 3) 새 비밀번호 설정
async function resetPassword() {
  if (!newPassword.value || newPassword.value.length < 8) {
    $q.notify({ type: 'warning', message: '비밀번호는 8자 이상이어야 합니다.' })
    return
  }
  if (newPassword.value !== newPasswordConfirm.value) {
    $q.notify({ type: 'warning', message: '비밀번호가 일치하지 않습니다.' })
    return
  }

  try {
    loading.value = true
    await api.post('/auth/reset-password', {
      email: email.value,
      new_password: newPassword.value,
      // name 추가 스키마가 생기면 함께 전송 가능
      // name: nickname.value,
    })
    $q.notify({ type: 'positive', message: '비밀번호가 변경되었습니다.' })
    stage.value = 'done'
  } catch (err) {
    $q.notify({ type: 'negative', message: '비밀번호 변경에 실패했습니다.' })
    console.error('reset-password 실패', err)
  } finally {
    loading.value = false
  }
}
</script>
