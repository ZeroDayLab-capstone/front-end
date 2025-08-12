<template>
  <q-card flat bordered class="q-pa-lg">
    <div class="text-h5 q-mb-xs">{{ item.title }}</div>
    <div class="text-caption text-grey q-mb-lg">{{ item.date }}</div>
    <div style="white-space: pre-line">{{ item.content }}</div>
    <div class="q-mt-md">
      <q-btn flat label="목록" @click="$router.push('/community/notice')" />
    </div>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const list = [
  { id: 3, title: '서비스 점검 안내', date: '2025-08-10', content: '8/12 02:00~04:00 점검 예정.' },
  { id: 2, title: '신규 기능 업데이트', date: '2025-08-01', content: '알림 기능 추가.' },
  { id: 1, title: '오픈 공지', date: '2025-07-20', content: 'ZeroDay Lab 커뮤니티 오픈.' },
]
const item = computed(
  () =>
    list.find((v) => v.id === Number(route.params.id)) ?? { title: '없음', date: '', content: '' },
)
</script>
