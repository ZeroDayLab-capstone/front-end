<template>
  <q-page class="q-pa-md">
    <div class="text-h6">
      <div>➡️ CSRF는 세션 기반 인증을 사용하는 모든 웹 애플리케이션에서 발생할 수 있습니다.</div>
      <div>특히, 다음과 같은 환경에서 자주 발견됩니다.</div>
      <div class="text-weight-bold q-mt-md">✅ 로그인 유지가 필요한 웹사이트</div>
      <ul class="q-mt-none">
        <li>온라인 뱅킹, 결제 시스템, 이메일 서비스, 쇼핑몰 등</li>
        <li>사용자가 로그인한 상태에서 요청이 이루어지는 경우 취약</li>
      </ul>

      <div class="text-weight-bold q-mt-md">✅ 쿠키 기반 인증 시스템</div>
      <ul class="q-mt-none">
        <li>CSRF는 서버가 쿠키만으로 인증을 처리할 때 발생</li>
        <li>HTTP요청에 자동으로 쿠키가 포함되므로 공격자가 악용할 가능성 높음</li>
      </ul>

      <div class="text-weight-bold q-mt-md">✅ CSRF 방어 기법이 적용되지 않는 경우</div>
      <ul class="q-mt-none">
        <li>CSRF 토큰이 없거나 검증하지 않는 경우</li>
        <li>SameSite 쿠키 설정이 되어 있지 않은 경우</li>
      </ul>
    </div>
  </q-page>
</template>

<script setup></script>
