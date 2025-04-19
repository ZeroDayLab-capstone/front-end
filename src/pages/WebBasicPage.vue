<template>
  <q-page style="padding: 0">
    <div class="centered-container">
      <!-- 현재 섹션 제목 -->
      <h2>{{ currentSection.title }}</h2>

      <!-- 본문 HTML (DOMPurify) -->
      <div v-html="sanitizedHTML(currentSection.content)"></div>

      <!-- '이전 / 다음' 버튼 -->
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
import DOMPurify from 'dompurify'
import sections from 'src/data/webBasicSections/index.js'

// 예: sections = [ { title, content }, { title, content }, ... ]
// (총 8개 섹션이라고 가정)

// 라우터 훅
const router = useRouter()
const route = useRoute()

// 현재 인덱스
const currentIndex = ref(0)

// 현재 섹션
const currentSection = computed(() => sections[currentIndex.value])

// 쿼리 파라미터 sec와 currentIndex 동기화
watchEffect(() => {
  const secParam = parseInt(route.query.sec, 10)
  if (!isNaN(secParam) && secParam >= 0 && secParam < sections.length) {
    currentIndex.value = secParam
  } else {
    currentIndex.value = 0
  }
})

// 이전/다음 버튼 로직
function goPrevious() {
  const nextIdx = currentIndex.value - 1
  if (nextIdx >= 0) {
    router.push({ path: '/webbasic', query: { sec: nextIdx } })
  }
}
function goNext() {
  const nextIdx = currentIndex.value + 1
  if (nextIdx < sections.length) {
    router.push({ path: '/webbasic', query: { sec: nextIdx } })
  }
}

// v-html용 DOMPurify
function sanitizedHTML(htmlString) {
  return DOMPurify.sanitize(htmlString)
}
</script>

<style scoped>
.centered-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
  text-align: left;
}

.bottom-right-buttons {
  position: fixed;
  bottom: 80px; /* 푸터 높이+여유 */
  right: 32px;
  display: flex;
  flex-direction: row;
}

.q-mr-sm {
  margin-right: 8px;
}
</style>
