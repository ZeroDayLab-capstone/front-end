<template>
  <q-page class="bg-grey-2 q-pa-lg">
    <div class="community-container">
      <!-- 상단 헤더 -->
      <div class="q-mb-lg text-center">
        <div class="text-overline text-grey-7">ZeroDay Lab Community</div>
        <div class="text-h4 text-weight-bold q-mt-xs">커뮤니티</div>
        <div class="text-caption text-grey-7 q-mt-sm">
          공지사항, 자주 묻는 질문, Q&amp;A 게시판을 통해 학습자와 함께 성장하는 보안
          커뮤니티입니다.
        </div>
      </div>

      <!-- 탭 + 컨텐츠 카드 -->
      <q-card flat bordered class="community-card q-pa-md q-px-lg">
        <q-tabs
          v-model="tab"
          class="community-tabs"
          active-color="black"
          indicator-color="black"
          narrow-indicator
          align="justify"
          @update:model-value="go"
        >
          <q-tab name="notice" label="NOTICE" />
          <q-tab name="faq" label="FAQ" />
          <q-tab name="qna" label="Q&A" />
        </q-tabs>

        <q-separator class="q-mt-sm q-mb-md" />

        <!-- 탭별 실제 내용 -->
        <router-view />
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tab = ref('faq')

watch(
  () => route.name,
  (n) => {
    if (!n) return
    tab.value = n.includes('notice') ? 'notice' : n.includes('qna') ? 'qna' : 'faq'
  },
  { immediate: true },
)

function go(v) {
  router.push(`/community/${v}`)
}
</script>

<style scoped>
.community-container {
  max-width: 1000px;
  margin: 0 auto;
}

/* 카드 모양 */
.community-card {
  border-radius: 18px;
  background: #ffffff;
}

/* 탭 높이/폰트 조금 다듬기 */
.community-tabs .q-tab {
  min-height: 44px;
  font-weight: 600;
  letter-spacing: 0.08em;
}

/* ✅ community-card 안의 q-table에서 2번째 컬럼(제목)만 왼쪽 정렬 */
.community-card :deep(.q-table thead tr th:nth-child(2)),
.community-card :deep(.q-table tbody tr td:nth-child(2)) {
  text-align: left;
}
</style>
