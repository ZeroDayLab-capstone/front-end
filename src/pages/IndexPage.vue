<template>
  <q-page class="q-pb-xl">
    <div class="row justify-center">
      <q-img
        :src="mainpage"
        style="width: 100%; height: 890px"
        :img-props="{ style: 'width: 100%; height: 100%; object-fit: fill;' }"
      >
        <div
          class="absolute-full flex flex-center"
          style="color: white; font-size: 7rem; font-weight: bold; text-shadow: 0 2px 12px #000b"
        >
          Welcome To ZeroDay Lab!
        </div>
      </q-img>
    </div>

    <div class="row justify-center">
      <q-img
        :src="mainpage2"
        style="width: 100%; height: 890px"
        :img-props="{ style: 'width: 100%; height: 100%; object-fit: fill;' }"
      >
        <div
          v-intersect
          :class="['q-pa-xl q-ma-xl text-left animated-fadein-up', { show: isVisible }]"
          style="
            background: transparent;
            color: white;
            font-size: 7rem;
            font-weight: bold;
            text-shadow: 0 2px 12px #000b;
          "
        >
          <div
            ref="animatedBox"
            :class="['q-pa-xl q-ma-xl text-left animated-fadein-up', { show: isVisible }]"
          >
            <div class="text-h1 text-bold q-py-xl">What is ZeroDay Lab?</div>
            <div class="text-h5">
              <div>제로데이 랩에 오신 것을 환영합니다!</div>
              <div class="q-pt-md">
                제로데이 랩은 웹 보안에 입문한 공학도들이 SQL Injection, XSS, CSRF 등의 핵심
                취약점을
                <br />
                이론과 실습을 통해 쉽고 빠르게 학습할 수 있도록 설계된 온라인 플랫폼입니다.
              </div>
              <div class="q-pt-md">
                현실과 같은 웹 애플리케이션 환경에서 직접 공격 기법을 시도해보고, <br />
                그 원리와 해결 방안을 단계별로 익히며 보안 전문가로 성장하는 여정을 지원합니다.
              </div>
              <div class="q-pt-md">
                안전한 웹 세상을 만드는 첫걸음, 제로데이 랩과 함께 시작하세요!
              </div>
            </div>
          </div>
        </div>
      </q-img>
    </div>

    <q-card class="bg-grey-3" style="padding: 420px">
      <div class="text-h4 text-bold">ZeroDay Lab 정복하기</div>
    </q-card>

    <div class="q-pa-md row q-gutter-xl flex flex-center">
      <q-card
        v-for="(card, index) in cards"
        :key="index"
        tag="a"
        class="my-card"
        flat
        bordered
        clickable
        :href="card.link"
        target="_blank"
        style="text-decoration: none; color: inherit"
      >
        <!-- ① 이미지 컨테이너에 클래스 추가 -->
        <div class="my-card-img">
          <q-img :src="card.img" style="height: 170px; object-fit: cover" />
          <q-separator />
        </div>
        <q-card-section>
          <div class="text-h5 q-mb-xs">{{ card.title }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import mainpage from 'src/assets/mainpage.png'
import mainpage2 from 'src/assets/mainpage2.png'

import securityimg1 from 'src/assets/securityimg1.png'
import securityimg2 from 'src/assets/securityimg2.png'
import securityimg3 from 'src/assets/securityimg3.png'
import securityimg4 from 'src/assets/securityimg4.png'
import securityimg5 from 'src/assets/securityimg5.png'
import securityimg6 from 'src/assets/securityimg6.png'

// text animation 처리
const isVisible = ref(false)

const vIntersect = {
  mounted(el) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
  },
}
defineExpose({ vIntersect })

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
    link: 'https://globalcybersecuritynetwork.com/blog/latest-cyber-security-news/',
  },
  {
    title: 'SOC Investigation',
    img: securityimg2,
    link: 'https://www.socinvestigation.com/latest-cyber-security-news-hacker-news/',
  },
  {
    title: 'PSA-국가 사이버보안',
    img: securityimg3,
    link: 'https://www.psa-gov.ie/',
  },
  {
    title: '보안뉴스',
    img: securityimg4,
    link: 'https://www.boannews.com/',
  },
  {
    title: 'KISIA',
    img: securityimg5,
    link: 'https://www.kisia.or.kr/announcement/today_news/',
  },
  {
    title: 'Cybersecurity Dive',
    img: securityimg6,
    link: 'https://www.cybersecuritydive.com/',
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

.animated-fadein-up {
  opacity: 0;
  transform: translateY(60px);
  transition:
    opacity 0.8s cubic-bezier(0.6, 0.05, 0.12, 0.99),
    transform 0.8s cubic-bezier(0.6, 0.05, 0.12, 0.99);
}
.animated-fadein-up.show {
  opacity: 1;
  transform: translateY(0);
}
</style>
