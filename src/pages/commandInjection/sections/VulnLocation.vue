<template>
  <q-page class="q-pa-md">
    <div class="text-h6">
      <div>Command Injection 취약점은 다음과 같은 기능에서 주로 발생합니다.</div>
      <div class="q-pt-md text-weight-bold">✅네트워크 관련 기능</div>
      <ul class="q-mt-none">
        <li>
          <span style="color: red">ping, traceroute, nslookup</span> 등 네트워크 도구 실행 기능
        </li>
      </ul>
      <div class="q-py-sm text-weight-bold">✅파일 처리 기능</div>
      <ul class="q-mt-none">
        <li>로그 관리, 백업 및 복원 기능에서 시스템 명령어 실행</li>
      </ul>
      <div class="q-py-sm text-weight-bold">✅관리자 기능</div>
      <ul class="q-mt-none">
        <li>서버 명령어를 직접 실행하는 관리자 페이지</li>
      </ul>
      <div class="q-py-sm text-weight-bold">✅웹 서버 스크립트</div>
      <ul class="q-mt-none">
        <li>CGI 스크립트 또는 백엔드 코드에서 시스템 명령어 실행</li>
      </ul>

      <div class="q-py-sm text-weight-bold">✅자동화된 시스템 관리 스크립트</div>
      <ul class="q-mt-none">
        <li>특정 작업을 자동화하는 백그라운드 스크립트에서 실행</li>
      </ul>
    </div>
  </q-page>
</template>

<script setup></script>
