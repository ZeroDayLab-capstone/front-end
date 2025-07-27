<template>
  <q-page class="q-pa-lg">
    <MarkdownViewer />
  </q-page>
</template>

<script setup>
import MarkdownViewer from 'components/MarkdownViewer.vue'
</script>

<style>
.markdown-body h1 {
  font-size: 2.3rem; /* 대제목(#) */
  font-weight: bold;
  margin-left: 1rem;
  margin-top: 1.5rem;
  margin-bottom: none;
  color: #1a1a1a;
}
.markdown-body h2 {
  font-size: 1.7rem; /* 중제목(##) */
  font-weight: bold;
  margin-left: 3rem;
  margin-top: none;
  margin-bottom: 1rem;
  color: #232323;
}

.markdown-body h3 {
  font-size: 1.25rem; /* 소제목(###) */
  font-weight: 600;
  margin-top: 1.3rem;
  margin-bottom: 0.7rem;
  color: #353535;
}

.markdown-body p,
.markdown-body li {
  font-size: 1.2rem; /* 본문/리스트 */
  color: #232323;
  margin: 0;
  padding: 0;
}

.markdown-body img {
  display: block; /* 한 줄 전체 차지하게 (inline이 아니라 block) */
  margin: 1em auto; /* 위아래 2em, 좌우 자동 = "가운데 정렬" */
  max-width: 600px; /* 최대 크기 제한 (너무 커지지 않게) */
  width: 100%; /* 부모 크기 기준 자동 조정 */
}

.markdown-body table {
  border-collapse: collapse;
  width: 100%;
  max-width: 100%;
  margin: 1.5em 0;
  background: #fff;
  font-size: 1em;
  /* 아래 두 줄이 모바일에서 스크롤/깨짐 방지 */
  display: block;
  overflow-x: auto;
  /* block+overflow-x: auto를 주면 표가 좁은 곳에서 잘려 보이지 않고 가로스크롤됨 */
}

.markdown-body th,
.markdown-body td {
  border: 1px solid #d1d5db;
  padding: 10px 16px;
  min-width: 80px;
  text-align: left;
  word-break: keep-all; /* 한글도 안깨지게 */
}

.markdown-body th {
  background: #f5f7fa;
  font-weight: bold;
  color: #222;
}

.markdown-body tr:nth-child(even) {
  background: #fafbfc;
}
</style>
