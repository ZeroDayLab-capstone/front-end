<template>
  <q-page class="q-pa-md">
    <div class="text-h6">
      ➡️ 웹 애플리케이션이 요청의 출처를 제대로 검증하지 않기 때문에 발생합니다.
    </div>
    <div class="text-h5 q-mt-lg text-weight-bold">✅주요 원인</div>
    <div class="text-h6">
      <div class="q-mt-md">1. 자동으로 쿠키가 전송됨</div>
      <ul class="q-mt-none">
        <li>브라우저는 같은 도메인에서 요청이 발생하면 자동으로 세션 쿠키를 포함</li>
        <li>공격자가 만든 요청에도 사용자의 세션이 적용될 수 있음</li>
      </ul>

      <div class="q-mt-md">2. 요청의 출처(origin)를 검사하지 않음</div>
      <ul class="q-mt-none">
        <li>
          서버가 요청이 example.com에서 왔는지, attacker.com에서 왔는지 구별하지 않으면 공격자의
          요청도 정상적인 요청처럼 처리됨
        </li>
      </ul>

      <div class="q-mt-md">3. CSRF 토큰 미사용</div>
      <ul class="q-mt-none">
        <li>CSRF 방지를 위해 csrf_token을 사용해야 하지만, 일부 사이트에서는 이를 적용하지 않음</li>
      </ul>
    </div>
  </q-page>
</template>

<script setup></script>
