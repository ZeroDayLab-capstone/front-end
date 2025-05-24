<template>
  <q-page class="q-pa-md">
    <div class="row justify-center q-my-lg">
      <q-img :src="xss1" style="width: 750px"></q-img>
    </div>

    <div class="text-h5 text-weight-bold q-pt-lg">✅후속 공격</div>
    <ul class="text-h6">
      <li>계정 정보 탈취(세션 쿠키, 로그인 토근 등)</li>
      <li class="q-py-sm">키 입력 감시를 통한 비밀번호/카드번호 등 민감정보 수집</li>
      <li class="q-pb-sm">관리 권한 위임/변경 요청 등 권한 상승 시도</li>
      <li>악성 스크립트를 통한 백도어/피싱 재유포</li>
    </ul>

    <div class="text-h5 text-weight-bold q-pt-lg">✅보완할 보안 포인트</div>
    <ul class="text-h6">
      <li>입력값 필터링 및 출력 시 인코딩 적용 (XSS 방지의 기본)</li>
      <li class="q-py-sm">Content Security Policy(CSP) 설정으로 외부 스크립트 제한</li>
      <li>쿠키에 HttpOnly 및 Secure, SameSite 속성 적용</li>
      <li class="q-py-sm">브라우저 보안 헤더 설정 (X-XSS-Protection, X-Content-Type-Options 등)</li>
      <li>DOM 기반 스크립트는 검증된 라이브러리(OOMPurity 등)로 필터링</li>
    </ul>
  </q-page>
</template>

<script setup>
import xss1 from 'src/assets/xss6.png'
</script>
