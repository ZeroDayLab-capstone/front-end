<template>
  <q-page class="q-pa-md">
    <div class="text-h6">
      <div class="q-pb-sm">➡️ SSRF는 다음과 같은 서버 기능에서 주로 발생합니다.</div>
      <div>✅ 이미지 URL 검사 / 다운로드 기능</div>
      <ul class="q-mt-none">
        <li>이미지 URL을 제출받아 서버가 해당 이미지로부터 데이터를 읽어오는 기능</li>
      </ul>
      <div>✅ 웹훅 / 외부 API 호출</div>
      <ul class="q-mt-none">
        <li>사용자 입력에 따라 URL을 호출하거나, 결과를 사용자에게 보여주는 기능</li>
      </ul>
      <div>✅ PDF 생성, 미리보기, 콘텐츠 스크래핑 기능</div>
      <ul class="q-mt-none">
        <li>특정 URL을 입력 받아 내용을 렌더링하거나 추출하는 기능</li>
      </ul>
      <div>✅ Open Redirect와 함께 사용 시</div>
      <ul class="q-mt-none">
        <li>리디렉션 후 내부망 접근 우회 가능</li>
      </ul>
    </div>
  </q-page>
</template>

<script setup></script>
