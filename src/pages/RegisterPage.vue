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
const nationalityInput = ref('')
const jobInput = ref('')

// 선택 옵션들
const genderOptions = ['남', '여']
const nationalityOptions = ['대한민국', '미국', '일본', '중국', '영국', '독일', '프랑스', '캐나다']
const jobOptions = ['직장인', '프리랜서', '학생', '무직']

async function signUp() {
  // 비밀번호 일치 여부 확인
  if (newPwInput.value !== checkPwInput.value) {
    return alert('비밀번호가 일치하지 않습니다.')
  }

  try {
    // API 명세: POST /auth/register
    const res = await api.post('/auth/register', {
      email: newIdInput.value,
      password: newPwInput.value,
      username: newNameInput.value,
      gender: genderInput.value,
      nationality: nationalityInput.value,
      job: jobInput.value,
    })

    alert(res.data.message || '회원가입 성공')
    router.push('/login')
  } catch (err) {
    const status = err.response?.status
    if (status === 409) {
      alert('이미 등록된 이메일입니다.')
    } else if (status === 400) {
      alert('입력값을 확인해주세요.')
    } else {
      console.error(err)
      alert('회원가입 중 오류가 발생했습니다.')
    }
  }
}
</script>
