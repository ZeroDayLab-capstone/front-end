<template>
  <q-page class="q-pa-md">
    <div class="row justify-center q-mb-lg">
      <q-img :src="csrf5" style="width: 750px"></q-img>
    </div>

    <div class="text-h5 text-weight-bold">✅후속 공격</div>
    <div class="text-h6 q-pl-sm">
      <div>1. 계정 정보 변경(이메일, 비밀번호)</div>
      <div>2. 자동 결제/이체 요청</div>
      <div>3. 관리자 권한 변경 요청 등</div>
    </div>

    <div class="text-h5 text-weight-bold q-mt-lg">✅보완할 보안 포인트</div>
    <div class="text-h6 q-pl-sm">
      <div>
        1. SPA 또는 JWT 기반 인증 환경에서도 CSRF 가능성 고려할 필요가 있습니다. (특히
        SameSite=None)
      </div>
      <div>2. JSON 기반 API도 CSRF 대상이 될 수 있으므로 CSRF 토큰 적용할 필요가 있습니다.</div>
      <div>3. 브라우저 보안 설정과 서버 측 대응 모두 필요합니다.</div>
    </div>
  </q-page>
</template>

<script setup>
import csrf5 from 'src/assets/csrf5.png'
</script>
