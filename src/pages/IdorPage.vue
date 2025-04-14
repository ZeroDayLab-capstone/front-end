<template>
  <q-page class="q-pa-md">
    <!-- 설명 내용 영역 -->
    <div class="explanation-content q-mb-xl">
      <!-- 단순 반복문으로 보여줄 내용 -->
      <div v-for="(content, index) in visibleContent" :key="index" class="q-mb-lg">
        <div v-html="content"></div>
      </div>
    </div>

    <!-- 오른쪽 하단에 버튼 그룹 -->
    <div class="bottom-right-buttons">
      <q-btn
        v-if="currentPage > 1"
        label="이전 페이지"
        color="primary"
        class="q-mr-sm"
        @click="loadPreviousPage"
      />
      <q-btn v-if="hasMorePages" label="다음 페이지" color="primary" @click="loadNextPage" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// 다단계 콘텐츠 예시 (필요에 따라 추가 내용 구현)
const contentPages = [
  `<h2>취약점 개요</h2>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   `,
  `<h2>세부 설명</h2>
   <p>취약점이 발생하는 원인 및 기술적 세부 사항을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   `,
  `<h2>영향 및 대응</h2>
   <p>취약점의 영향을 분석하고 대응 방안을 서술합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   <p>이 부분은 취약점의 개요 및 핵심 개념을 설명합니다.</p>
   `,
]

// 처음에 1페이지 내용만 보임
const currentPage = ref(1)

// 보여질 콘텐츠 : 첫 페이지부터 currentPage값까지의 내용
const visibleContent = computed(() => contentPages.slice(0, currentPage.value))

// 남은 페이지가 있는지 여부
const hasMorePages = computed(() => currentPage.value < contentPages.length)

// "다음 페이지" 버튼 클릭 시 호출되는 함수
function loadNextPage() {
  if (hasMorePages.value) {
    currentPage.value++
  }
}

// "이전 페이지" 버튼 클릭 시 호출되는 함수
function loadPreviousPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// currentPage 변경 시 콘솔 로그 확인 (디버깅용)
watch(currentPage, (val) => {
  console.log('currentPage changed to:', val)
})
</script>

<style scoped>
/* 설명 콘텐츠 중앙 정렬 및 최대 폭 지정 */
.explanation-content {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

/* 오른쪽 하단에 버튼 그룹을 고정 위치에 배치 */
.bottom-right-buttons {
  position: fixed;
  bottom: 80px; /* 푸터와 겹치지 않도록 80px */
  right: 16px;
  z-index: 9999;
  display: flex;
  flex-direction: row;
}

/* 버튼 간격 */
.q-mr-sm {
  margin-right: 8px;
}
</style>
