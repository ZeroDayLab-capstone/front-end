<template>
  <q-page class="q-pa-md">
    <div class="row justify-center q-my-lg">
      <q-img :src="command5" style="width: 750px"></q-img>
    </div>

    <div class="text-h5 q-pt-xl text-weight-bold">✅후속 공격</div>
    <div class="text-h6">
      <div class="q-py-sm">
        1. 리버스 쉘 연결(<span style="color: red"> bash -i >& /dev/tcp... </span>)
      </div>
      <div class="q-py-sm">2. 시스템 파괴(<span style="color: red"> rm -rf / </span>)</div>
      <div class="q-py-sm">3. 내부망 스캔 후 lateral movement</div>
      <div class="q-py-sm">4. WAF 및 로그 삭제</div>
    </div>

    <div class="text-h5 q-pt-xl text-weight-bold">✅보완할 보안 포인트</div>
    <div class="text-h6">
      <div class="q-py-sm">
        1. <span style="color: red">auditd, PowerShell Transcript </span>등으로 명령 실행 모니터링
      </div>
      <div class="q-py-sm">2. Seccomp, AppArmor 사용으로 명령 실행 제어</div>
      <div class="q-py-sm">
        3. 메타문자 정규식 필터링(<span style="color: red"> [;&|$()``] </span>등)
      </div>
    </div>
  </q-page>
</template>

<script setup>
import command5 from 'src/assets/command5.png'
</script>
