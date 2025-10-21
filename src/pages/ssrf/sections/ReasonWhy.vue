<template>
  <q-page class="q-pa-md">
    <div class="text-h6">
      <div class="q-pb-lg">
        ➡️ SSRF는 애플리케이션이 사용자의 입력을 기반으로 서버 측 요청을 생성하는 과정에서, 이 를
        검증하지 않고 실행할 때 발생합니다.
      </div>
      <div class="text-h5 text-bold">✅ 주요 원인</div>
      <div class="q-pl-sm">
        <div>1. 사용자 입력값에 대한 검증 미흡 (IP, 포트, 프로토콜 등)</div>
        <div>2. 요청 전 DNS/IP 재해석 없이 단순 문자열 필터링만 수행</div>
        <div>3. 요청 후 리디렉션 검증 미흡</div>
        <div>
          4. 신뢰할 수 없는 입력값으로 <span style="color: red">curl</span>,
          <span style="color: red">urllib</span>, <span style="color: red">fetch</span> 등 외부 호출
          라이브러리를 직접 호출
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup></script>
