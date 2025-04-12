<template>
  <q-page class="q-mb-xl">
    <div>
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
        <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
        <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
        <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
      </q-carousel>
    </div>

    <div class="q-pa-xl q-ma-xl text-center">
      <div class="text-h5 q-mb-sm">ZeroDay Lab 소개</div>
      <div class="text-body1">ZeroDay Lab은 웹 보안 교육을 제공하는 플랫폼으로,</div>
      <div class="text-body1">다양한 웹 취약점을 학습하고 실습할 수 있는 환경을 제공합니다.</div>
    </div>

    <div class="q-pa-md row q-gutter-xl flex flex-center">
      <q-card v-for="(card, index) in cards" :key="index" class="my-card" flat bordered>
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />

        <q-card-section>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ card.title }}</div>
          <div class="text-caption text-grey">
            {{ card.description }}
          </div>
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

<script>
import { ref } from 'vue'

export default {
  setup() {
    const slide = ref(1)
    const autoplay = ref(true)

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
        title: 'Title 3',
        description: 'Ut enim ad minim veniam...',
        img: 'https://cdn.quasar.dev/img/mountains.jpg',
        lorem: '추가 설명 3...',
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
        title: 'Title 3',
        description: 'Ut enim ad minim veniam...',
        img: 'https://cdn.quasar.dev/img/mountains.jpg',
        lorem: '추가 설명 3...',
        expanded: false,
      },

      // 필요한 만큼 데이터 추가
    ])

    function toggleExpanded(card) {
      card.expanded = !card.expanded
    }

    return {
      slide,
      autoplay,
      cards,
      toggleExpanded,
    }
  },
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
