<template>
  <q-page class="q-pa-md">
    <div class="centered-container">
      <!-- 섹션 제목 -->
      <h2 class="text-h4 text-weight-bold q-mb-md">{{ currentSection.title }}</h2>

      <!-- 동적 컴포넌트 렌더링 -->
      <component :is="currentSection.component" />

      <!-- 이전/다음 버튼 -->
      <div class="bottom-right-buttons">
        <q-btn
          v-if="currentIndex > 0"
          label="이전"
          class="q-mr-sm"
          color="black"
          @click="goPrevious"
        />
        <q-btn
          v-if="currentIndex < sections.length - 1"
          label="다음"
          color="black"
          @click="goNext"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { defineAsyncComponent } from 'vue'

// 1) sections 배열에 제목 + 컴포넌트 참조
const sections = [
  {
    title: '1️⃣ 웹',
    component: defineAsyncComponent(() => import('./sections/WebIntro.vue')),
  },
  {
    title: '2️⃣ HTTP/HTTPS',
    component: defineAsyncComponent(() => import('./sections/HttpHttps.vue')),
  },
  {
    title: '3️⃣ Web Browser',
    component: defineAsyncComponent(() => import('./sections/WebBrowser.vue')),
  },
  {
    title: '4️⃣ Browser DevTools',
    component: defineAsyncComponent(() => import('./sections/BrowserDevtools.vue')),
  },
  {
    title: '5️⃣ Cookie/Session',
    component: defineAsyncComponent(() => import('./sections/CookieSession.vue')),
  },
  {
    title: '6️⃣ Caching',
    component: defineAsyncComponent(() => import('./sections/BasicCaching.vue')),
  },
  {
    title: '7️⃣ DBMS',
    component: defineAsyncComponent(() => import('./sections/BasicDbms.vue')),
  },
  {
    title: '8️⃣ 클라이언트/서버 취약점',
    component: defineAsyncComponent(() => import('./sections/ClientServerVuln.vue')),
  },
]

const router = useRouter()
const route = useRoute()
const currentIndex = ref(0)

// sec 쿼리에 맞춰 인덱스 동기화
watchEffect(() => {
  const sec = parseInt(route.query.sec, 10)
  currentIndex.value = !isNaN(sec) && sec >= 0 && sec < sections.length ? sec : 0
})

// 현재 렌더할 섹션
const currentSection = computed(() => sections[currentIndex.value])

// 이전/다음 이동
function goPrevious() {
  router.push({ path: '/webbasic', query: { sec: currentIndex.value - 1 } })
}
function goNext() {
  router.push({ path: '/webbasic', query: { sec: currentIndex.value + 1 } })
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
