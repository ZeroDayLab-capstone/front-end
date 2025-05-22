<template>
  <q-page class="q-pa-md problem-explanation-page">
    <div class="row justify-center">
      <!-- 왼쪽: 문제 설명 카드 -->
      <div class="col-12 col-md-7">
        <q-card flat class="bg-grey-1 text-dark q-px-sm q-pb-sm">
          <!-- 헤더 (문제 제목, 난이도, etc.) -->
          <q-card-section>
            <div class="text-h5">{{ problemTitle }}</div>
            <div class="text-caption text-grey">사용 대상: 학습자</div>
            <!-- 난이도 뱃지 -->
            <q-badge
              v-if="difficulty"
              :label="difficultyLabel"
              :color="difficultyColor"
              class="q-mt-sm"
            />
          </q-card-section>

          <!-- 문제 목표 / 시나리오 설명 -->
          <q-separator spaced />
          <q-card-section>
            <h6>1️⃣실습 목표🎯</h6>
            <div class="text-body1 q-pl-md">
              <div style="display: list-item; list-style-type: disc">
                Stored XSS의 개념과 동작 원리를 이해합니다.
              </div>
              <div style="display: list-item; list-style-type: disc">
                사용자 입력값이 저장되어 다른 사용자에게 자동 실행되는 상황을 실습합니다.
              </div>
            </div>

            <h6 class="q-mt-md">2️⃣문제 시나리오🎭</h6>
            <div class="text-body1">
              <div>💡당신은 웹 게시판의 일반 사용자입니다.</div>
              <div>
                다른 사용자가 글을 열람할 때 브라우저에서 JavaScript가 실행되는지 확인해보세요.
              </div>
              <div>Stored XSS의 위험성을 체험하는 것이 목표입니다.</div>
            </div>
          </q-card-section>

          <!-- 문제 난이도 표시 -->
          <q-separator spaced />
          <q-card-section>
            <div class="row items-center">
              <div class="col-4 text-bold">문제 난이도</div>
              <div class="col">
                <span>{{ difficultyLabel }}</span>
              </div>
            </div>
          </q-card-section>

          <!-- 힌트 섹션 (토글) -->
          <q-separator spaced />
          <q-expansion-item group="hint" icon="help_outline" label="힌트" expand-separator>
            <div class="q-mt-sm">
              <div class="text-body1 q-pl-md">
                <div style="display: list-item; list-style-type: disc">
                  <span style="color: red">{{ hintText }}</span> 태그를 써서 직접 alert창을
                  띄워보세요.
                </div>
                <div style="display: list-item; list-style-type: disc">
                  또는 <span style="color: red">{{ hintText2 }}</span> 와 같은 다른 페이로드도
                  사용해볼 수 있습니다.
                </div>
              </div>
            </div>
          </q-expansion-item>

          <!-- 정답 입력 / 결과 확인 -->
          <q-separator spaced />
          <q-card-section>
            <h6>문제 해결(정답) 입력</h6>
            <q-input v-model="userAnswer" filled placeholder="정답을 입력하세요" class="q-my-sm" />
            <div class="colunm q-gutter-x-sm">
              <q-btn label="제출" color="black" @click="onSubmitAnswer" />
              <q-btn
                label="해설"
                color="black"
                :to="{ name: 'WargameExplanationXssStored1' }"
              ></q-btn>
            </div>
            <div v-if="submitResult" class="q-mt-sm">
              <q-banner
                v-if="submitSuccess"
                type="positive"
                icon="check_circle"
                label="성공! 문제를 해결하셨습니다."
              />
              <q-banner v-else type="negative" icon="warning" label="실패! 다시 시도해 보세요." />
            </div>
          </q-card-section>
          <q-separator spaced />
          <q-card-section>
            <div class="text-h6">문제 관련 액션</div>
            <p class="text-body2 text-grey q-mt-sm">
              실습 환경을 생성하고, 문제를 직접 풀어볼 수 있습니다.
            </p>
          </q-card-section>

          <q-card-section>
            <!-- 서버 생성 버튼 -->
            <q-btn
              label="서버 생성"
              color="accent"
              icon="build"
              class="full-width q-my-sm"
              @click="onCreateServer"
            />
            <div v-if="serverCreated" class="text-positive q-my-sm">
              서버가 생성되었습니다! 실습 환경으로 이동해 보세요.
            </div>
            <!-- 문제 시작 버튼도 가능 -->
            <q-btn
              label="실습 시작"
              color="primary"
              icon="play_arrow"
              class="full-width q-my-sm"
              @click="onStartPractice"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
//import { QCard, QInput, QBtn, QBadge, QBanner, QExpansionItem } from 'quasar'

// 예시: 문제 정보
const problemTitle = ref('관리자 권한 탈취 작전')
const difficulty = ref('easy') // 예: 'easy' / 'medium' / 'hard'
const hintText = ref('<script>')
const hintText2 = ref('<img src=x onerror=alert(' + 'XSS)>')

// 난이도 표시용
const difficultyLabel = computed(() => {
  if (difficulty.value === 'easy') return '초급'
  if (difficulty.value === 'hard') return '고급'
  return '중급'
})
const difficultyColor = computed(() => {
  if (difficulty.value === 'easy') return 'green'
  if (difficulty.value === 'hard') return 'red'
  return 'orange'
})

// 정답 제출
const userAnswer = ref('')
const submitResult = ref(false)
const submitSuccess = ref(false)

function onSubmitAnswer() {
  // 실제 정답 체크 로직...
  if (userAnswer.value.trim() === '1234') {
    submitSuccess.value = true
  } else {
    submitSuccess.value = false
  }
  submitResult.value = true
}

// 서버 생성
const serverCreated = ref(false)
function onCreateServer() {
  // 서버 생성 API 호출 등...
  serverCreated.value = true
}

// 실습 시작
function onStartPractice() {
  // 해당 실습 페이지(혹은 서버 URL)로 이동 처리
  console.log('실습 시작!')
}
</script>

<style scoped>
.problem-explanation-page {
  background-color: #f5f5f5;
  min-height: 100vh; /* 페이지 전체 높이 차지 */
}

.q-card {
  border-radius: 8px;
}

.full-width {
  width: 100%;
}
</style>
