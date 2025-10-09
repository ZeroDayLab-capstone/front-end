<template>
  <!-- 클라인언트 사이드 취약점 -->
  <q-page class="q-pa-md">
    <div class="row justify-center q-mb-lg q-pt-xl">
      <q-img :src="client1" style="width: 600px"></q-img>
    </div>
    <div class="row justify-center q-mb-lg">
      <q-img :src="client2" style="width: 800px"></q-img>
    </div>

    <q-separator />

    <!-- 서버 사이드 취약점 -->
    <div class="row justify-center q-mb-lg q-pt-xl">
      <q-img :src="server1" style="width: 600px"></q-img>
    </div>
    <div class="row justify-center q-mb-lg">
      <q-img :src="server2" style="width: 800px"></q-img>
    </div>
  </q-page>
</template>

<script setup>
import client1 from '@/assets/img/webbasic/vuln/vuln-01.png'
import client2 from '@/assets/img/webbasic/vuln/vuln-table-02.png'
import server1 from '@/assets/img/webbasic/vuln/vuln-03.png'
import server2 from '@/assets/img/webbasic/vuln/vuln-table-04.png'
</script>
