<template>
  <q-page class="column items-center q-pa-lg">
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
        <q-btn square unelevated color="black" label="Continue" @click="findpassword" />
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
//import { api } from 'src/boot/axios'

const email = ref()
const nickname = ref()
const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

// function findpassword() {
//   api.post('/auth/find-password', {
//     email: email.value,
//   })
// }
</script>
