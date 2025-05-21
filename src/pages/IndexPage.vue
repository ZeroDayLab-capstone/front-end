<template>
  <q-page class="q-pb-xl">
    <div class="row justify-center q-pb-lg">
      <!-- <q-img :src="mainlogo1"  width="100%" height="600px" /> -->
      <q-img
        :src="mainlogo1"
        style="width: 100%; max-width: 1900px; height: 500px"
        :img-props="{ style: 'width: 100%; height: 100%; object-fit: fill;' }"
      />
    </div>

    <div class="q-pa-xl q-ma-xl text-center">
      <div class="text-h3 q-pb-lg">What is ZeroDay Lab?</div>
      <div class="text-h6">
        <div>제로데이 랩에 오신 것을 환영합니다!</div>
        <div>
          제로데이 랩은 웹 보안에 입문한 공학도들이 SQL Injection, XSS, CSRF 등의 핵심 취약점을
          이론과 실습을 통해 쉽고 빠르게 학습할 수 있도록 설계된 온라인 플랫폼입니다.
        </div>
        <div>
          현실과 같은 웹 애플리케이션 환경에서 직접 공격 기법을 시도해보고, 그 원리와 해결 방안을
          단계별로 익히며 보안 전문가로 성장하는 여정을 지원합니다.
        </div>
        <div class="q-pt-md">안전한 웹 세상을 만드는 첫걸음, 제로데이 랩과 함께 시작하세요!</div>
      </div>
    </div>

    <div class="q-pa-md row q-gutter-xl flex flex-center">
      <q-card
        v-for="(card, index) in cards"
        :key="index"
        class="my-card"
        flat
        bordered
        clickable
        :href="card.link"
        target="_blank"
      >
        <!-- ① 이미지 컨테이너에 클래스 추가 -->
        <div class="my-card-img">
          <q-img :src="card.img" />
        </div>
        <q-card-section>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ card.title }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth'
// import mainlogo from 'src/assets/mainpagelogo.jpg'
import mainlogo1 from 'src/assets/mainlogo1.png'

import securityimg1 from 'src/assets/securityimg1.jpeg'
import securityimg2 from 'src/assets/securityimg2.jpg'
import securityimg3 from 'src/assets/securityimg3.jpg'
import securityimg4 from 'src/assets/securityimg4.jpg'
import securityimg5 from 'src/assets/securityimg5.PNG'
import securityimg6 from 'src/assets/securityimg6.png'

// Pinia 스토어 인스턴스 가져오기
const auth = useAuthStore()

// 페이지 로드 시 사용자 정보 패치 (토큰이 있으면)
onMounted(() => {
  auth.fetchUser()
})

// 카드 데이터
const cards = ref([
  {
    title: 'Global Cybersecurity',
    img: securityimg1,
  },
  {
    title: 'SOC Investigation',
    img: securityimg2,
  },
  {
    title: 'PSA-국가 사이버보안',
    img: securityimg3,
  },
  {
    title: '보안뉴스',
    img: securityimg4,
  },
  {
    title: 'KISIA',
    img: securityimg5,
  },
  {
    title: 'Cybersecurity Dive',
    img: securityimg6,
  },
])
</script>

<style scoped>
.my-card {
  width: 250px; /* 카드 너비 고정 */
  height: 300px; /* 카드 높이 고정 */
  display: flex;
  flex-direction: column;
}

/* ② 이미지 영역을 flex-grow로 채우거나, 고정 높이 지정 */
.my-card-img {
  flex: 1; /* 남는 공간을 이미지가 차지 */
  width: 100%;
  height: 160px;
}
</style>
