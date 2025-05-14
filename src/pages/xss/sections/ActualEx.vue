<template>
  <q-page class="q-pa-md">
    <div class="text-h6 text-weight-bold">🔥MySpace Samy 윔 (2005년)</div>
    <div class="row justify-center q-my-lg">
      <q-img :src="xss3" style="width: 400px"></q-img>
    </div>

    <div class="q-pl-md tet-body1">
      <div style="display: list-item; list-style-type: disc">
        공격자가 {{ codeSnippet }}를 프로필에 삽입하여 방문자 브라우저에서 자동 실행되는 XSS 웜을
        배포
      </div>
      <div style="display: list-item; list-style-type: disc">
        감염된 사용자의 프로필에도 자동으로 같은 스크립트가 삽입되어 기하급수적으로 확산
      </div>
      <div style="display: list-item; list-style-type: disc">
        하루 만에 100만 명 이상 감염 → MySpace 긴급 점검 및 보안 조치
      </div>
    </div>

    <div class="text-h6 text-weight-bold q-pt-xl">🔥트위터 XSS 자동 실행 공격 (2010년)</div>
    <div class="row justify-center q-my-lg">
      <q-img :src="xss4" style="width: 400px"></q-img>
    </div>

    <div class="q-pl-md text-body1">
      <div style="display: list-item; list-style-type: disc">
        특정 트윗에 onmouseover="..." 이벤트를 삽입하여 마우스 오버만 해도 코드 실행
      </div>
      <div style="display: list-item; list-style-type: disc">
        수많은 사용자가 악성 트윗을 리트윗하면서 웜처럼 확산
      </div>
      <div style="display: list-item; list-style-type: disc">
        트위터는 즉시 JavaScript 이벤트 필터링 및 CSP 정책 도입
      </div>
    </div>
  </q-page>
</template>

<script setup>
import xss3 from 'src/assets/xss3.png'
import xss4 from 'src/assets/xss4.jpg'

const codeSnippet = '<script>'
</script>
