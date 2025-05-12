<template>
  <q-layout view="hhh Lpr fff">
    <q-drawer v-if="hasDrawer" v-model="leftDrawerOpen" show-if-above bordered>
      <q-list padding>
        <q-item-label header>ZeroDay Lab</q-item-label>
        <q-item v-for="(link, idx) in drawerLinks" :key="idx" clickable @click="goPage(link.path)">
          <q-item-section>{{ link.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <!-- 상단 헤더 -->
    <q-header flat pinned style="background-color: white; color: black">
      <div class="row no-wrap items-center q-px-md" style="height: 60px">
        <!-- 로고 -->
        <q-img
          :src="logo"
          style="height: 35px; width: 35px"
          fit="contain"
          class="cursor-pointer"
          @click="goHome"
        />
        <span class="q-ml-sm text-h5 cursor-pointer" @click="goHome"> ZeroDay Lab </span>

        <q-space />
        <!-- (B) 메인 메뉴 -->
        <!-- 주의: @mouseleave 제거! -->
        <div
          v-for="(item, idx) in mainMenu"
          :key="idx"
          class="menu-item q-ml-xl cursor-pointer"
          @mouseover="hoverIndex = idx"
          @click="goPage(item.path)"
        >
          {{ item.label }}
        </div>

        <q-space />

        <!-- (C) 오른쪽 로그인 등 -->
        <q-btn flat dense icon="person" label="로그인" class="q-ml-md" @click="goToLogin" />
        <q-btn flat dense label="회원가입" class="q-ml-md" @click="goRegister" />
        <q-btn flat dense label="마이페이지" class="q-ml-md" @click="goMyPage" />
      </div>
    </q-header>

    <!-- (D) 서브메뉴 영역 -->
    <!-- 여기서만 @mouseleave="hoverIndex = null" -->
    <div class="submenu-container" v-if="hoverIndex !== null" @mouseleave="hoverIndex = null">
      <div class="submenu-content row justify-center q-pb-xl">
        <div
          class="col-auto q-pr-xl"
          v-for="(child, cidx) in mainMenu[hoverIndex].children"
          :key="cidx"
        >
          <h5 class="text-bold q-mb-sm">{{ child.title }}</h5>
          <div
            v-for="(sub, sidx) in child.items"
            :key="sidx"
            class="q-my-xs submenu-link cursor-pointer"
            @click="goPage(sub.path)"
          >
            {{ sub.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- (E) 본문 -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- (F) 푸터 -->
    <q-footer class="bg-grey-2 text-black">
      <div class="text-center q-pa-md">© 2025 ZeroDay Lab. All Rights Reserved.</div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import logo from 'src/assets/logo.png'

// 라우터
const router = useRouter()
const route = useRoute()

const drawerLinks = computed(() => route.meta.drawerLinks || [])
const hasDrawer = computed(() => drawerLinks.value.length > 0)

const leftDrawerOpen = ref(true)

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

// 상단 메뉴
const mainMenu = [
  {
    label: '웹 기초',
    path: '/webbasic',
    children: [
      {
        title: '개념',
        items: [
          { label: '웹', path: '/webbasic?sec=0' },
          { label: 'HTTP/HTTPS', path: '/webbasic?sec=1' },
          { label: 'Web Brower', path: '/webbasic?sec=2' },
          { label: 'Browser DevTools', path: '/webbasic?sec=3' },
          { label: 'Cookie/Session', path: '/webbasic?sec=4' },
          { label: 'Caching', path: '/webbasic?sec=5' },
          { label: 'DBMS', path: '/webbasic?sec=6' },
          { label: '클라이언트/서버 사이드 취약점', path: '/webbasic?sec=7' },
        ],
      },
    ],
  },
  {
    label: '웹 취약점',
    path: '/study',
    children: [
      {
        title: '클라이언트 사이드 취약점',
        items: [
          { label: 'XSS', path: '/study/xss' },
          { label: 'CSRF', path: '/study/csrf' },
        ],
      },
      {
        title: '서버 사이드 취약점',
        items: [
          { label: 'SQL Injection', path: '/study/sqlinjection' },
          { label: 'File Vulnerability', path: '/study/xss' },
          { label: 'Command Injection', path: '/study/idor' },
        ],
      },
    ],
  },
  {
    label: 'War Game',
    path: '/wargame',
    children: [
      {
        title: '문제 목록',
        items: [
          { label: '문제1', path: '/wargame/p1' },
          { label: '문제2', path: '/wargame/p2' },
        ],
      },
    ],
  },
]

// hoverIndex => 어느 메뉴에 마우스 올라갔는지
const hoverIndex = ref(null)
</script>

<style scoped>
.menu-item {
  line-height: 60px;
}

.submenu-container {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background-color: white;
  border-top: 1px solid #ccc;
  z-index: 9999;
}

.submenu-content {
  max-width: 600%;
  margin: 0 auto;
}

.submenu-link:hover {
  text-decoration: underline;
}
</style>
