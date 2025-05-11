<template>
  <q-page class="q-pa-md">
    <div class="centered-container">
      <!-- 섹션 제목 -->
      <h2>{{ currentSection.title }}</h2>

      <!-- fetch 한 마크다운을 HTML로 변환해 삽입 -->
      <div class="q-mt-md" v-html="sanitizedHtml" />

      <!-- 이전/다음 버튼 -->
      <div class="bottom-right-buttons">
        <q-btn
          v-if="currentIndex > 0"
          label="이전"
          color="black"
          text-color="white"
          class="q-mr-sm"
          @click="goPrevious"
        />
        <q-btn
          v-if="currentIndex < sections.length - 1"
          label="다음"
          color="black"
          text-color="white"
          @click="goNext"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// 1) public/markdown/web-intro 하위에 복사해 두신 경로
const sections = [
  { title: '1. 웹', src: '/markdown/web-intro/web.md' },
  { title: '2. HTTP/HTTPS', src: '/markdown/web-intro/http-https.md' },
  { title: '3. Web Browser', src: '/markdown/web-intro/web-browser.md' },
  { title: '4. Browser DevTools', src: '/markdown/web-intro/browser-devtools.md' },
  { title: '5. Cookie/Session', src: '/markdown/web-intro/cookie-session.md' },
  { title: '6. Caching', src: '/markdown/web-intro/caching.md' },
  { title: '7. DBMS', src: '/markdown/web-intro/dbms.md' },
  { title: '8. 클라이언트/서버 취약점', src: '/markdown/web-intro/client-server-side-vuln.md' },
]

const router = useRouter()
const route = useRoute()
const currentIndex = ref(0)
const markdownRaw = ref('')

// 쿼리(sec)에 맞춰 currentIndex 설정
watchEffect(() => {
  const sec = parseInt(route.query.sec, 10)
  currentIndex.value = !isNaN(sec) && sec >= 0 && sec < sections.length ? sec : 0

  // 섹션이 바뀔 때마다 새 md 파일 fetch
  fetch(sections[currentIndex.value].src)
    .then((res) => res.text())
    .then((text) => {
      // marked 로 HTML 변환 후 DOMPurify 로 sanitize
      markdownRaw.value = DOMPurify.sanitize(marked.parse(text))
    })
})

// 안전하게 삽입할 최종 HTML
const sanitizedHtml = computed(() => markdownRaw.value)

function goPrevious() {
  if (currentIndex.value > 0) {
    router.push({ path: '/webbasic', query: { sec: currentIndex.value - 1 } })
  }
}
function goNext() {
  if (currentIndex.value < sections.length - 1) {
    router.push({ path: '/webbasic', query: { sec: currentIndex.value + 1 } })
  }
}
</script>

<style scoped>
.centered-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
}
.bottom-right-buttons {
  position: fixed;
  bottom: 80px;
  right: 32px;
  display: flex;
}
.q-mr-sm {
  margin-right: 8px;
}
</style>
