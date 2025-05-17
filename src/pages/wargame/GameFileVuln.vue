<template>
  <q-page class="q-pa-md problem-explanation-page">
    <div class="row items-start q-gutter-md">
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
                파일 업로드 기능을 악용한 RCE(Remote Code Execution) 시나리오를 실습합니다.
              </div>
              <div style="display: list-item; list-style-type: disc">
                검증되지 않은 파일 업로드와 실행 경로 노출의 위험성을 이해합니다.
              </div>
              <div style="display: list-item; list-style-type: disc">
                악성 PHP 스크립트를 업로드하여 서버 내부 FLAG 파일을 읽고, 이를 브라우저에서
                출력되도록 만듭니다.
              </div>
            </div>

            <h6 class="q-mt-md">2️⃣문제 시나리오🎭</h6>
            <p class="text-body1">{{ problemScenario }}</p>
            <div text-body1>
              <div>
                백엔드 <span style="color: red">/upload</span> API는 업로드된 파일을 프론트엔드
                서버의 <span style="color: red">/uploads/</span> 경로에 저장합니다. 이 경로는 웹에
              </div>
              <div>
                서 접근 가능하며, 실행 권한도 부여되어 있습니다. 서버 내
                <span style="color: red">/flag.txt</span> 파일을 읽는 PHP 스크립트를 만들어
              </div>
            </div>
            <div>업로드하고, 실행하여 FLAG를 획득하세요.</div>
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
            <div class="q-pl-md text-body1">
              <div style="display: list-item; list-style-type: disc">
                <span style="color: red">.php</span> 확장자를 사용해야 Apache가 코드를 실행합니다.
              </div>
              <div style="display: list-item; list-style-type: disc">
                <span style="color: red">system()</span> 함수 외에도
                <span style="color: red">exec()</span> 다양한 명령 실행 함수 사용 가능
              </div>
              <div style="display: list-item; list-style-type: disc">
                업로드 후 URL이 잘못되면 실행이 되지 않으므로 정확한 경로(
                <span style="color: red">uploads/파일명.php</span> )를 확인하세요.
              </div>
              <div style="display: list-item; list-style-type: disc">
                보안상 실 서비스에서는 절대 허용되어선 안 되는 취약 구조입니다.
              </div>
              <!-- <p>{{ hintText }}</p> -->
            </div>
          </q-expansion-item>

          <!-- 정답 입력 / 결과 확인 -->
          <q-separator spaced />
          <q-card-section>
            <h6>문제 해결(정답) 입력</h6>
            <q-input v-model="userAnswer" filled placeholder="정답을 입력하세요" class="q-my-sm" />
            <q-btn label="제출" color="black" @click="onSubmitAnswer" />
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
        </q-card>
      </div>

      <!-- 오른쪽: 추가 액션 (서버 생성 버튼 등) -->
      <div class="col-12 col-md-5">
        <q-card flat class="bg-white text-dark q-px-md q-pt-md q-pb-xl shadow-1">
          <q-card-section>
            <div class="text-h6">문제 관련 액션</div>
            <p class="text-body2 text-grey q-mt-sm">
              실습 환경을 생성하고, 문제를 직접 풀어볼 수 있습니다.
            </p>
          </q-card-section>
          <q-separator spaced />
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
const problemTitle = ref('악성 PHP 스크립트를 통한 FLAG 획득')
// const problemObjective = ref(
//   'CSRF 토큰 검증 메커니즘의 일반적인 결함을 이해하고 이를 우회하는 방법을 경험해 봅니다.',
// )
const problemScenario = ref('💡 당신은 업로드 기능이 있는 웹 애플리케이션의 일반 사용자입니다.')
const difficulty = ref('hard') // 예: 'easy' / 'medium' / 'hard'
// const hintText = ref(
//   '',
// )

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
