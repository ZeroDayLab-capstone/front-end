<template>
  <q-layout view="hhh Lpr fff">
    <!-- (A) 좌측 드로어 -->
    <q-drawer v-if="hasDrawer" v-model="leftDrawerOpen" show-if-above bordered>
      <q-list padding>
        <q-item-label header>ZeroDay Lab</q-item-label>

        <!-- drawerLinks: meta에서 받아 온 { title, to } 사용 -->
        <q-item
          v-for="(link, idx) in drawerLinks"
          :key="idx"
          clickable
          :to="normalizeTo(link)"
          active-class="white"
          exact
          v-ripple
        >
          <q-item-section>{{ link.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- (B) 상단 헤더 -->
    <q-header flat pinned class="bg-white text-black">
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

        <!-- (C) 메인 메뉴 -->
        <div
          v-for="(item, idx) in mainMenu"
          :key="idx"
          class="menu-item cursor-pointer q-ml-xl"
          @click="go(item)"
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

/** 라우팅 유틸: { to } 선호, 필요 시 { path }도 임시 지원 */
function normalizeTo(link) {
  if (link?.to) return link.to
  if (link?.path) return link.path // 레거시 호환
  return { name: 'main' }
}

/** 상단 메뉴: name + query 사용(가능하면) */
const mainMenu = [
  { label: '웹 기초', to: { name: 'webbasic', query: { sec: 0 } } }, // ✅
  { label: '웹 취약점', to: { name: 'study' } }, // ✅
  { label: 'War Game', to: { name: 'wargame-list' } }, // ✅
  { label: 'COMMUNITY', to: '/community/faq' }, // 라우트에 name 없으면 path로
]

function goHome() {
  router.push({ name: 'main' })
}
function goToLogin() {
  router.push({ name: 'login' })
}
function goRegister() {
  router.push({ name: 'register' })
}
function goMyPage() {
  router.push({ name: 'mypage' })
}

/** 공통 이동 핸들러 (to 객체/문자열 모두 지원) */
function go(item) {
  const dest = item?.to ?? item?.path ?? item
  router.push(dest)
}

/** 로그아웃 */
function onLogout() {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<style scoped>
.menu-item {
  line-height: 60px;
}
</style>
