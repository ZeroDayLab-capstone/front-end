<template>
  <q-layout view="hhh Lpr fff">
    <!-- (A) 좌측 드로어: 라우트 메타에 따라 표시 -->
    <q-drawer v-if="hasDrawer" v-model="leftDrawerOpen" show-if-above bordered>
      <q-list padding>
        <q-item-label header>ZeroDay Lab</q-item-label>
        <q-item v-for="(link, idx) in drawerLinks" :key="idx" clickable @click="goPage(link.path)">
          <q-item-section>{{ link.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- (B) 상단 헤더 -->
    <q-header flat pinned style="background-color: white; color: black">
      <div class="row no-wrap items-center q-px-md" style="height: 60px">
        <q-space />

        <!-- 로고/타이틀 -->
        <q-img
          :src="logo"
          style="height: 35px; width: 35px"
          fit="contain"
          class="cursor-pointer"
          @click="goHome"
        />
        <span class="q-ml-sm text-h5 cursor-pointer" @click="goHome"> ZeroDay Lab </span>

        <!-- (C) 메인 메뉴 (드롭다운 제거, 클릭 이동만) -->
        <div
          v-for="(item, idx) in mainMenu"
          :key="idx"
          class="menu-item cursor-pointer q-ml-xl"
          @click="goPage(item.path)"
        >
          {{ item.label }}
        </div>

        <q-space />

        <!-- (D) 인증 영역 -->
        <template v-if="!auth.isLoggedIn">
          <q-btn flat dense icon="person" label="로그인" class="q-ml-md" @click="goToLogin" />
          <q-btn flat dense label="회원가입" class="q-ml-md" @click="goRegister" />
          <q-btn flat dense label="마이페이지" class="q-ml-md" @click="goToLogin" />
        </template>
        <template v-else>
          <q-btn flat dense label="로그아웃" class="q-ml-md" @click="onLogout" />
          <q-btn flat dense label="마이페이지" class="q-ml-md" @click="goMyPage" />
        </template>

        <q-space />
      </div>
    </q-header>

    <!-- (E) 본문 -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- (F) 푸터 -->
    <q-footer class="bg-white text-black">
      <div class="text-center q-pa-lg">© 2025 ZeroDay Lab. All Rights Reserved.</div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import logo from 'src/assets/logo.png'
import { useAuthStore } from 'src/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

/** Drawer 제어 */
const drawerLinks = computed(() => route.meta.drawerLinks || [])
const hasDrawer = computed(() => drawerLinks.value.length > 0)
const leftDrawerOpen = ref(true)

/** 네비게이션 */
function goHome() {
  router.push('/main')
}
function goToLogin() {
  router.push('/login')
}
function goRegister() {
  router.push('/register')
}
function goMyPage() {
  router.push('/mypage')
}
function goPage(path) {
  router.push(path)
}

/** 상단 메뉴 (드롭다운 제거 → 단일 경로만 사용) */
const mainMenu = [
  { label: '웹 기초', path: '/webbasic?sec=0' }, // 첫 섹션으로 진입
  { label: '웹 취약점', path: '/study' }, // 랜딩/요약 페이지로 이동
  { label: 'War Game', path: '/wargamelist' },
  { label: 'COMMUNITY', path: '/community/faq' }, // routes에서 /community → ('' → faq) 리디렉트 설정 가정
]

/** 로그아웃 */
function onLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.menu-item {
  line-height: 60px;
}

/* 드롭다운 관련 스타일 제거됨 */
</style>
