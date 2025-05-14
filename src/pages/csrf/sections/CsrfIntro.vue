<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold">✅소개</div>
    <div class="row justify-center q-mb-lg">
      <q-img :src="csrf1" style="width: 400px"></q-img>
    </div>
    <div class="text-body1">
      <div class="q-mt-md" style="display: list-item; list-style-type: disc">
        CSRF(Cross-Site Request Forgery, 사이트 간 요청 위조)는 공격자가 사용자를 속여 원하지 않는
        요청을 특정 웹사이트에 보내도록 유도하는 공격 기법입니다.
      </div>
      <div class="q-mt-md" style="display: list-item; list-style-type: disc">
        사용자의 세션을 악용하여 인증된 요청을 실행하도록 유도하며, 피해자는 자신도 모르게 공격자의
        의도대로 행동하게 됩니다.
      </div>
    </div>

    <div class="text-h5 text-weight-bold q-mt-xl">✅CSRF 작동 원리</div>
    <div class="row justify-center q-mb-lg">
      <q-img :src="csrf2" style="width: 400px"></q-img>
    </div>
    <div class="text-body1">
      <div>1. 사용자가 `example.com`에 로그인하면 브라우저에 세션 쿠키가 저장</div>
      <div>2. 사용자가 공격자가 만든 악성 페이지(`attacker.com`)를 방문</div>
      <div>3. 해당 페이지에서 `example.com`으로 자동 HTTP 요청을 보냄</div>
      <div>4. 사용자의 세션 쿠키가 포함된 요청이 서버에서 정상적인 요청으로 처리됨</div>
      <div>
        ➡️ 즉, 공격자는 사용자의 인증 정보를 직접 탈취하지 않고도 사용자의 권한을 악용할 수
        있습니다.
      </div>
    </div>
  </q-page>
</template>

<script setup>
import csrf1 from 'src/assets/csrf1.png'
import csrf2 from 'src/assets/csrf2.png'
</script>
