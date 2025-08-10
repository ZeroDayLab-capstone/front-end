<template>
  <q-page>
    <div class="row justify-center">
      <q-img
        :src="mainpage"
        style="width: 100%; height: 890px"
        :img-props="{ style: 'width: 100%; height: 100%; object-fit: fill;' }"
      >
        <div
          class="absolute-full flex flex-center text-h1"
          style="color: white; font-weight: bold; text-shadow: 0 2px 12px #000b"
        >
          Welcome To ZeroDay Lab!
        </div>
      </q-img>
    </div>

    <div class="row justify-center">
      <q-img
        :src="mainpage1"
        style="width: 100%"
        :img-props="{ style: 'width: 100%; height: 100%; object-fit: fill;' }"
      >
        <div
          v-intersect
          ref="animatedBox"
          :class="['q-pa-xl q-ma-xl text-left animated-fadein-up', { show: isVisible }]"
          style="background: transparent; color: #000000; font-size: 7rem; font-weight: bold"
        >
          <div style="padding: 100px">
            <div class="text-bold" style="font-size: 7rem">What is ZeroDay Lab?</div>
            <div class="text-bold q-pt-md" style="font-size: 1.88rem">
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

    <div style="padding: 200px" class="bg-grey-2 text-center">
      <div class="text-h2 text-bold q-pb-xl">How it works</div>
      <div class="text-h6 q-mt-sm" style="max-width: 800px; margin: auto">
        This is the website we wish we had when we were learning on our own. We scour the internet
        looking for only the best resources to supplement your learning and present them in a
        logical order.
      </div>
      <div class="row q-mt-xl q-gutter-xl justify-center no-wrap">
        <div class="col-4">
          <q-img :src="mainpageLearn" style="width: 300px" class="q-mb-md"></q-img>
          <div class="text-h6 q-mt-sm">
            Learn from a curriculum with the best curated online tutorials, blogs, and courses.
          </div>
        </div>
        <div class="col-4">
          <q-img :src="mainpagePractice" style="width: 300px" class="q-mb-md"></q-img>
          <div class="text-h6 q-mt-sm">
            Strengthen your skills through hands-on Wargame challenges designed to simulate
            real-world web vulnerabilities and exploitation techniques.
          </div>
        </div>
        <div class="col-4">
          <q-img :src="mainpageCommunity" style="width: 300px" class="q-mb-md"></q-img>
          <div class="text-h6 q-mt-sm">
            You're not alone. Join our community of cybersecurity learners, where beginners and
            future experts support each other every step of the way
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import mainpage from 'src/assets/mainpage.png'
import mainpage1 from 'src/assets/mainpage1.png'
import mainpageLearn from 'src/assets/mainpageLearn.png'
import mainpagePractice from 'src/assets/mainpagePractice.png'
import mainpageCommunity from 'src/assets/mainpageCommunity.png'

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
// const cards = ref([
//   {
//     title: 'Global Cybersecurity',
//     img: securityimg1,
//     link: 'https://globalcybersecuritynetwork.com/blog/latest-cyber-security-news/',
//   },
//   {
//     title: 'SOC Investigation',
//     img: securityimg2,
//     link: 'https://www.socinvestigation.com/latest-cyber-security-news-hacker-news/',
//   },
//   {
//     title: 'PSA-국가 사이버보안',
//     img: securityimg3,
//     link: 'https://www.psa-gov.ie/',
//   },
//   {
//     title: '보안뉴스',
//     img: securityimg4,
//     link: 'https://www.boannews.com/',
//   },
//   {
//     title: 'KISIA',
//     img: securityimg5,
//     link: 'https://www.kisia.or.kr/announcement/today_news/',
//   },
//   {
//     title: 'Cybersecurity Dive',
//     img: securityimg6,
//     link: 'https://www.cybersecuritydive.com/',
//   },
// ])
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
