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
                <li>
                  <strong>경로 조작</strong>(Path Traversal)<strong>의 원리와 위험성</strong>을
                  이해합니다.
                </li>
                <li>
                  <strong>파일명 기반 입력 검증 부재로 인한 서버 파일 접근 시나리오</strong>를
                  실습합니다.
                </li>
                <li>
                  제한된 업로드 기능과 허술한 읽기 로직을 조합해 시스템 내 민감 파일(
                  <span style="color: red">flag.py</span> ) 에 접근하여 FLAG를 획득하는 것이
                  목표입니다.
                </li>
              </ul>
            </div>
            <div class="q-my-sm text-h6">2️⃣문제 시나리오🎭</div>
            <div class="text-h6 q-pl-md">
              <div>💡 당신은 파일 업로드 및 열람이 가능한 웹 시스템의 일반 사용자입니다.</div>
              <div>
                업로드 시에는 <span style="color: red">".."</span> 이 포함된 파일명이 차단되지만,
                파일 읽기 기능에서는 이 제한이 적용되지 않습니다.
              </div>
              <div>
                이를 이용해 백엔드 시스템의 상위 디렉토리에 있는
                <span style="color: red">flag.py</span> 파일에 접근하여 FLAG를 획득하세요.
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
            <div class="q-mt-sm">
              <div class="text-h6">
                <ul>
                  <li>
                    <span style="color: red">".."</span> 가 포함된 파일명은 업로드 시 차단되지만,
                    읽기 기능에서는 필터링되지 않습니다.
                  </li>
                  <li>
                    주소창에서 <span style="color: red">../</span>를 활용해 상위 디렉터리 파일을
                    직접 읽어보세요.
                  </li>
                  <li>
                    업로드 기능을 먼저 활용해 메모 파일을 작성해보고, 파라미터 확인을 통해 서버의
                    파일 처리 위치를 파악해보세요.
                  </li>
                  <li>
                    FLAG는 <span style="color: red">flag.py</span>에 존재하며, 해당 파일은 프로젝트
                    루트에 위치하고 있습니다.
                  </li>
                </ul>
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
                :to="{ name: 'WargameExplanationPathTraserval' }"
              ></q-btn>
            </div>
            <div v-if="submitResult" class="q-mt-sm">
              <q-banner
                v-if="submitSuccess"
                type="positive"
                icon="check_circle"
                :label="successMessage"
              />
              <q-banner v-else type="negative" icon="warning" :label="failMessage" />
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
const problemTitle = ref('경로 조작 스크립트를 통한 FLAG 획득')
const difficulty = ref('easy')

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
  const labId = 11 // 문제마다 고유 lab_id 부여(이 문제 예: 11)

  // 정답 비교 (예: '1234'가 정답)
  const correct = userAnswer.value.trim() === 'deadbeefcafebabe8badf00d12345678'
  const status = correct ? 'completed' : 'in-progress'

  try {
    const res = await api.post('/labs/labs/submit', {
      email: email,
      lab_id: labId,
      is_correct: correct,
      status: status,
    })
    successMessage.value = '성공! 문제를 해결하셨습니다.'
    failMessage.value = '실패! 다시 시도해 보세요.'
    if (res.data && res.data.status) {
      successMessage.value = correct ? `성공! 서버 응답: ${res.data.status}` : successMessage.value
      failMessage.value = !correct ? `실패! 서버 응답: ${res.data.status}` : failMessage.value
    }
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
  const lab_id = 11
  if (!email) {
    alert('로그인 먼저 해주세요!')
    return
  }
  try {
    // 문제 id 고정(11)
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
