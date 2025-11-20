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
            <div class="text-h5 q-pb-sm">1️⃣실습 목표🎯</div>
            <p class="text-h6 q-px-sm">
              CSRF 토큰 검증 메커니즘의 일반적인 결함을 이해하고, <br />개발자 도구 콘솔에서 제공된
              JS 스니펫을 한 번만 실행해 취약점을 우회해 봅니다.
            </p>

            <div class="text-h5 q-my-sm">2️⃣문제 시나리오🎭</div>
            <div class="text-h6 q-px-sm">
              <p>{{ problemScenario }}</p>
              <p>
                정상 UI( <span style="color: red">chage_role.php</span> )에는 관리자 승격 버튼이
                숨겨져 있어 권한 상승이 불가능 합니다.
              </p>
              <p>
                따라서, 개발자 도구 콘솔에서 제공된 JS 스니펫을 이용해 CSRF 취약점을 이용해 관리자
                권한을 탈취하고, 플래그를 획득하세요.
              </p>
              <p>일반 학생 아이디: student <br />일반 학생 비번: password</p>
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
              <pre>{{ hintText }}</pre>
            </div>
          </q-expansion-item>

          <!-- 정답 입력 / 결과 확인 -->
          <q-separator spaced />
          <q-card-section>
            <h6>문제 해결(정답) 입력</h6>
            <q-input v-model="userAnswer" filled placeholder="정답을 입력하세요" class="q-my-sm" />
            <div class="colunm q-gutter-x-sm">
              <q-btn label="제출" color="black" @click="onSubmitAnswer" />
              <q-btn label="해설" color="black" :to="{ name: 'wg-exp-csrf' }"></q-btn>
            </div>

            <!--
            <div v-if="submitResult" class="q-mt-sm">
              <q-banner
                v-if="submitSuccess"
                type="positive"
                icon="check_circle"
                :label="successMessage"
              />
              <q-banner v-else type="negative" icon="warning" :label="failMessage" />
            </div>
            -->

            <div v-if="submitResult" class="q-mt-sm">
              <div v-if="submitSuccess" style="color: green">{{ successMessage }}</div>
              <div v-else style="color: red">{{ failMessage }}</div>
            </div>
          </q-card-section>

          <q-separator spaced />
          <!-- 오른쪽: 추가 액션 (서버 생성 버튼 등) -->
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
              @click="onCreateServer(1)"
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
import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/auth'

// 예시: 문제 정보
const problemTitle = ref('관리자 권한 탈취 작전')
const problemScenario = ref('당신은 학교 성적 관리 시스템에 일반 학생으로 가입했습니다.')
const difficulty = ref('medium') // 예: 'easy' / 'medium' / 'hard'
const hintText = ref(`
(async function(){
  try {
    // 1) 로그인 (student/password)
    let loginRes = await fetch('/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ username: 'student', password: 'password' })
    });
    if (!loginRes.ok) throw new Error('로그인 실패: ' + loginRes.status);

    // 2) CSRF 취약점 우회: 토큰 없이 권한 탈취 (이 부분에 코드를 작성해주세요.)

    // 3) 성공하면 플래그 페이지로 이동
    location.href = '/flag.php';
  } catch (e) {
    console.error(e);
    alert('오류 발생: ' + e.message);
  }
})();
`)

const auth = useAuthStore()

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

// 정답 제출 및 결과 관리
const userAnswer = ref('')
const submitResult = ref(false)
const submitSuccess = ref(false)
const successMessage = ref('성공! 문제를 해결하셨습니다.')
const failMessage = ref('실패! 다시 시도해 보세요.')

async function onSubmitAnswer() {
  const email = auth.user?.email
  const labId = 1 // 문제 id 고정

  // 정답 로직 (여기서만 하드코딩 예시, 실제로는 동적으로)
  const correct = userAnswer.value.trim() === 'FLAG{9c926de27b8995b218c8b1f51806ce21}'
  const status = correct ? 'completed' : 'in-progress'

  try {
    const res = await api.post('/labs/labs/submit', {
      email: email,
      lab_id: labId,
      is_correct: correct,
      status: status,
    })
    console.log('서버 응답:', res.data)

    successMessage.value = '성공! 문제를 해결하셨습니다.'
    failMessage.value = '실패! 다시 시도해 보세요.'
    // if (res.data && res.data.status) {
    //   successMessage.value = correct ? `성공! 서버 응답: ${res.data.status}` : successMessage.value
    //   failMessage.value = !correct ? `실패! 서버 응답: ${res.data.status}` : failMessage.value
    // }
    submitSuccess.value = correct
    submitResult.value = true
  } catch (e) {
    submitSuccess.value = false
    submitResult.value = true
    failMessage.value = '서버 오류! 다시 시도해 주세요.'
    console.error(e)
  }
}

const serverCreated = ref(false)
const frontendPort = ref(null)
const frontendHost = '100.70.143.103' // 실습환경 도커 컨테이너 host (고정)

async function onCreateServer(lab_id) {
  const email = auth.user?.email
  if (!email) {
    alert('로그인 먼저 해주세요!')
    return
  }
  try {
    await api.post('/labs/labs/environment', {
      email: email,
      lab_id: lab_id,
    })
    // 문제 id 고정(1)
    const res = await api.post('/containers/start', { problem_id: 1 })
    frontendPort.value = res.data.frontend_port
    serverCreated.value = true
  } catch (err) {
    serverCreated.value = false
    frontendPort.value = null
    alert('서버 생성에 실패했습니다.')
    console.error(err)
  }
}

function onStartPractice() {
  if (serverCreated.value && frontendPort.value) {
    window.open(`http://${frontendHost}:${frontendPort.value}`, '_blank')
  } else {
    alert('먼저 서버를 생성하세요!')
  }
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
