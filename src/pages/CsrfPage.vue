<template>
  <q-page class="q-pa-md">
    <!-- 중앙 정렬된 콘텐츠 영역 -->
    <div class="explanation-content">
      <!-- 현재 페이지 제목 -->
      <h2>{{ currentContent.title }}</h2>

      <!-- 본문: DOMPurify로 sanitize한 뒤 v-html로 표시 -->
      <div v-html="sanitizedHTML(currentContent.content)"></div>
    </div>

    <!-- 오른쪽 하단 버튼 그룹 -->
    <div class="bottom-right-buttons">
      <q-btn
        v-if="currentPage > 0"
        label="이전"
        color="primary"
        class="q-mr-sm"
        @click="loadPreviousPage"
      />
      <q-btn
        v-if="currentPage < contentPages.length - 1"
        label="다음"
        color="primary"
        @click="loadNextPage"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import DOMPurify from 'dompurify'

// 4종류 취약점 예시 (title + content 구조)
const contentPages = [
  {
    title: '1. 취약점 개요',
    content: `
      <p>이 페이지는 첫 번째 취약점에 대한 개요를 설명합니다.</p>
      <p>기본 개념과 위험성, 예시를 간단히 다룹니다.</p>
    `,
  },
  {
    title: '2. 세부 설명',
    content: `
      <p>두 번째 취약점에 대한 상세 원인과 공격 기법 등을 설명합니다.</p>
      <p>코드 예시나 구체적인 문제 상황을 첨부할 수 있습니다.</p>
    `,
  },
  {
    title: '3. 영향 및 피해 사례',
    content: `
      <p>세 번째 취약점이 어떤 영향을 끼치는지, 피해 사례는 어떤 것들이 있는지 다룹니다.</p>
      <p>구체적인 통계나 실제 보안 사고 사례를 예로 들면 좋습니다.</p>
    `,
  },
  {
    title: '4. 대응 및 방어 전략',
    content: `
      <p>마지막 네 번째 취약점에 대한 방어 방법, 코드 레벨 해결책을 설명합니다.</p>
      <p>웹 방화벽 설정, 입력 검증, 아키텍처 설계 등 다양한 보안 모범사례를 함께 다룹니다.</p>
    `,
  },
]

// 현재 페이지 인덱스 (0부터 시작)
const currentPage = ref(0)

// 현재 페이지 데이터
const currentContent = computed(() => contentPages[currentPage.value])

// 다음 페이지 이동
function loadNextPage() {
  if (currentPage.value < contentPages.length - 1) {
    currentPage.value++
  }
}

// 이전 페이지 이동
function loadPreviousPage() {
  if (currentPage.value > 0) {
    currentPage.value--
  }
}

// XSS 방지를 위해 DOMPurify 사용
function sanitizedHTML(htmlString) {
  return DOMPurify.sanitize(htmlString)
}
</script>

<style scoped>
.explanation-content {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

.bottom-right-buttons {
  position: fixed;
  bottom: 80px;
  right: 16px;
  z-index: 9999;
  display: flex;
  flex-direction: row;
}

.q-mr-sm {
  margin-right: 8px;
}
</style>
