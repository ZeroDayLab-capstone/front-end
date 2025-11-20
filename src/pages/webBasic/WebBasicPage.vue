<template>
  <q-page class="q-pa-md bg-grey-2 q-pb-xl">
    <div class="row justify-center q-mb-xl">
      <div class="col-12 col-md-7">
        <q-card flat>
          <div class="centered-container">
            <h2 class="text-h4 text-weight-bold q-mb-md">
              {{ currentSection.title }}
            </h2>

            <component :is="currentSection.component" />
          </div>
        </q-card>
      </div>
    </div>

    <!-- 🔥 푸터를 자동으로 피해서 떠 있는 네비게이션 버튼 -->
    <q-page-sticky position="bottom-right" :offset="[24, 24]">
      <div class="row q-gutter-sm">
        <q-btn v-if="index > 0" label="이전" color="black" @click="go(index - 1)" />
        <q-btn
          v-if="index < sections.length - 1 || (hasQuizzes && !sectionPassed[index])"
          :label="
            index < sections.length - 1 ? '다음' : sectionPassed[index] ? '완료' : '퀴즈 풀고 완료'
          "
          color="black"
          @click="onNext()"
        />
      </div>
    </q-page-sticky>

    <QuizDialog
      v-model="show"
      :title="currentSection.title"
      :progress="progress"
      :quiz="quiz"
      :quiz-index="quizIdx"
      :total="totalQuizzes"
      :correct-list="perQuizCorrect"
      :selected="selected"
      :can-proceed="isCorrect"
      :option-class="optionClass"
      :answered-shown="answeredShown"
      :is-correct="isCorrect"
      @close="show = false"
      @prev="prev"
      @check="check"
      @next="onNextQuiz"
      @select="selected = $event"
    />
  </q-page>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import QuizDialog from 'src/components/quiz/QuizDialog.vue'
import { webbasicSections as sections } from 'src/data/webbasic/sections'
import { useSectionRouter } from 'src/composables/useSectionRouter'
import { useProgress } from 'src/composables/useProgress'
import { useQuiz } from 'src/composables/useQuiz'

const MODULE_KEY = 'webbasic'

const { index, go } = useSectionRouter(sections.length)
const currentSection = computed(() => sections[index.value])

const { sectionPassed, perSection, load, saveDebounced } = useProgress(MODULE_KEY, sections.length)

const {
  show,
  quizIdx,
  selected,
  isCorrect,
  perQuizCorrect,
  hasQuizzes,
  totalQuizzes,
  quiz,
  progress,
  openIfNeeded,
  check,
  next,
  prev,
  optionClass,
} = useQuiz(() => currentSection.value)

onMounted(load)

function onNext() {
  // 퀴즈가 있고 아직 통과 전이면 모달 오픈
  if (openIfNeeded(sectionPassed.value[index.value])) return
  if (index.value < sections.length - 1) go(index.value + 1)
}

function onNextQuiz() {
  const before = quizIdx.value
  next()
  // 마지막 문제를 맞춘 경우 섹션 통과 처리
  if (before === quizIdx.value && perQuizCorrect.value.every(Boolean)) {
    sectionPassed.value[index.value] = true
    perSection.value[String(index.value)] = [...perQuizCorrect.value]
    saveDebounced()
    show.value = false
    if (index.value < sections.length - 1) go(index.value + 1)
  }
}
</script>

<style scoped>
.centered-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
}

.q-mr-sm {
  margin-right: 8px;
}
.opt-default {
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}
.opt-correct {
  background: #e8f5e9;
  border-left: 4px solid #2e7d32;
  box-shadow: 0 2px 10px rgba(46, 125, 50, 0.12);
}
.opt-wrong {
  background: #ffebee;
  border-left: 4px solid #c62828;
  box-shadow: 0 2px 10px rgba(198, 40, 40, 0.12);
}
.opt-correct-ghost {
  border-left: 3px solid #43a047;
}
.opt-dim {
  opacity: 0.7;
}
</style>
