<template>
  <q-layout view="hHh lpr fFf">
    <!-- Header -->
    <q-header flat pinned>
      <q-toolbar class="bg-white text-dark row items-center q-pa-sm">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <div class="row items-center q-ml-md">
          <q-img
            :src="logo"
            fit="contain"
            style="height: 35px; width: 35px"
            class="q-mt-sm cursor-pointer"
            @click="goToMain"
          />
          <span class="cursor-pointer q-ma-sm" @click="goToMain">ZeroDay Lab</span>
        </div>
        <q-space />
        <q-icon name="person" size="md" class="cursor-pointer q-pr-md" @click="goToLogin" />
        <q-avatar class="cursor-pointer" @click="goToMyPage">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
      </q-toolbar>
    </q-header>

    <!-- Drawer -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      no-scroll
      persistent
      bordered
      class="drawer-over-toc"
    >
      <q-list>
        <q-item-label header class="q-my-md"> ZeroDay Lab </q-item-label>

        <!-- 동적으로 변하는 drawerLinks를 렌더링 -->
        <EssentialLink v-for="link in drawerLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <!-- Page Container -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Footer -->
    <q-footer class="bg-grey-2 text-black">
      <div class="text-center q-pa-md">© 2025 ZeroDay Lab. All Rights Reserved.</div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import logo from 'src/assets/logo.png'
import { ref, computed } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useRouter, useRoute } from 'vue-router'

// 라우터 훅
const $router = useRouter()
const $route = useRoute()

// 이동 함수들
function goToMain() {
  $router.push('/main')
}
function goToLogin() {
  $router.push('/login')
}
function goToMyPage() {
  $router.push('/mypage')
}

// (1) 기본 Drawer 메뉴 (메타에 없는 라우트용 Fallback)
const defaultLinks = [
  {
    title: '웹 기초',
    path: '/webbasic',
  },
  {
    title: '웹 취약점',
    path: '/study',
  },
  {
    title: 'War Game',
    path: '/wargame',
  },
  {
    title: '커뮤니티',
    path: '/community',
  },
]

// (2) 현재 라우트에서 meta.drawerLinks를 읽고, 없으면 defaultLinks
const drawerLinks = computed(() => {
  return $route.meta.drawerLinks || defaultLinks
})

// (3) Drawer 열림/닫힘 상태: 기본 true => 항상 처음엔 열림
const leftDrawerOpen = ref(true)

// 토글 함수 (헤더의 메뉴버튼)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
