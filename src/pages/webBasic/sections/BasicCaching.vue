<template>
  <q-page class="q-pa-md">
    <div class="row justify-center q-mb-lg">
      <q-img :src="caching1" style="width: 500px"></q-img>
    </div>
    <div class="text-body1">
      <div class="q-mt-md" style="display: list-item; list-style-type: disc">
        정의: 자주 사용하는 데이터를 임시 저장(캐시)하여, 같은 요청이 반복될 때 빠르게 제공하는 기술
      </div>
      <div class="q-mt-md" style="display: list-item; list-style-type: disc">목적</div>
      <div class="q-pl-md">
        <div>
          1. 속도 향상 → 데이터베이스나 서버에 다시 요청하지 않고, 캐시에서 빠르게 가져올 수 있음
        </div>
        <div>2. 서버 부하 감소 → 같은 데이터를 여러 번 요청할 필요가 없어 서버의 부담이 줄어듦</div>
        <div>3. 네트워크 비용 절감 → 불필요한 데이터 전송이 줄어들어 효율적</div>
      </div>
      <div class="q-mt-md" style="display: list-item; list-style-type: disc">종류</div>
    </div>
    <div class="row justify-center q-mb-lg">
      <q-img :src="caching2" style="width: 600px"></q-img>
    </div>
  </q-page>
</template>

<script setup>
import caching1 from 'src/assets/caching1.png'
import caching2 from 'src/assets/caching2.png'
</script>
