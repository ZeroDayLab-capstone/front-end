<template>
  <q-page class="q-pa-md">
    <div class="text-body1">
      <div>
        ➡️XSS는 HTML, JavaScript, 속성(attribute), URL 등 사용자 입력이 포함되는 모든 영역에서
        발생할 수 있습니다.
      </div>
      <div class="q-pt-sm">✅ 사용자 입력값을 출력하는 모든 페이지</div>
      <div>
        게시판, 댓글, 검색 결과, 프로필 페이지 등 사용자의 입력이 브라우저에서 그대로 렌더링될 경우
      </div>
      <div>입력 필터링이 약하거나 없는 경우</div>
      <div class="q-pt-sm">
        ✅ {{ codeSnippet2 }}만 제거하고, onerror=, javascript: 등은 허용하는 경우
      </div>
      <div>단순 문자열 치환만 수행할 경우 우회 가능</div>
      <div class="q-pt-sm">✅ 클라이언트(JavaScript)에서 DOM 조작 시 발생 (DOM-based XSS)</div>
      <div>
        innerHTML, document.write() 등을 사용할 때 사용자의 입력을 검증 없이 DOM에 직접 삽입하는
        경우
      </div>
    </div>
  </q-page>
</template>

<script setup>
const codeSnippet2 = '<script>'
</script>
