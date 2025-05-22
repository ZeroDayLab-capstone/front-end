<template>
  <q-page class="column flex flex-center">
    <q-card flat square class="q-pa-md" style="border: 1px solid lightgrey">
      <div class="text-bold text-subtitle1" style="min-width: 500px">로그인</div>
      <q-input square class="q-my-md" filled v-model="idInput" label="이메일" />
      <q-input type="password" square class="q-mb-md" filled v-model="pwInput" label="비밀번호" />
      <q-btn
        square
        class="full-width q-mb-md"
        unelevated
        color="black"
        label="로그인"
        @click="login"
      />

      <div class="row items-center q-gutter-lg flex flex-center">
        <span class="cursor-pointer">아이디 찾기</span>
        <span class="cursor-pointer" @click="toFindPwd">비밀번호 찾기</span>
        <span class="cursor-pointer" @click="toSignUp">회원가입</span>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const idInput = ref('')
const pwInput = ref('')

async function login() {
  if (!idInput.value.trim() || !pwInput.value) {
    alert('이메일과 비밀번호를 모두 입력하세요.')
    return
  }

  try {
    await auth.login(idInput.value, pwInput.value)
    router.push('/main')
  } catch (err) {
    if (err.response?.status === 401 && err.response?.data?.errorcode === 'AUTH_401') {
      alert('이메일 또는 비밀번호가 올바르지 않습니다.')
    } else {
      console.error(err)
      alert('로그인 중 오류가 발생했습니다.')
    }
  }
}

const toSignUp = () => router.push('/register')
const toFindPwd = () => router.push('/findpwd')
</script>
