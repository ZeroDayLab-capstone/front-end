<template>
  <q-dialog v-model="dialogModel" persistent transition-show="scale" transition-hide="scale">
    <q-card class="quiz-card-lg">
      <div class="quiz-header dark-gradient">
        <div class="text-subtitle2 opacity-80">섹션 퀴즈</div>
        <div class="text-h6 q-mt-xs">{{ title }}</div>
        <q-linear-progress :value="progress" size="10px" rounded class="q-mt-sm bg-grey-8" />
      </div>

      <q-separator />

      <q-card-section class="q-px-xl q-pt-lg q-pb-md">
        <div class="row items-center justify-between">
          <div class="text-subtitle1 text-grey-8">문제 {{ quizIndex + 1 }} / {{ total }}</div>
          <div class="row q-gutter-xs">
            <q-chip
              v-for="(ok, i) in correctList"
              :key="i"
              dense
              :color="ok ? 'positive' : i === quizIndex ? 'amber-7' : 'grey-5'"
              text-color="white"
              >{{ i + 1 }}</q-chip
            >
          </div>
        </div>

        <div class="text-h5 q-mt-md text-grey-9">{{ quiz?.question }}</div>

        <q-list class="q-mt-lg">
          <q-item
            v-for="opt in quiz?.options"
            :key="opt.value"
            clickable
            v-ripple
            @click="$emit('select', opt.value)"
            :class="optionClass(opt.value)"
          >
            <q-item-section avatar>
              <q-radio :model-value="selected" :val="opt.value" color="grey-7" />
            </q-item-section>

            <q-item-section>
              <div class="text-body1">{{ opt.label }}</div>
            </q-item-section>

            <q-item-section side v-if="answeredShown">
              <q-icon
                v-if="isCorrect && opt.value === quiz?.answer"
                name="check_circle"
                color="positive"
                size="20px"
              />
              <q-icon
                v-else-if="!isCorrect && opt.value === selected"
                name="cancel"
                color="negative"
                size="20px"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator />

      <q-card-actions align="between" class="q-pa-lg q-px-xl">
        <div class="row q-gutter-sm">
          <q-btn flat color="grey-7" label="나중에" @click="$emit('close')" />
          <q-btn
            flat
            color="grey-7"
            label="이전문제"
            :disable="quizIndex === 0"
            @click="$emit('prev')"
          />
        </div>
        <div class="row q-gutter-sm">
          <q-btn
            outline
            color="black"
            label="정답확인"
            :disable="!selected"
            @click="$emit('check')"
          />
          <q-btn
            :color="canProceed ? 'amber-8' : 'grey-6'"
            :label="quizIndex < total - 1 ? '다음문제' : '완료'"
            :disable="!canProceed"
            @click="$emit('next')"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  title: String,
  progress: Number,
  quiz: Object,
  quizIndex: Number,
  total: Number,
  correctList: Array,
  selected: [String, null],
  canProceed: Boolean,
  optionClass: Function,
  answeredShown: Boolean,
  isCorrect: Boolean,
})
const emit = defineEmits(['update:modelValue', 'close', 'prev', 'check', 'next', 'select'])

// ✅ v-model 브리지 (프롭은 읽기만, set은 이벤트로)
const dialogModel = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})
</script>

<style scoped>
.opt-default {
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    opacity 0.15s ease;
  border-radius: 12px;
}
.opt-selected {
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
}
.opt-correct {
  background: #e8f5e9;
  border: 2px solid #2e7d32;
  border-radius: 12px;
}
.opt-wrong {
  background: #ffebee;
  border: 2px solid #c62828;
  border-radius: 12px;
}
.opt-correct-ghost {
  border: 2px dashed #43a047;
  border-radius: 12px;
}
.opt-dim {
  opacity: 0.7;
}
.opt-default:hover {
  background: #f7f7f7;
}

.quiz-card-lg {
  width: min(920px, 96vw);
  max-width: 920px;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
}
.dark-gradient {
  padding: 22px 28px;
  background: linear-gradient(135deg, #111 0%, #2a2a2a 60%, #1a1a1a 100%);
  color: #fff;
  border-bottom: 2px solid #ffc107;
}
.opacity-80 {
  opacity: 0.8;
}
</style>
