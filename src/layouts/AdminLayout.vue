<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>관리자 페이지</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Side Drawer -->
    <q-drawer show-if-above v-model="drawer" side="left" bordered>
      <q-list padding>
        <q-item to="/admin/users" clickable v-ripple
          ><q-item-section>사용자 목록</q-item-section></q-item
        >
        <q-item to="/admin/labs" clickable v-ripple
          ><q-item-section>실습 등록</q-item-section></q-item
        >
        <q-item to="/admin/server-status" clickable v-ripple
          ><q-item-section>서버 상태</q-item-section></q-item
        >
        <q-item to="/admin/user-results" clickable v-ripple
          ><q-item-section>사용자 실습 결과</q-item-section></q-item
        >
        <q-item to="/admin/logs" clickable v-ripple
          ><q-item-section>시스템 로그</q-item-section></q-item
        >
      </q-list>
    </q-drawer>

    <!-- Main Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(true)
</script>
