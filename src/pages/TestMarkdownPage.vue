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
  margin-top: 2.4rem;
  margin-bottom: 1.2rem;
  color: #1a1a1a;
}
.markdown-body h2 {
  font-size: 1.7rem; /* 중제목(##) */
  font-weight: bold;
  margin-top: 1.8rem;
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
  font-size: 1.06rem; /* 본문/리스트 */
  color: #232323;
}

.markdown-body table {
  font-size: 1rem; /* 표 내부 글자 */
}
</style>
