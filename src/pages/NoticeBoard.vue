<template>
  <q-page class="q-ma-lg">
    <div class="justify-center">
      <!-- 탭 메뉴 -->
      <q-tabs v-model="selectedTab" class="q-mb-md">
        <q-tab v-for="tab in tabs" :key="tab.key" :name="tab.key" :label="tab.label" />
      </q-tabs>

      <!-- 게시글 표 -->
      <q-table :rows="filteredRows" :columns="columns" row-key="no" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

const tabs = [
  { key: 'notice', label: 'NOTICE' },
  { key: 'faq', label: 'FAQ' },
  { key: 'qna', label: 'Q&A' },
]
const selectedTab = ref('faq')

const columns = [
  { name: 'no', label: 'No', field: 'no' },
  { name: 'category', label: '카테고리', field: 'category' },
  { name: 'title', label: '제목', field: 'title' },
  { name: 'date', label: '작성시간', field: 'date' },
]

// 전체 데이터 예시
const allRows = [
  { no: 6, tab: 'faq', category: '교환반품', title: '배송 및 반품 안내', date: '2020-11-12' },
  {
    no: 5,
    tab: 'faq',
    category: '이용방법',
    title: '부자재가 불량이거나 없는 경우 요청 방법',
    date: '2017-11-22',
  },
  { no: 4, tab: 'faq', category: '이용방법', title: '묶음 배송 요청 방법', date: '2017-11-22' },
  { no: 3, tab: 'faq', category: '계정', title: '비밀번호 찾는 방법', date: '2017-11-22' },
  { no: 2, tab: 'faq', category: '이용방법', title: 'LINDA 쇼핑몰 이용방법', date: '2017-11-06' },
  { no: 1, tab: 'faq', category: '교환반품', title: '반품/교환 방법', date: '2017-11-03' },
  // NOTICE, Q&A, CLASS, 입고정보 등등은 key/label만 다르게 추가
]

// 선택된 탭에 따라 표 데이터 필터링
const filteredRows = computed(() => allRows.filter((row) => row.tab === selectedTab.value))
</script>
