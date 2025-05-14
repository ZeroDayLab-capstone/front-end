<template>
  <q-page class="q-pa-md">
    <div class="text-body1">
      <div>Command Injection 취약점은 다음과 같은 기능에서 주로 발생합니다.</div>
      <div class="q-py-sm">✅네트워크 관련 기능</div>
      <div style="display: list-item; list-style-type: disc">
        <span style="color: red">ping, traceroute, nslookup</span> 등 네트워크 도구 실행 기능
      </div>
      <div class="q-py-sm">✅파일 처리 기능</div>
      <div style="display: list-item; list-style-type: disc">
        로그 관리, 백업 및 복원 기능에서 시스템 명령어 실행
      </div>
      <div class="q-py-sm">✅관리자 기능</div>
      <div style="display: list-item; list-style-type: disc">
        서버 명령어를 직접 실행하는 관리자 페이지
      </div>
      <div class="q-py-sm">✅웹 서버 스크립트</div>
      <div style="display: list-item; list-style-type: disc">
        CGI 스크립트 또는 백엔드 코드에서 시스템 명령어 실행
      </div>
      <div class="q-py-sm">✅자동화된 시스템 관리 스크립트</div>
      <div style="display: list-item; list-style-type: disc">
        특정 작업을 자동화하는 백그라운드 스크립트에서 실행
      </div>
    </div>
  </q-page>
</template>

<script setup></script>
