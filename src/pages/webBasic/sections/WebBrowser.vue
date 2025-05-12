<template>
  <q-page class="cloumn q-pa-md">
    <div class="text-h5"><span class="text-weight-bold">웹 브라우저</span></div>
    <div class="q-mt-md text-body1" style="display: list-item; list-style-type: disc">
      HTML, CSS, JavaScript를 해석하여 웹 페이지를 렌더링하는 소프트웨어
    </div>

    <div class="text-h5 q-mt-xl"><span class="text-weight-bold">URL</span></div>
    <div class="row justify-center q-mb-lg">
      <q-img :src="browser1" class="q-my-lg q-ml-xl" style="width: 600px"></q-img>
    </div>
    <div class="q-mt-md text-body1" style="display: list-item; list-style-type: disc">
      정의: 웹에 있는 리소스의 위치
    </div>
    <div class="row justify-center q-my-lg">
      <q-img :src="browser2" style="width: 600px"></q-img>
    </div>
  </q-page>
</template>

<script setup>
import browser1 from 'src/assets/browser1.png'
import browser2 from 'src/assets/browser2.png'
</script>
