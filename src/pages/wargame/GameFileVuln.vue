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
                <li>파일 업로드 기능을 악용한 RCE(Remote Code Execution) 시나리오를 실습합니다.</li>
                <li>검증되지 않은 파일 업로드와 실행 경로 노출의 위험성을 이해합니다.</li>
                <li>
                  악성 PHP 스크립트를 업로드하여 서버 내부 FLAG 파일을 읽고, 이를 브라우저에서
                  출력되도록 만듭니다.
                </li>
              </ul>
            </div>
            <div class="text-h5 q-mt-md">2️⃣문제 시나리오🎭</div>
            <div class="text-h6 q-pl-md">
              <div>{{ problemScenario }}</div>
              <div>
                백엔드 <span style="color: red">/upload</span> API는 업로드된 파일을 프론트엔드
                서버의 <span style="color: red">/uploads/</span> 경로에 저장합니다. 이 경로는 웹에
                서 접근 가능하며, 실행 권한도 부여되어 있습니다. 서버 내
                <span style="color: red">/flag.txt</span> 파일을 읽는 PHP 스크립트를 만들어
                업로드하고, 실행하여 FLAG를 획득하세요.
              </div>
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
            </div>
          </q-expansion-item>

          <!-- 정답 입력 / 결과 확인 -->
          <q-separator spaced />
          <q-card-section>
            <h6>문제 해결(정답) 입력</h6>
            <q-input v-model="userAnswer" filled placeholder="정답을 입력하세요" class="q-my-sm" />
            <div class="colunm q-gutter-x-sm">
              <q-btn label="제출" color="black" @click="onSubmitAnswer" />
              <q-btn label="해설" color="black" :to="{ name: 'wg-exp-filevuln' }"></q-btn>
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
const problemTitle = ref('악성 PHP 스크립트를 통한 FLAG 획득')
const problemScenario = ref('💡 당신은 업로드 기능이 있는 웹 애플리케이션의 일반 사용자입니다.')
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
  const labId = 10 // 문제마다 고유 lab_id 부여(이 문제 예: 10)

  // 정답 비교 (예: '1234'가 정답)
  const correct = userAnswer.value.trim() === '0a1b2c3d4e5f60718293a4b5c6d7e8f9'
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
const frontendHost = '100.70.143.103' // 실습환경 도커 컨테이너 host (고정)
async function onCreateServer() {
  const email = auth.user?.email
  const lab_id = 10
  if (!email) {
    alert('로그인 먼저 해주세요!')
    return
  }
  try {
    // 문제 id 고정(10)
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
