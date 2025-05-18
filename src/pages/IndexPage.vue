<template>
  <q-page class="q-mb-xl">
    <div class="row justify-center q-my-lg">
      <q-img :src="mainlogo" style="width: 500px" />
    </div>

    <div class="q-pa-xl q-ma-xl text-center">
      <div class="text-h5 q-pb-lg">What is ZeroDay Lab</div>
      <div class="text-body1">
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
      <q-card v-for="(card, index) in cards" :key="index" class="my-card" flat bordered>
        <q-img :src="card.img" />

        <q-card-section>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ card.title }}</div>
          <div class="text-caption text-grey">{{ card.description }}</div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat color="primary" label="Share" />
          <q-btn flat color="secondary" label="Book" />

          <q-space />

          <q-btn
            color="grey"
            round
            flat
            dense
            :icon="card.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="toggleExpanded(card)"
          />
        </q-card-actions>

        <q-slide-transition>
          <div v-show="card.expanded">
            <q-separator />
            <q-card-section class="text-subtitle2">
              {{ card.lorem }}
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import mainlogo from 'src/assets/mainpagelogo.jpg'

// Pinia 스토어 인스턴스 가져오기
const auth = useAuthStore()

// 페이지 로드 시 사용자 정보 패치 (토큰이 있으면)
onMounted(() => {
  auth.fetchUser()
})

// 카드 데이터
const cards = ref([
  {
    title: 'Title 1',
    description: 'Lorem ipsum dolor sit amet...',
    img: 'https://cdn.quasar.dev/img/parallax1.jpg',
    lorem: '추가 설명 1...',
    expanded: false,
  },
  {
    title: 'Title 2',
    description: 'Sed do eiusmod tempor...',
    img: 'https://cdn.quasar.dev/img/parallax2.jpg',
    lorem: '추가 설명 2...',
    expanded: false,
  },
  {
    title: 'Title 3',
    description: 'Ut enim ad minim veniam...',
    img: 'https://cdn.quasar.dev/img/mountains.jpg',
    lorem: '추가 설명 3...',
    expanded: false,
  },
  {
    title: 'Title 4',
    description: 'Consectetur adipiscing elit...',
    img: 'https://cdn.quasar.dev/img/parallax1.jpg',
    lorem: '추가 설명 4...',
    expanded: false,
  },
  {
    title: 'Title 5',
    description: 'Excepteur sint occaecat...',
    img: 'https://cdn.quasar.dev/img/parallax2.jpg',
    lorem: '추가 설명 5...',
    expanded: false,
  },
  {
    title: 'Title 6',
    description: 'Duis aute irure dolor...',
    img: 'https://cdn.quasar.dev/img/mountains.jpg',
    lorem: '추가 설명 6...',
    expanded: false,
  },
])

// 카드 확장 토글 함수
function toggleExpanded(card) {
  card.expanded = !card.expanded
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
