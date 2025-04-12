<template>
  <q-layout view="hHh 1pr fff">
    <q-header flat pined>
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

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header class="q-my-md"> ZeroDay Lab </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-2 text-black">
      <div class="text-center q-pa-md">© 2025 ZeroDay Lab. All Rights Reserved.</div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import logo from 'src/assets/logo.png'
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useRouter } from 'vue-router'

const $router = useRouter()

const goToMain = () => {
  $router.push('/main')
}
const goToLogin = () => {
  $router.push('/login')
}
const goToMyPage = () => {
  $router.push('/mypage')
}

const linksList = [
  {
    title: '웹 기초',
  },
  {
    title: '웹 취약점',
    path: '/study',
  },
  {
    title: 'War Game',
  },
  {
    title: '커뮤니티',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
