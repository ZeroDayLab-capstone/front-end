<template>
  <q-page class="q-pa-md">
    <div class="text-body1">
      <div>
        ➡️ XSS는 웹 애플리케이션이 사용자의 입력값을 제대로 검증하지 않거나, 출력 시 이스케이프
        처리하지 않을
      </div>
      <div>때 발생합니다.</div>
    </div>

    <div class="text-h5 q-py-md">✅주요 원인</div>
    <div class="text-body1">
      <div>1. 출력 시 HTML 이스케이프 미적용</div>
      <div style="display: list-item; list-style-type: disc">
        {{ codeSnippet }} 등의 문자가 그대로 출력되면 브라우저가 코드로 해석
      </div>
      <div class="q-pt-sm">2. 이밴트 속성 또는 URL 필터링 미흡</div>
      <div style="display: list-item; list-style-type: disc">
        onerror=, onload=, href="Javascript:.." 같은 우회 방식 사용 가능
      </div>
      <div class="q-pt-sm">3. DOM 조작 시 안전한 API 미사용</div>
      <div style="display: list-item; list-style-type: disc">
        innerHTML을 사용하면 문자열이 HTML로 파싱됨
      </div>
      <div style="display: list-item; list-style-type: disc">
        대신 textContent, createTextNode() 등을 사용해야 안전
      </div>
    </div>
  </q-page>
</template>

<script setup>
const codeSnippet = '<, >, ", '
</script>
