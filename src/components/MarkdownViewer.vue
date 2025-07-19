<template>
  <div class="markdown-body" v-html="compiled"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'

// md 파일 불러오기 (Vite 기준)
const compiled = ref('')
const md = new MarkdownIt()

onMounted(async () => {
  // 경로 주의! 실제 파일 위치/이름 맞게 수정
  const files = import.meta.glob('../assets/markdown/*.md', {
    query: '?raw',
    import: 'default',
  })

  console.log('md files:', Object.keys(files))

  const importFn = files['../assets/markdown/test.md']
  console.log('importFn:', importFn)

  if (importFn) {
    const raw = await importFn()
    compiled.value = md.render(raw)
  } else {
    compiled.value = '문서를 불러올 수 없습니다.'
  }
})
</script>
