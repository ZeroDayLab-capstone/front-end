<template>
  <q-page class="cloumn q-pa-md">
    <div class="text-h5"><strong>웹 브라우저</strong></div>
    <ul class="text-h6">
      <li>HTML, CSS, JavaScript를 해석하여 웹 페이지를 렌더링하는 소프트웨어</li>
    </ul>

    <div class="text-h5 q-mt-xl"><strong>URL</strong></div>
    <div class="row justify-center q-mb-lg">
      <q-img :src="browser1" class="q-my-lg q-ml-xl" style="width: 600px"></q-img>
    </div>
    <ul class="text-h6">
      <li>정의: 웹에 있는 리소스의 위치</li>
    </ul>
    <div class="row justify-center q-my-lg">
      <q-img :src="browser2" style="width: 600px"></q-img>
    </div>
  </q-page>
</template>

<script setup>
import browser1 from 'src/assets/browser1.png'
import browser2 from 'src/assets/browser2.png'
</script>
