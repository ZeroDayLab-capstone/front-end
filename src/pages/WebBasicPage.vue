<template>
  <q-page class="q-pa-md">
    <div class="centered-container">
      <!-- 현재 섹션 제목 -->
      <h2>{{ currentSection.title }}</h2>

      <!-- QMarkdown 으로 MD 파일 렌더링 -->
      <q-markdown :src="currentSection.src" class="q-mt-md" />

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
import sections from '../data/webBasicSections/index.js'

const router = useRouter()
const route = useRoute()

const currentIndex = ref(0)
const currentSection = computed(() => sections[currentIndex.value])

// 쿼리 파라미터 sec 와 동기화
watchEffect(() => {
  const sec = parseInt(route.query.sec, 10)
  currentIndex.value = !isNaN(sec) && sec >= 0 && sec < sections.length ? sec : 0
})

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
  text-align: left;
}

.bottom-right-buttons {
  position: fixed;
  bottom: 80px; /* 푸터 높이 + 여유 */
  right: 32px;
  display: flex;
}

.q-mr-sm {
  margin-right: 8px;
}
</style>
