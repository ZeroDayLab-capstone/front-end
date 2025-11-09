<template>
  <q-page class="q-pa-md problem-explanation-page">
    <div class="row justify-center">
      <div class="col-12 col-md-7">
        <q-card flat class="bg-grey-1 text-dark q-px-sm q-pb-sm">
          <!-- 헤더 (문제 제목, 난이도, etc.) -->
          <q-card-section>
            <div class="text-h5">{{ problemTitle }}</div>
            <div class="text-caption text-grey">사용 대상: 학습자</div>
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
            <div class="text-h5">1️⃣실습 목표🎯</div>
            <div class="text-h6">
              <ul class="q-mt-none">
                <li>저장형 XSS를 통한 쿠키 탈취 시나리오를 이해합니다.</li>
                <li>
                  Selenium 봇의 동작을 유도하여 관리자 세션을 탈취하고, 이를 기반으로 FLAG에
                  접근하는 복합 공격을 실습합니다.
                </li>
              </ul>
            </div>
            <div class="q-my-sm text-h5">2️⃣문제 시나리오🎭</div>
            <div class="text-h6 q-pl-md">
              <div class="q-pb-sm">💡 당신은 일반 사용자로 로그인한 상태입니다.</div>
              <div>
                저장형 XSS 취약점을 이용해 악성 게시글을 작성하고, 관리자로 로그인된 Selenium 봇이
                이를 열람하게 만드세요.
                <div>
                  봇이 게시글을 열람하면, JavaScript가 실행되어 쿠키가
                  <span style="color: red">attacker_server.php</span> 로 전송됩니다.
                </div>
              </div>
              <div>
                이후 이 쿠키 값을 <span style="color: red">claim_admin_session.php</span>를 통해
                제출하면 관리자 권한을 획득할 수 있습니다.
              </div>
              <div>마지막으로 관리자 전용 게시글을 열람하여 FLAG를 획득하세요.</div>
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
                <span style="color: red">setcookie()</span> 로 세션 주입됩니다.
              </div>
              <div style="display: list-item; list-style-type: disc">
                관리자 전용 글은 <span style="color: red">is_read_by_admin</span> 이나 별도
                <span style="color: red">admin_only</span>플래그로 표시되어 있으며, 일반 사용자는
                열람 불가합니다
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
              <q-btn label="해설" color="black" :to="{ name: 'wg-exp-xss-st3' }"></q-btn>
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
          <q-card-section>
            <div class="text-h6">문제 관련 액션</div>
            <p class="text-body2 text-grey q-mt-sm">
              실습 환경을 생성하고, 문제를 직접 풀어볼 수 있습니다.
            </p>
          </q-card-section>

          <q-card-section>
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

// 문제 정보
const problemTitle = ref('관리자 세션 탈취 및 관리자 전용 게시글 열람을 통한 FLAG 획득')
const difficulty = ref('hard')

const auth = useAuthStore()

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
const successMessage = ref('성공! 문제를 해결하셨습니다.')
const failMessage = ref('실패! 다시 시도해 보세요.')

async function onSubmitAnswer() {
  const email = auth.user?.email
  const labId = 8 // 문제마다 고유 lab_id 부여(이 문제 예: 8)

  // 정답 비교 (예: '1234'가 정답)
  const correct = userAnswer.value.trim() === '4b3a2c1d0e9f8a7b6c5d4e3f2a1b0c9'
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

// 서버 생성
const serverCreated = ref(false)
const frontendPort = ref(null)
const frontendHost = '100.108.98.2' // 실습환경 도커 컨테이너 host (고정)
async function onCreateServer() {
  const email = auth.user?.email
  const lab_id = 8
  if (!email) {
    alert('로그인 먼저 해주세요!')
    return
  }
  try {
    // 문제 id 고정(8)
    await api.post('/labs/labs/environment', {
      email: email,
      lab_id: lab_id,
    })
    const res = await api.post('/containers/start', { problem_id: lab_id })
    frontendPort.value = res.data.frontend_port
    serverCreated.value = true
  } catch (err) {
    serverCreated.value = false
    frontendPort.value = null
    alert('서버 생성에 실패했습니다.')
    console.error(err)
  }
}

// 실습 시작
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
