<template>
  <q-page class="q-pa-md">
    <div class="text-weight-bold text-h5 q-mt-md">🔥 Gmail CSRF 공격 (2007년)</div>
    <div class="row justify-center q-my-lg">
      <q-img :src="csrf3" style="width: 800px"></q-img>
    </div>
    <div class="text-h6">
      <div style="display: list-item; list-style-type: disc">
        공격자가 Gmail 사용자에게 비밀번호 번경 요청을 자동으로 전송하는 CSRF 공격을 실행
      </div>
      <div style="display: list-item; list-style-type: disc">
        사용자가 악성 페이지에 방문하여, 비밀번호가 공격자가 원하는 값으로 변경됨
      </div>
      <div style="display: list-item; list-style-type: disc">
        Google은 이후 보안 패치를 적용하여 CSRF 방어 기능을 강화함
      </div>
    </div>

    <div class="text-weight-bold text-h5 q-mt-xl">🔥 온라인 뱅킹 CSRF 공격 (2007년)</div>
    <div class="row justify-center q-my-lg">
      <q-img :src="csrf4" style="width: 800px"></q-img>
    </div>
    <div class="text-h6">
      <div style="display: list-item; list-style-type: disc">
        사용자가 로그인한 상태에서 악성 링크를 클릭하면 공격자의 계좌로 돈이 자동 송금되는 공격이
        발생
      </div>
      <div style="display: list-item; list-style-type: disc">
        이후 대부분의 온라인 뱅킹 사이크가 CSRF 토큰을 필수적으로 적용
      </div>
    </div>
  </q-page>
</template>

<script setup>
import csrf3 from 'src/assets/img/csrf/incidents/csrf-incidents-01.png'
import csrf4 from 'src/assets/img/csrf/incidents/csrf-incidents-02.png'
</script>
