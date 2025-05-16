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
                저장형 XSS를 통한 쿠키 탈취 시나리오를 이해합니다.
              </div>
              <div style="display: list-item; list-style-type: disc">
                Selenium 봇의 동작을 유도하여 관리자 세션을 탈취하고, 이를 기반으로 FLAG에 접근하는
                복합 공격을 실습합니다.
              </div>
            </div>

            <h6 class="q-mt-md">2️⃣문제 시나리오🎭</h6>
            <div class="text-body1">
              <div class="q-pb-sm">💡 당신은 일반 사용자로 로그인한 상태입니다.</div>
              <div>
                저장형 XSS 취약점을 이용해 악성 게시글을 작성하고, 관리자로 로그인된 Selenium 봇이
                이를 열람하게 만드
              </div>
              <div>
                세요. 봇이 게시글을 열람하면, JavaScript가 실행되어 쿠키가
                <span style="color: red">attacker_server.php</span> 로 전송됩니다. 이후 이
              </div>
              <div>
                쿠키 값을 <span style="color: red">claim_admin_session.php</span>를 통해 제출하면
                관리자 권한을 획득할 수 있습니다. 마지막으로 관리
              </div>
              <div>자 전용 게시글을 열람하여 FLAG를 획득하세요.</div>
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
            <div class="text-body1 q-pl-lg">
              <div style="display: list-item; list-style-type: disc">
                쿠키 탈취 시에는 반드시
                <span style="color: red">document.location, fetch, new Image()</span> 등을 활용하여
                외부로 전송하세요
              </div>
              <div style="display: list-item; list-style-type: disc">
                탈취한 쿠키는 정확히 <span style="color: red">ADMIN</span> 이름이어야 하며,
                <span style="color: red">claim_admin_session.php</span>에 복사해 넣으면
              </div>
              <div><span style="color: red">setcookie()</span> 로 세션 주입됩니다.</div>
              <div style="display: list-item; list-style-type: disc">
                관리자 전용 글은 <span style="color: red">is_read_by_admin</span> 이나 별도
                <span style="color: red">admin_only</span>플래그로 표시되어 있으며, 일반 사용자는
              </div>
              <div>열람 불가합니다</div>
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
const problemTitle = ref('관리자 세션 탈취 및 관리자 전용 게시글 열람을 통한 FLAG 획득')
const difficulty = ref('hard') // 예: 'easy' / 'medium' / 'hard'

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
