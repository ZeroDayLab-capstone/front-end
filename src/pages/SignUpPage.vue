<template>
  <q-page class="flex flex-center">
    <q-card flat class="q-pa-md" style="border: 1px solid lightgrey">
      <div class="text-bold text-subtitle1" style="min-width: 400px">회원가입</div>
      <div>
        <q-input class="q-my-md" v-model="newIdInput" label="이메일" />
        <q-btn
          square
          class="full-width"
          unelevated
          color="black"
          text-color="white"
          label="인증"
          @Click="verifyEmail"
        ></q-btn>
      </div>
      <q-input class="q-my-md" v-model="verificationCode" label="인증번호 확인" />
      <q-input class="q-my-md" v-model="newPwInput" label="비밀번호" />
      <q-input class="q-my-md" v-model="checkPwInput" label="비밀번호 확인" />
      <q-input class="q-my-md" v-model="nickname" label="닉네임" />
      <q-input class="q-my-md" v-model="phone" label="전화번호" />
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

const newIdInput = ref()
const newPwInput = ref()
const checkPwInput = ref()
const nickname = ref()
const phone = ref()
const verificationCode = ref()

function verifyEmail() {
  api
    .post('/auth/register', { email: newIdInput.value })
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.error(error)
    })
}

function signUp() {
  api
    .post('/auth/finalize-registration', {
      email: newIdInput.value,
      password: newPwInput.value,
      verificationCode: verificationCode.value,
      nickname: nickname.value,
      phone: phone.value,
    })
    .then((res) => {
      console.log('회원가입 성공:', res)
    })
    .catch((error) => {
      console.error('회원가입 실패:', error)
    })
}
</script>
