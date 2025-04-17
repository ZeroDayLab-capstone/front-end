<template>
  <q-page style="padding: 0">
    <!-- 고정된 사이드 목차 -->
    <div class="fixed-toc">
      <q-card class="q-pa-sm toc-card">
        <q-card-section class="title-bar">
          <div class="text-h6">목차</div>
        </q-card-section>

        <q-card-section>
          <q-list dense>
            <q-item
              v-for="(sec, idx) in sections"
              :key="idx"
              clickable
              v-ripple
              @click="goToSection(idx)"
            >
              <q-item-section>
                {{ idx + 1 + '. ' + sec.navTitle }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>

    <!-- 오른쪽 본문 -->
    <div class="centered-container">
      <h2>{{ currentSection.title }}</h2>
      <div v-html="sanitizedHTML(currentSection.content)"></div>

      <!-- '이전 / 다음' 버튼 (우측 하단 고정, 검정색) -->
      <div class="bottom-right-buttons">
        <q-btn
          v-if="currentIndex > 0"
          label="이전"
          color="black"
          text-color="white"
          class="q-mr-sm"
          @click="previousSection"
        />
        <q-btn
          v-if="currentIndex < sections.length - 1"
          label="다음"
          color="black"
          text-color="white"
          @click="nextSection"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import DOMPurify from 'dompurify'
import sections from 'src/data/webBasicSections/index.js'

const currentIndex = ref(0)
const currentSection = computed(() => sections[currentIndex.value])

function goToSection(idx) {
  currentIndex.value = idx
}
function previousSection() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}
function nextSection() {
  if (currentIndex.value < sections.length - 1) {
    currentIndex.value++
  }
}
function sanitizedHTML(htmlString) {
  return DOMPurify.sanitize(htmlString)
}
</script>

<style scoped>
.fixed-toc {
  position: fixed;
  top: 56px; /* 헤더 높이만큼 */
  left: 0;
  width: 300px;
  height: calc(100vh - 56px);
  overflow-y: auto;
}

.centered-container {
  /* 화면이 아무리 넓어도 최대 900px로 고정, 수직 스크롤 대비 */
  max-width: 900px;
  margin: 0 auto; /* 좌우 중앙 정렬 */
  padding: 24px; /* 상하좌우 여백 */
  text-align: left; /* 내부 텍스트는 왼쪽 정렬 */
}

.toc-card {
  background-color: #2e2e2e;
  color: #fff;
  height: 100%;
  border-radius: 0;
}

.title-bar {
  background-color: red;
  color: white;
  text-align: center;
}

.page-content {
  margin-left: 300px;
  padding: 24px;
  min-height: 100vh;
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
